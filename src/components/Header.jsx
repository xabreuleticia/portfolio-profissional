import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "../context/useLanguage"

function Header() {
  const { language, toggleLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const text = {
    pt: {
      sobre: "Sobre",
      habilidades: "Habilidades",
      projetos: "Projetos",
      atividade: "Atividade",
      experiencias: "Experiências",
      contato: "Contato",
      idioma: "EN",
      abrirMenu: "Abrir menu",
      fecharMenu: "Fechar menu",
    },

    en: {
      sobre: "About",
      habilidades: "Skills",
      projetos: "Projects",
      atividade: "Coding stats",
      experiencias: "Experiences",
      contato: "Contact",
      idioma: "PT",
      abrirMenu: "Open menu",
      fecharMenu: "Close menu",
    },
  }

  const t = text[language]

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header fixed left-0 top-0 z-50 w-full border-b border-[#759AAB]/30 bg-[#FFFEE8]/95 backdrop-blur">
      <nav className="site-header-nav mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <a
          href="#home"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-[#253D5B]"
        >
          LA
        </a>

        {/* Desktop */}
        <div className="header-desktop-nav items-center gap-8">

          <a
            href="#sobre"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.sobre}
          </a>

          <a
            href="#habilidades"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.habilidades}
          </a>

          <a
            href="#projetos"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.projetos}
          </a>

          <a
            href="#wakatime"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.atividade}
          </a>

          <a
            href="#experiencias"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.experiencias}
          </a>

          <a
            href="#contato"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.contato}
          </a>

          <button
            type="button"
            onClick={toggleLanguage}
            className="header-language-toggle rounded-full border border-[#253D5B] px-4 py-2 text-xs font-semibold text-[#253D5B] transition hover:bg-[#253D5B] hover:text-[#FFFEE8]"
          >
            {t.idioma}
          </button>

        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="header-menu-toggle text-[#253D5B]"
          aria-label={menuOpen ? t.fecharMenu : t.abrirMenu}
          aria-expanded={menuOpen}
          aria-controls="portfolio-mobile-menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div id="portfolio-mobile-menu" className="header-mobile-menu border-t border-[#759AAB]/30 bg-[#FFFEE8] px-6 py-6">

          <div className="header-mobile-links flex flex-col gap-5">

            <a href="#sobre" onClick={closeMenu}>
              {t.sobre}
            </a>

            <a href="#habilidades" onClick={closeMenu}>
              {t.habilidades}
            </a>

            <a href="#projetos" onClick={closeMenu}>
              {t.projetos}
            </a>

            <a href="#wakatime" onClick={closeMenu}>
              {t.atividade}
            </a>

            <a href="#experiencias" onClick={closeMenu}>
              {t.experiencias}
            </a>

            <a href="#contato" onClick={closeMenu}>
              {t.contato}
            </a>

            <button
              type="button"
              onClick={() => {
                toggleLanguage()
                closeMenu()
              }}
              className="header-language-toggle w-fit rounded-full border border-[#253D5B] px-4 py-2 text-xs font-semibold text-[#253D5B]"
            >
              {t.idioma}
            </button>

          </div>
        </div>
      )}
    </header>
  )
}

export default Header