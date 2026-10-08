import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

function Header() {
  const { language, toggleLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const text = {
    pt: {
      sobre: "Sobre",
      projetos: "Projetos",
      experiencias: "Experiências",
      contato: "Contato",
      idioma: "EN",
    },

    en: {
      sobre: "About",
      projetos: "Projects",
      experiencias: "Experience",
      contato: "Contact",
      idioma: "PT",
    },
  }

  const t = text[language]

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#759AAB]/30 bg-[#FFFEE8]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <a
          href="#home"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-[#253D5B]"
        >
          LA
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#sobre"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.sobre}
          </a>

          <a
            href="#projetos"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            {t.projetos}
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
            className="rounded-full border border-[#253D5B] px-4 py-2 text-xs font-semibold text-[#253D5B] transition hover:bg-[#253D5B] hover:text-[#FFFEE8]"
          >
            {t.idioma}
          </button>

        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#253D5B]"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="border-t border-[#759AAB]/30 bg-[#FFFEE8] px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            <a href="#sobre" onClick={closeMenu}>
              {t.sobre}
            </a>

            <a href="#projetos" onClick={closeMenu}>
              {t.projetos}
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
              className="w-fit rounded-full border border-[#253D5B] px-4 py-2 text-xs font-semibold text-[#253D5B]"
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