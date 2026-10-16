import { useEffect, useState } from "react"
import { LanguageContext } from "./language-context"

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("pt")

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "pt-BR"
    document.title = language === "en"
      ? "Letícia Abreu | Professional Portfolio"
      : "Letícia Abreu | Portfólio"
  }, [language])

  function toggleLanguage() {
    setLanguage((current) => current === "pt" ? "en" : "pt")
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}