import { useLanguage } from "../context/useLanguage"

function Sobre({ onOpenPersonalMap }) {
  const { language } = useLanguage()

  const texts = {
    pt: {
      numero: "01 / SOBRE MIM",

      titulo: "Curiosidade que vira",
      destaque: "construção.",

      introducao:
        "Acredito que aprender tecnologia ganha sentido quando transformamos ideias em algo real.",

      subtitulo: "Um pouco sobre mim",

      paragrafo1:
        "Sou estudante de Engenharia de Software na PUC Minas. Tenho interesse em desenvolvimento web, programação e criação de soluções digitais.",

      paragrafo2:
        "Gosto de aprender na prática, explorar possibilidades e colaborar com outras pessoas. Para mim, cada projeto é uma oportunidade de desenvolver novas habilidades e transformar conhecimento em experiência.",

      botao: "Conheça meus projetos",
      botaoMapa: "Explorar meu mapa pessoal",

      cartaoRotulo: "MEU JEITO DE APRENDER",
      cartaoLinha1: "Aprender.",
      cartaoLinha2: "Experimentar.",
      cartaoLinha3: "Construir.",

      cartaoDescricao:
        "Transformar conhecimento em prática, uma ideia de cada vez.",

      cartaoRodape: "ENGENHARIA DE SOFTWARE · PUC MINAS",

      formacaoRotulo: "FORMAÇÃO",
      formacaoTitulo: "Engenharia de Software",
      formacaoDescricao:
        "Graduação em andamento na PUC Minas.",

      interessesRotulo: "INTERESSES",
      interessesTitulo: "Tecnologia & Web",
      interessesDescricao:
        "Desenvolvimento web, lógica de programação e soluções digitais.",

      objetivosRotulo: "OBJETIVOS",
      objetivosTitulo: "Crescer construindo",
      objetivosDescricao:
        "Aprofundar conhecimentos, colaborar em projetos e evoluir como desenvolvedora.",
    },

    en: {
      numero: "01 / ABOUT ME",

      titulo: "Curiosity turned into",
      destaque: "creation.",

      introducao:
        "I believe learning technology becomes meaningful when we turn ideas into something real.",

      subtitulo: "A little about me",

      paragrafo1:
        "I am a Software Engineering student at PUC Minas, interested in web development, programming and creating digital solutions.",

      paragrafo2:
        "I enjoy learning by doing, exploring possibilities and collaborating with others. To me, every project is an opportunity to develop new skills and turn knowledge into experience.",

      botao: "Explore my projects",
      botaoMapa: "Explore my personal map",

      cartaoRotulo: "HOW I LIKE TO LEARN",
      cartaoLinha1: "Learn.",
      cartaoLinha2: "Experiment.",
      cartaoLinha3: "Build.",

      cartaoDescricao:
        "Turning knowledge into practice, one idea at a time.",

      cartaoRodape: "SOFTWARE ENGINEERING · PUC MINAS",

      formacaoRotulo: "EDUCATION",
      formacaoTitulo: "Software Engineering",
      formacaoDescricao:
        "Undergraduate degree in progress at PUC Minas.",

      interessesRotulo: "INTERESTS",
      interessesTitulo: "Technology & Web",
      interessesDescricao:
        "Web development, programming logic and digital solutions.",

      objetivosRotulo: "GOALS",
      objetivosTitulo: "Grow by building",
      objetivosDescricao:
        "Expand my knowledge, collaborate on projects and grow as a developer.",
    },
  }

  const t = texts[language]

  return (
    <section id="sobre" className="about-section">
      <div className="about-container">

        {/* Título e introdução */}

        <div className="about-heading">

          <p className="about-kicker">
            <span className="about-kicker-number">01</span>
            <span>{t.numero.replace("01 / ", "")}</span>
          </p>

          <div className="about-heading-grid">

            <h2 className="about-title">
              {t.titulo}{" "}
              <span>{t.destaque}</span>
            </h2>

            <p className="about-intro">
              {t.introducao}
            </p>

          </div>

        </div>

        {/* Apresentação e painel visual */}

        <div className="about-main">

          <div className="about-copy">

            <p className="about-section-label">
              {t.subtitulo}
            </p>

            <h3 className="about-copy-title">
              {language === "pt"
                ? "Aprender é o começo. Construir é o caminho."
                : "Learning is the beginning. Building is the journey."}
            </h3>

            <p className="about-paragraph">
              {t.paragrafo1}
            </p>

            <p className="about-paragraph">
              {t.paragrafo2}
            </p>

            <div className="about-actions">
              <a href="#projetos" className="about-link">
                {t.botao}
              </a>

              <button
                type="button"
                className="about-map-button"
                onClick={onOpenPersonalMap}
              >
                {t.botaoMapa}
              </button>
            </div>

          </div>

          {/* Painel gráfico */}

          <div className="about-panel">

            <div className="about-panel-top">
              <span>LA / 2026</span>
              <span className="about-panel-dot" />
            </div>

            <div className="about-panel-content">

              <p className="about-panel-label">
                {t.cartaoRotulo}
              </p>

              <h3 className="about-panel-title">
                <span>{t.cartaoLinha1}</span>
                <span>{t.cartaoLinha2}</span>
                <span>{t.cartaoLinha3}</span>
              </h3>

              <p className="about-panel-description">
                {t.cartaoDescricao}
              </p>

            </div>

            <div className="about-panel-bottom">
              <span>{t.cartaoRodape}</span>
              <span className="about-panel-symbol">✳</span>
            </div>

            <span className="about-panel-watermark" aria-hidden="true">
              LA
            </span>

          </div>

        </div>

        {/* Formação, interesses e objetivos */}

        <div className="about-details">

          <article className="about-detail">

            <span className="about-detail-number">01</span>

            <p className="about-detail-label">
              {t.formacaoRotulo}
            </p>

            <h3>{t.formacaoTitulo}</h3>

            <p className="about-detail-description">
              {t.formacaoDescricao}
            </p>

          </article>

          <article className="about-detail">

            <span className="about-detail-number">02</span>

            <p className="about-detail-label">
              {t.interessesRotulo}
            </p>

            <h3>{t.interessesTitulo}</h3>

            <p className="about-detail-description">
              {t.interessesDescricao}
            </p>

          </article>

          <article className="about-detail">

            <span className="about-detail-number">03</span>

            <p className="about-detail-label">
              {t.objetivosRotulo}
            </p>

            <h3>{t.objetivosTitulo}</h3>

            <p className="about-detail-description">
              {t.objetivosDescricao}
            </p>

          </article>

        </div>

      </div>
    </section>
  )
}

export default Sobre