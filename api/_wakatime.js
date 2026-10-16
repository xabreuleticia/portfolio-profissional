const ALLOWED_RANGES = new Set([
  "last_7_days",
  "last_30_days",
  "last_6_months",
  "last_year",
  "all_time",
])

const cache = new Map()
const CACHE_MS = 5 * 60 * 1000

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Cache-Control", "no-store")
  res.end(JSON.stringify(body))
}

function toItems(items = []) {
  if (!Array.isArray(items)) return []

  return items
    .map((item) => ({
      name: String(item.name ?? "Outro"),
      seconds: Number(item.total_seconds ?? item.seconds ?? 0),
      percent: Number(item.percent ?? 0),
    }))
    .filter((item) => Number.isFinite(item.seconds) && item.seconds > 0)
    .sort((a, b) => b.seconds - a.seconds)
}

function parseDate(value) {
  if (!value) return null

  // Evita deslocamentos de data por fuso horário.
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    return String(value)
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toISOString()
}

function normalizeStats(statsPayload, todayPayload, range, allowedProjects) {
  const data = statsPayload?.data ?? statsPayload ?? {}
  const grandTotal = data.grand_total ?? data.grandTotal ?? {}

  const todayData = todayPayload?.data ?? todayPayload ?? {}
  const todayTotal = todayData?.grand_total ?? todayData?.grandTotal ?? {}

  const rawDays = Array.isArray(data.days) ? data.days : []

  const activeDays = rawDays.length
    ? rawDays.filter((day) => Number(day.total_seconds ?? 0) > 0).length
    : null

  let projects = toItems(data.projects)

  // Por segurança, os nomes dos projetos só são expostos se forem
  // explicitamente permitidos em WAKATIME_PUBLIC_PROJECTS.
  if (!Array.isArray(allowedProjects) || allowedProjects.length === 0) {
    projects = []
  } else if (!allowedProjects.includes("*")) {
    const allow = new Set(
      allowedProjects.map((name) => name.toLowerCase())
    )

    projects = projects.filter((project) =>
      allow.has(project.name.toLowerCase())
    )
  }

  return {
    range,
    totalSeconds: Number(
      grandTotal.total_seconds ?? data.total_seconds ?? 0
    ),
    dailyAverage: Number(
      grandTotal.daily_average ?? data.daily_average ?? 0
    ),
    activeDays,

    bestDay: data.best_day
      ? {
          date: data.best_day.date ?? null,
          seconds: Number(
            data.best_day.total_seconds ?? data.best_day.seconds ?? 0
          ),
        }
      : null,

    start: parseDate(data.start),

    today: {
      seconds: Number(
        todayTotal.total_seconds ?? todayData.total_seconds ?? 0
      ),
    },

    languages: toItems(data.languages),
    editors: toItems(data.editors),
    operatingSystems: toItems(
      data.operating_systems ?? data.operatingSystems
    ),
    categories: toItems(data.categories),
    projects,
  }
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

  // HTTP 202 significa que as estatísticas ainda estão sendo processadas.
  if (response.status === 202) {
    const error = new Error(
      "O WakaTime ainda está atualizando as estatísticas. Tente novamente em alguns segundos."
    )

    error.status = 202
    error.code = "pending"

    throw error
  }

  if (!response.ok) {
    const message =
      body?.error?.message ||
      body?.errors?.[0]?.message ||
      body?.message ||
      "O WakaTime recusou a requisição."

    const error = new Error(message)

    error.status = response.status

    error.code =
      response.status === 401 || response.status === 403
        ? "invalid_token"
        : "upstream_error"

    throw error
  }

  return body
}

export const WAKATIME_PATH = "/api/wakatime"

export async function handleWakaTime(
  req,
  res,
  env = process.env
) {
  if (req.method !== "GET") {
    return sendJson(res, 405, {
      error: {
        code: "method_not_allowed",
        message: "Use uma requisição GET.",
      },
    })
  }

  const accessToken = String(
    env.WAKATIME_ACCESS_TOKEN ?? ""
  ).trim()

  if (!accessToken) {
    return sendJson(res, 503, {
      error: {
        code: "missing_config",
        message:
          "O token de acesso do WakaTime ainda não foi configurado no servidor.",
      },
    })
  }

  const requestUrl = new URL(
    req.url || WAKATIME_PATH,
    "http://localhost"
  )

  const candidate =
    requestUrl.searchParams.get("range") || "last_7_days"

  const range = ALLOWED_RANGES.has(candidate)
    ? candidate
    : "last_7_days"

  const allowedProjects = String(
    env.WAKATIME_PUBLIC_PROJECTS ?? ""
  )
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  const cacheKey = `${range}:${allowedProjects.join(",")}`
  const cached = cache.get(cacheKey)

  if (cached && cached.expires > Date.now()) {
    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    )
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=240"
    )
    res.statusCode = 200

    return res.end(JSON.stringify(cached.body))
  }

  try {
    const [statsPayload, todayPayload] = await Promise.all([
      wakaRequest(
        accessToken,
        `/users/current/stats/${range}`
      ),

      wakaRequest(
        accessToken,
        "/users/current/status_bar/today"
      ).catch(() => null),
    ])

    const data = normalizeStats(
      statsPayload,
      todayPayload,
      range,
      allowedProjects
    )

    const body = { data }

    cache.set(cacheKey, {
      expires: Date.now() + CACHE_MS,
      body,
    })

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    )
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=240"
    )
    res.statusCode = 200

    return res.end(JSON.stringify(body))
  } catch (error) {
    const status =
      error.status === 401 || error.status === 403
        ? 401
        : error.status === 202
          ? 202
          : 502

    const code = error.code || "upstream_error"

    return sendJson(res, status, {
      error: {
        code,

        message:
          code === "invalid_token"
            ? "O token de acesso do WakaTime é inválido ou não tem as permissões necessárias. Confira a configuração."
            : code === "pending"
              ? "O WakaTime ainda está calculando esse período. Tente novamente em alguns segundos."
              : error.message ||
                "Não foi possível consultar o WakaTime agora.",
      },
    })
  }
}