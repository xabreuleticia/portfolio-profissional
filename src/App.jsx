import { useEffect, useRef, useState } from "react"
import { LanguageProvider } from "./context/LanguageContext"
import WakaTime from "./sections/WakaTime"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./sections/Home"
import Sobre from "./sections/Sobre"
import Projetos from "./sections/Projetos"
import Experiencias from "./sections/Experiencias"
import Contato from "./sections/Contato"
import Habilidades from "./sections/Habilidades"
import MapaPessoal from "./sections/MapaPessoal"

function App() {
  const [personalMapOpen, setPersonalMapOpen] = useState(false)
  const returnToAbout = useRef(false)

  useEffect(() => {
    if (personalMapOpen || !returnToAbout.current) return undefined

    returnToAbout.current = false
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("sobre")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [personalMapOpen])

  function openPersonalMap() {
    window.scrollTo(0, 0)
    setPersonalMapOpen(true)
  }

  function closePersonalMap() {
    returnToAbout.current = true
    setPersonalMapOpen(false)
  }

  return (
    <LanguageProvider>
      {personalMapOpen ? (
        <MapaPessoal onBack={closePersonalMap} />
      ) : (
        <>
          <Header />

          <main>
            <Home />
            <Sobre onOpenPersonalMap={openPersonalMap} />
            <Habilidades />
            <Projetos />
            <WakaTime />
            <Experiencias />
            <Contato />
          </main>

          <Footer />
        </>
      )}
    </LanguageProvider>
  )
}

export default App
