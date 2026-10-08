import { useLanguage } from "../context/LanguageContext"

function Sobre() {
  const { language } = useLanguage()

  const texts = {
    pt: {
      numero: "01 / Sobre mim",
      titulo: "Entre aprender e construir.",
      descricao:
        "Um olhar curioso para a tecnologia e para as possibilidades que ela cria.",

      subtitulo: "Quem sou",
      texto1:
        "Sou estudante de Engenharia de Software e tenho interesse em tecnologia, desenvolvimento web e criação de soluções digitais.",
      texto2:
        "Gosto de aprender colocando ideias em prática, desenvolvendo projetos e buscando evoluir continuamente.",

      formacao: "Formação",
      formacaoTitulo: "Engenharia de Software",
      formacaoDescricao: "PUC Minas",

      interesses: "Interesses",
      interessesTitulo: "Tecnologia & Web",
      interessesDescricao:
        "Desenvolvimento web, programação e criação de soluções digitais.",

      objetivos: "Objetivos",
      objetivosTitulo: "Evoluir construindo",
      objetivosDescricao:
        "Aprender continuamente e transformar ideias em projetos.",
    },

    en: {
      numero: "01 / About me",
      titulo: "Between learning and building.",
      descricao:
        "A curious perspective on technology and the possibilities it creates.",

      subtitulo: "Who I am",
      texto1:
        "I am a Software Engineering student interested in technology, web development and creating digital solutions.",
      texto2:
        "I enjoy learning by putting ideas into practice, developing projects and continuously improving my skills.",

      formacao: "Education",
      formacaoTitulo: "Software Engineering",
      formacaoDescricao: "PUC Minas",

      interesses: "Interests",
      interessesTitulo: "Technology & Web",
      interessesDescricao:
        "Web development, programming and creating digital solutions.",

      objetivos: "Goals",
      objetivosTitulo: "Keep building",
      objetivosDescricao:
        "Continuously learn and turn ideas into projects.",
    },
  }

  const t = texts[language]

  return (
    <section id="sobre" className="bg-[#FFFEE8] px-6 py-24">

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

        <div className="mt-12 border-y border-[#759AAB]/40 py-12">

          <h3 className="text-2xl font-semibold text-[#253D5B]">
            {t.subtitulo}
          </h3>

          <div className="mt-6 max-w-3xl">

            <p className="text-sm leading-7 text-[#1E252B]/80">
              {t.texto1}
            </p>

            <p className="mt-4 text-sm leading-7 text-[#1E252B]/80">
              {t.texto2}
            </p>

          </div>

        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">

          <div className="border-t border-[#759AAB]/40 pt-5">

            <p className="text-xs uppercase tracking-[0.2em] text-[#759AAB]">
              {t.formacao}
            </p>

            <h3 className="mt-3 text-lg font-semibold text-[#253D5B]">
              {t.formacaoTitulo}
            </h3>

            <p className="mt-2 text-sm text-[#1E252B]/70">
              {t.formacaoDescricao}
            </p>

          </div>

          <div className="border-t border-[#759AAB]/40 pt-5">

            <p className="text-xs uppercase tracking-[0.2em] text-[#759AAB]">
              {t.interesses}
            </p>

            <h3 className="mt-3 text-lg font-semibold text-[#253D5B]">
              {t.interessesTitulo}
            </h3>

            <p className="mt-2 text-sm text-[#1E252B]/70">
              {t.interessesDescricao}
            </p>

          </div>

          <div className="border-t border-[#759AAB]/40 pt-5">

            <p className="text-xs uppercase tracking-[0.2em] text-[#759AAB]">
              {t.objetivos}
            </p>

            <h3 className="mt-3 text-lg font-semibold text-[#253D5B]">
              {t.objetivosTitulo}
            </h3>

            <p className="mt-2 text-sm text-[#1E252B]/70">
              {t.objetivosDescricao}
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Sobre