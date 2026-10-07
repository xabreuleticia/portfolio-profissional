function Header() {
  return (
    <header className="w-full bg-[#FFFEE8]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <a
          href="#home"
          className="text-3xl font-bold text-[#253D5B]"
        >
          LA
        </a>

        <div className="flex gap-8">
          <a
            href="#sobre"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            Sobre
          </a>

          <a
            href="#projetos"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            Projetos
          </a>

          <a
            href="#experiencias"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            Experiências
          </a>

          <a
            href="#contato"
            className="text-sm font-medium text-[#1E252B] transition hover:text-[#759AAB]"
          >
            Contato
          </a>
        </div>

      </nav>
    </header>
  )
}

export default Header