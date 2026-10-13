import { handleWakaTime } from "./_wakatime.js"

export default async function handler(req, res) {
  return handleWakaTime(req, res, process.env)
}
