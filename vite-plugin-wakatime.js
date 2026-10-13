import { loadEnv } from "vite"
import { handleWakaTime, WAKATIME_PATH } from "./api/_wakatime.js"
import { handleCodando, CODANDO_PATH } from "./api/_codando.js"

function middlewareFor(getEnv) {
  return async (req, res, next) => {
    let pathname
    try {
      pathname = new URL(req.url || "/", "http://localhost").pathname
    } catch {
      return next()
    }

    const env = { ...process.env, ...getEnv() }
    if (pathname === WAKATIME_PATH) return handleWakaTime(req, res, env)
    if (pathname === CODANDO_PATH) return handleCodando(req, res, env)
    return next()
  }
}

export default function wakatimeApi() {
  let env = {}

  return {
    name: "portfolio-wakatime-api",
    config(_config, { mode }) {
      env = loadEnv(mode, process.cwd(), "")
    },
    configureServer(server) {
      server.middlewares.use(middlewareFor(() => env))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middlewareFor(() => env))
    },
  }
}
