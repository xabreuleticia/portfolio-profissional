import { useState } from "react"
import { LanguageContext } from "./language-context"

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("pt")

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