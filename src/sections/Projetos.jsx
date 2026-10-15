import { useLanguage } from "../context/useLanguage"
import { projetos } from "../data/projetos"

function Projetos() {
  const { language } = useLanguage()

  const text = {
    pt: {
      numero: "02 / Projetos",
      titulo: "Ideias que viraram código.",
      descricao:
        "Uma linha do tempo dos projetos que fizeram parte da minha trajetória.",
      github: "Ver no GitHub",
    },

    en: {
      numero: "02 / Projects",
      titulo: "Ideas turned into code.",
      descricao:
        "A timeline of projects that have been part of my journey.",
      github: "View on GitHub",
    },
  }

  const t = text[language]

  return (
    <section
      id="projetos"
      className="bg-[#253D5B] px-6 py-24 text-[#FFFEE8]"
    >
      <div className="mx-auto max-w-6xl">

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#759AAB]">
          {t.numero}
        </p>

        <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
          {t.titulo}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#FFFEE8]/70">
          {t.descricao}
        </p>

        <div className="mt-16 relative">

          {/* linha da timeline */}
          <div className="absolute left-2 top-0 hidden h-full w-px bg-[#759AAB]/60 md:block" />

          <div className="space-y-12">

            {projetos.map((projeto, index) => (

              <article
                key={`${projeto.ano}-${index}`}
                className="grid gap-8 md:grid-cols-[120px_1fr]"
              >

                <div>

                  <div className="hidden items-center gap-3 md:flex">

                    <span className="relative z-10 h-4 w-4 rounded-full bg-[#FFFEE8]" />

                    <span className="text-sm font-medium text-[#759AAB]">
                      {projeto.ano}
                    </span>

                  </div>

                  <span className="text-4xl text-[#759AAB] md:hidden">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <div className="overflow-hidden rounded-3xl border border-[#759AAB]/30 bg-[#1E252B]/40">

                  <div className="grid md:grid-cols-2">

                    <div className="min-h-64 bg-[#759AAB]/20">

                      <img
                        src={projeto.imagem}
                        alt={projeto[language].nome}
                        className="h-full min-h-64 w-full object-cover"
                      />

                    </div>

                    <div className="flex flex-col justify-center p-8">

                      <p className="text-xs uppercase tracking-[0.2em] text-[#759AAB]">
                        {projeto.ano}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold">
                        {projeto[language].nome}
                      </h3>

                      <p className="mt-4 text-sm leading-6 text-[#FFFEE8]/70">
                        {projeto[language].descricao}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        {projeto.tecnologias.map((tecnologia) => (
                          <span
                            key={tecnologia}
                            className="rounded-full border border-[#759AAB]/50 px-3 py-1 text-xs"
                          >
                            {tecnologia}
                          </span>
                        ))}

                      </div>

                      <a
                        href={projeto.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-github-button mt-7 w-fit rounded-full border border-[#FFFEE8]/40 px-5 py-2 text-sm transition hover:bg-[#FFFEE8] hover:text-[#253D5B]"
                      >
                        {t.github}
                      </a>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>
        </div>

      </div>
    </section>
  )
}

export default Projetos