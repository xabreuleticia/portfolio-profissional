import { LanguageProvider } from "./context/LanguageContext"
import WakaTime from "./sections/WakaTime"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./sections/Home"
import Sobre from "./sections/Sobre"
import Projetos from "./sections/Projetos"
import Experiencias from "./sections/Experiencias"
import Contato from "./sections/Contato"

function App() {
  return (
    <LanguageProvider>
      <Header />

      <main>
        <Home />
        <Sobre />
        <Projetos />
        <WakaTime/>
        <Experiencias />
        <Contato />
      </main>

      <Footer />
    </LanguageProvider>
  )
}

export default App