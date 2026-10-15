import { useLanguage } from "../context/useLanguage"

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
      projetos: "Conheça meus projetos",
      contato: "Entre em contato",
    },

    en: {
      saudacao: "Hello, I am",
      nome: "Letícia Abreu.",
      profissao: "Software Engineering Student",
      destaque: "Technology, code and digital experiences.",
      descricao:
        "A portfolio to showcase my journey, projects, experiences and interests in technology.",
      projetos: "See my projects",
      contato: "Get in touch",
    },
  }

  const t = texts[language]

  return (
    <section id="home">
      <div className="home-content">

        {/* TEXTO */}
        <div className="home-text">

          <p className="home-label">
            {t.saudacao}
          </p>

          <h1>
            {t.nome}
          </h1>

          <h2>
            {t.profissao}
          </h2>

          <p className="home-highlight">
            {t.destaque}
          </p>

          <p className="home-description">
            {t.descricao}
          </p>

          <div className="home-buttons">

            <a href="#projetos" className="home-button-primary">
              {t.projetos}
            </a>

            <a href="#contato" className="home-button-secondary">
              {t.contato}
            </a>

          </div>

        </div>

        {/* COMPOSIÇÃO DA FOTO */}
        <div className="home-visual">

          {/* contorno pontilhado */}
          <div className="visual-outline" />

          {/* círculo superior */}
          <div className="visual-circle" />

          {/* detalhe vinho */}
          <div className="visual-star">
            ✦
          </div>

          {/* bloco azul atrás */}
          <div className="visual-back" />

          {/* FOTO */}
          <div className="visual-photo">
            <img
              src="/images/foto-leticia.jpeg"
              alt="Foto de Letícia Abreu"
            />
          </div>

          {/* pequeno detalhe tecnológico */}
          <div className="visual-code">
            &lt;/&gt;
          </div>

        </div>

      </div>
    </section>
  )
}

export default Home