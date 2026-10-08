import { useLanguage } from "../context/LanguageContext"
import { experiencias } from "../data/experiencias"

function Experiencias() {
  const { language } = useLanguage()

  const text = {
    pt: {
      numero: "03 / Experiências",
      titulo: "Minha trajetória.",
      descricao:
        "Experiências, aprendizados e momentos que contribuíram para minha formação.",
    },

    en: {
      numero: "03 / Experience",
      titulo: "My journey.",
      descricao:
        "Experiences, learning and moments that have contributed to my development.",
    },
  }

  const t = text[language]

  return (
    <section
      id="experiencias"
      className="bg-[#FFFEE8] px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#759AAB]">
          {t.numero}
        </p>

        <h2 className="mt-4 text-4xl font-semibold text-[#253D5B] md:text-5xl">
          {t.titulo}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#1E252B]/70">
          {t.descricao}
        </p>

        <div className="mt-14 space-y-10">

          {experiencias.map((experiencia, index) => (

            <article
              key={`${experiencia.ano}-${index}`}
              className="grid gap-6 border-t border-[#759AAB]/40 pt-8 md:grid-cols-[140px_1fr]"
            >

              <div className="text-sm font-medium text-[#759AAB]">
                {experiencia.ano}
              </div>

              <div>

                <h3 className="text-2xl font-semibold text-[#253D5B]">
                  {experiencia[language].titulo}
                </h3>

                <p className="mt-2 text-sm font-medium text-[#600819]">
                  {experiencia[language].instituicao}
                </p>

                <p className="mt-1 text-sm text-[#1E252B]/60">
                  {experiencia[language].periodo}
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#1E252B]/75">
                  {experiencia[language].descricao}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  )
}

export default Experiencias