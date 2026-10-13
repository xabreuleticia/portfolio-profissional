import { useContext } from "react"
import { LanguageContext } from "./language-context"

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage deve ser usado dentro de LanguageProvider."
    )
  }

  return context
}