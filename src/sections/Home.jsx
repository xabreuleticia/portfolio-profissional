import { useLanguage } from "../context/LanguageContext"

function Home() {
  const { language } = useLanguage()

  const texts = {
    pt: {
      saudacao: "Olá, sou",
      nome: "Letícia Abreu.",
      profissao: "Estudante de Engenharia de Software",
      destaque: "Tecnologia, código e experiências digitais.",
      descricao:
        "Um portfólio para apresentar minha trajetória, projetos, experiências e interesses em tecnologia.",
      projetos: "Conheça meus projetos →",
      contato: "Entre em contato",
      foto: "Sua foto",
    },

    en: {
      saudacao: "Hello, I am",
      nome: "Letícia Abreu.",
      profissao: "Software Engineering Student",
      destaque: "Technology, code and digital experiences.",
      descricao:
        "A portfolio to showcase my journey, projects, experiences and interests in technology.",
      projetos: "See my projects →",
      contato: "Get in touch",
      foto: "Your photo",
    },
  }

  const t = texts[language]

  return (
    <section id="home" className="bg-[#FFFEE8] px-6">

      <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 py-16 md:grid-cols-2">

        <div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#759AAB]">
            {t.saudacao}
          </p>

          <h1 className="text-5xl font-bold leading-tight text-[#253D5B] md:text-7xl">
            {t.nome}
          </h1>

          <h2 className="mt-4 text-xl text-[#1E252B] md:text-2xl">
            {t.profissao}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1E252B]">
            {t.destaque}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#1E252B]/70">
            {t.descricao}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#projetos"
              className="rounded-full bg-[#253D5B] px-7 py-3 text-sm font-semibold text-[#FFFEE8] transition hover:bg-[#600819]"
            >
              {t.projetos}
            </a>

            <a
              href="#contato"
              className="rounded-full border border-[#253D5B] px-7 py-3 text-sm font-semibold text-[#253D5B] transition hover:bg-[#253D5B] hover:text-[#FFFEE8]"
            >
              {t.contato}
            </a>

          </div>

        </div>

        <div className="flex justify-center">

          <div className="h-80 w-72 rounded-[40px] bg-[#759AAB] p-4 md:h-96 md:w-80">

            <img
              src="/images/foto-leticia.jpeg"
              alt="Foto de Letícia Abreu"
              className="h-full w-full rounded-[32px] object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  )
}

export default Home