async function requestJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  })

  const body = await response.json().catch(() => ({}))

  if (!response.ok || body?.error) {
    const payload = body?.error ?? body
    const error = new Error(payload?.message || "Não foi possível carregar as estatísticas.")
    error.code = payload?.code || (response.status === 401 || response.status === 403 ? "invalid_key" : "request_failed")
    error.status = response.status
    throw error
  }

  return body
}

export function fetchWakaTimeStats(range) {
  const params = new URLSearchParams({ range })
  return requestJson(`/api/wakatime?${params.toString()}`)
}

export async function fetchCodingNow() {
  return requestJson("/api/codando")
}
