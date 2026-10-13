import { handleCodando } from "./_codando.js"

export default async function handler(req, res) {
  return handleCodando(req, res, process.env)
}
