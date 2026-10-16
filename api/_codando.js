const CODANDO_CACHE = new Map()
const CACHE_MS = 45 * 1000
const TIMEZONE = "America/Sao_Paulo"
const ACTIVE_MINUTES = 10
const BREAK_MINUTES = 15

function sendJson(res, status, body, cache = false) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    cache ? "public, max-age=30, stale-while-revalidate=15" : "no-store"
  )
  res.end(JSON.stringify(body))
}

function todayInTimezone() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  )

  return `${values.year}-${values.month}-${values.day}`
}

async function wakaRequest(accessToken, endpoint) {
  const response = await fetch(
    `https://api.wakatime.com/api/v1${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  )

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(
      body?.error?.message ||
        body?.errors?.[0]?.message ||
        "Não foi possível consultar os sinais de atividade."
    )
    error.status = response.status
    error.code =
      response.status === 401 || response.status === 403
        ? "invalid_token"
        : "upstream_error"
    throw error
  }

  return body
}

function toMillis(heartbeat) {
  const value = Number(heartbeat?.time)
  return Number.isFinite(value) ? value * 1000 : NaN
}

function projectIsPublic(project, env) {
  const allowed = String(env.WAKATIME_PUBLIC_PROJECTS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)

  // Só revela nomes de projetos quando eles foram explicitamente permitidos.
  if (allowed.includes("*")) return true
  if (!project || allowed.length === 0) return false
  return allowed.includes(String(project).toLowerCase())
}

export const CODANDO_PATH = "/api/codando"

export async function handleCodando(req, res, env = process.env) {
  if (req.method !== "GET") {
    return sendJson(res, 405, {
      status: "unavailable",
      error: { code: "method_not_allowed", message: "Use uma requisição GET." },
    })
  }

  const accessToken = String(env.WAKATIME_ACCESS_TOKEN ?? "").trim()
  if (!accessToken) {
    return sendJson(res, 200, { status: "unavailable" })
  }

  const cacheKey = `today:${String(env.WAKATIME_PUBLIC_PROJECTS ?? "")}`
  const cached = CODANDO_CACHE.get(cacheKey)
  if (cached && cached.expires > Date.now()) {
    return sendJson(res, 200, cached.body, true)
  }

  try {
    const date = todayInTimezone()
    const [heartbeatPayload, agentsPayload] = await Promise.all([
      wakaRequest(
        accessToken,
        `/users/current/heartbeats?date=${encodeURIComponent(date)}&limit=1000`
      ),
      wakaRequest(accessToken, "/users/current/user_agents").catch(() => null),
    ])

    const allHeartbeats = Array.isArray(heartbeatPayload?.data)
      ? heartbeatPayload.data
      : []

    const heartbeats = allHeartbeats
      .filter(
        (item) =>
          item &&
          item.type !== "domain" &&
          item.entity &&
          Number.isFinite(toMillis(item))
      )
      .sort((a, b) => toMillis(a) - toMillis(b))

    if (heartbeats.length === 0) {
      const body = {
        status: "ok",
        data: { active: false, last: null, todaySeconds: 0 },
      }
      CODANDO_CACHE.set(cacheKey, {
        expires: Date.now() + CACHE_MS,
        body,
      })
      return sendJson(res, 200, body, true)
    }

    const latest = heartbeats[heartbeats.length - 1]
    const latestAt = toMillis(latest)
    const project = latest.project || null
    const isPublic = projectIsPublic(project, env)
    const active = Date.now() - latestAt <= ACTIVE_MINUTES * 60 * 1000

    let sessionStart = latestAt
    let nextAt = latestAt

    for (let index = heartbeats.length - 2; index >= 0; index -= 1) {
      const previousAt = toMillis(heartbeats[index])
      if ((nextAt - previousAt) / 60000 > BREAK_MINUTES) break
      sessionStart = previousAt
      nextAt = previousAt
    }

    let projectTodaySeconds = 0
    for (let index = 1; index < heartbeats.length; index += 1) {
      const previous = heartbeats[index - 1]
      const current = heartbeats[index]
      const gapSeconds = (toMillis(current) - toMillis(previous)) / 1000

      if (
        project &&
        current.project === project &&
        previous.project === project &&
        gapSeconds > 0 &&
        gapSeconds <= BREAK_MINUTES * 60
      ) {
        projectTodaySeconds += gapSeconds
      }
    }

    const agents = Array.isArray(agentsPayload?.data)
      ? agentsPayload.data
      : []
    const currentAgent = agents.find(
      (agent) => String(agent.id) === String(latest.user_agent_id)
    )
    const editor =
      latest.user_agent || latest.editor || currentAgent?.name || null

    const body = {
      status: "ok",
      data: {
        active,
        todaySeconds: projectTodaySeconds,
        last: {
          isPublic,
          project: isPublic ? project : null,
          branch: isPublic ? latest.branch || null : null,
          language: latest.language || null,
          editor,
          at: latestAt,
          sessionStart,
          projectTodaySeconds,
        },
      },
    }

    CODANDO_CACHE.set(cacheKey, {
      expires: Date.now() + CACHE_MS,
      body,
    })

    return sendJson(res, 200, body, true)
  } catch {
    // Mantém a interface discreta se o WakaTime estiver indisponível.
    return sendJson(res, 200, { status: "unavailable" })
  }
}
