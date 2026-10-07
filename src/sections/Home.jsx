function Home() {
  return (
    <section
      id="home"
      className="min-h-[90vh] bg-[#FFFEE8] px-6"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between gap-12">

        <div className="max-w-2xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#759AAB]">
            Olá, eu sou
          </p>

          <h1 className="text-5xl font-bold leading-tight text-[#253D5B] md:text-7xl">
            Letícia Abreu
          </h1>

          <h2 className="mt-4 text-xl text-[#1E252B] md:text-2xl">
            Estudante de Engenharia de Software
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1E252B]/80">
            Apaixonada por tecnologia e desenvolvimento de soluções
            através da programação.
          </p>

          <a
            href="#projetos"
            className="mt-8 inline-block rounded-full bg-[#253D5B] px-7 py-3 font-semibold text-[#FFFEE8] transition hover:bg-[#600819]"
          >
            Conheça meus projetos →
          </a>

        </div>

        <div className="hidden md:block">
          <div className="h-96 w-80 rounded-3xl bg-[#759AAB] p-4">
            <div className="flex h-full items-center justify-center rounded-2xl bg-[#253D5B]">
              <span className="text-[#FFFEE8]">
                SUA FOTO
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Home