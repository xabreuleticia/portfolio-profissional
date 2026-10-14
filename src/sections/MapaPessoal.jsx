import { useCallback, useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
} from "lucide-react"
import { useLanguage } from "../context/useLanguage"
import {
  mapaPessoalCapa,
  mapaPessoalDestinos,
  mapaPessoalHobbies,
} from "../data/mapaPessoalData"
import "./MapaPessoal.css"

const copy = {
  pt: {
    voltar: "Sobre mim",
    idioma: "EN",
    nomeColecao: "Caderno pessoal",
    fotoCapaAlt: "Fotografia de capa do mapa pessoal",
    capaPlaceholder: "Adicione sua fotografia de capa",
    viagensKicker: "CADERNO DE VIAGENS",
    hobbiesKicker: "FORA DA ROTA",
    verMais: "Ver mais",
    fecharDetalhes: "Voltar às fotografias",
    secaoFotos: "Mais deste lugar",
    historia: "Sobre este lugar",
    fotosPlaceholder: "Adicione fotografias deste lugar",
    fotoLabel: "FOTO EM BRANCO",
    fotoHint: "Adicione uma imagem e personalize a legenda no arquivo de dados.",
    anterior: "Slide anterior",
    proximo: "Próximo slide",
    pausar: "Pausar passagem automática",
    retomar: "Retomar passagem automática",
    instrucao: "Use as setas ou deslize para explorar",
    altVazio: "Espaço reservado para adicionar sua própria fotografia",
    semLegenda: "Escreva sua legenda aqui.",
  },
  en: {
    voltar: "About me",
    idioma: "PT",
    nomeColecao: "Personal journal",
    fotoCapaAlt: "Personal map cover photograph",
    capaPlaceholder: "Add your cover photograph",
    viagensKicker: "TRAVEL JOURNAL",
    hobbiesKicker: "OFF THE ROUTE",
    verMais: "Explore",
    fecharDetalhes: "Back to photographs",
    secaoFotos: "More from this place",
    historia: "About this place",
    fotosPlaceholder: "Add photographs of this place",
    fotoLabel: "PHOTO PLACEHOLDER",
    fotoHint: "Add an image and personalize its caption in the data file.",
    anterior: "Previous slide",
    proximo: "Next slide",
    pausar: "Pause automatic playback",
    retomar: "Resume automatic playback",
    instrucao: "Use the arrows or swipe to explore",
    altVazio: "Space reserved for your own photograph",
    semLegenda: "Write your caption here.",
  },
}

const temasViagem = [
  { bg: "#E9E0D1", ink: "#253D5B", muted: "#526171", accent: "#895447", frame: "#D5C8B7", soft: "#F4EEE5" },
  { bg: "#DDE7EB", ink: "#1E303A", muted: "#4E646D", accent: "#9B5961", frame: "#C4D5DB", soft: "#EDF3F4" },
  { bg: "#DDEAE6", ink: "#243D39", muted: "#506963", accent: "#9B6254", frame: "#C3D8D1", soft: "#EFF5F2" },
  { bg: "#F0DFD7", ink: "#49322F", muted: "#775B54", accent: "#8B3948", frame: "#DFC5BB", soft: "#F8EDE7" },
  { bg: "#E9E8DA", ink: "#384536", muted: "#5E6A57", accent: "#91634E", frame: "#D5D9C6", soft: "#F4F3E9" },
  { bg: "#E5E5E1", ink: "#252D35", muted: "#606870", accent: "#7B3948", frame: "#CED1CE", soft: "#F5F4F0" },
  { bg: "#D7E6EA", ink: "#223C4B", muted: "#526F79", accent: "#8F5149", frame: "#BFD7DE", soft: "#EDF5F6" },
  { bg: "#DDE5D9", ink: "#2B4036", muted: "#596C60", accent: "#7D4A44", frame: "#C5D4C3", soft: "#F0F4EC" },
]

const temasHobbies = [
  { bg: "#EDE3DA", ink: "#3E3431", muted: "#75605A", accent: "#8B3948", frame: "#D8C9BE", soft: "#F7F0E9" },
  { bg: "#E2E7F0", ink: "#253D5B", muted: "#5C6D85", accent: "#8C4B58", frame: "#C9D3E3", soft: "#F0F3F8" },
  { bg: "#E4E9DC", ink: "#304335", muted: "#5F715F", accent: "#935C4B", frame: "#CDD8C1", soft: "#F2F5EC" },
]

function themeStyle(theme) {
  return {
    "--story-bg": theme.bg,
    "--story-ink": theme.ink,
    "--story-muted": theme.muted,
    "--story-accent": theme.accent,
    "--story-frame": theme.frame,
    "--story-soft": theme.soft,
  }
}

function getPrimaryPhoto(item) {
  return item?.fotos?.[0] || null
}

function getTitle(content) {
  return [content?.nome, content?.complemento].filter(Boolean).join(" ")
}

function MapaPessoal({ onBack }) {
  const { language, toggleLanguage } = useLanguage()
  const text = copy[language] || copy.pt
  const [activeIndex, setActiveIndex] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const [fotoAberta, setFotoAberta] = useState(null)
  const [autoplayPaused, setAutoplayPaused] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ))
  const touchStartX = useRef(null)

  const slides = [
    { id: "cover", type: "cover" },
    ...mapaPessoalDestinos.map((destino, index) => ({
      id: destino.id,
      type: "destination",
      item: destino,
      theme: temasViagem[index % temasViagem.length],
    })),
    ...mapaPessoalHobbies.map((hobby, index) => ({
      id: hobby.id,
      type: "hobby",
      item: hobby,
      theme: temasHobbies[index % temasHobbies.length],
    })),
  ]
  const totalSlides = slides.length
  const activeSlide = slides[activeIndex]
  const activeHasPhoto = activeSlide?.type === "cover"
    ? Boolean(mapaPessoalCapa.src)
    : Boolean(activeSlide?.item?.fotos?.[0]?.src)
  const activeInk = activeSlide?.type === "cover" || activeHasPhoto
    ? "#FFF4E8"
    : (activeSlide?.theme?.ink || "#253D5B")

  const previousSlide = useCallback(() => {
    setDetailOpen(false)
    setFotoAberta(null)
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    setDetailOpen(false)
    setFotoAberta(null)
    setActiveIndex((current) => (current + 1) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    if (autoplayPaused || detailOpen || fotoAberta) return undefined
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveIndex((current) => (current + 1) % totalSlides)
      }
    }, 8500)
    return () => window.clearInterval(timer)
  }, [activeIndex, autoplayPaused, detailOpen, fotoAberta, totalSlides])

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    function handlePreference(event) {
      if (event.matches) setAutoplayPaused(true)
    }
    preference.addEventListener?.("change", handlePreference)
    return () => preference.removeEventListener?.("change", handlePreference)
  }, [])

  useEffect(() => {
    function handleKeyboard(event) {
      if (event.key === "Escape") {
        if (fotoAberta) setFotoAberta(null)
        else if (detailOpen) setDetailOpen(false)
        return
      }
      if (detailOpen || fotoAberta || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.target?.closest?.("input, textarea, select, [contenteditable='true']")) return
      if (event.key === "ArrowRight") {
        event.preventDefault()
        nextSlide()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        previousSlide()
      }
    }
    window.addEventListener("keydown", handleKeyboard)
    return () => window.removeEventListener("keydown", handleKeyboard)
  }, [detailOpen, fotoAberta, nextSlide, previousSlide])

  function handleTouchStart(event) {
    if (detailOpen) return
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  function handleTouchEnd(event) {
    if (detailOpen || touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 55) {
      if (delta < 0) nextSlide()
      else previousSlide()
    }
    touchStartX.current = null
  }

  function renderCover() {
    const capa = mapaPessoalCapa[language] || mapaPessoalCapa.pt
    return (
      <article className={`journal-teaser journal-teaser--cover ${mapaPessoalCapa.src ? "journal-teaser--has-image" : "journal-teaser--placeholder"}`}>
        {mapaPessoalCapa.src ? (
          <img className="journal-teaser-image" src={mapaPessoalCapa.src} alt={mapaPessoalCapa.alt?.[language] || text.fotoCapaAlt} fetchPriority="high" />
        ) : (
          <div className="journal-teaser-art journal-teaser-art--cover" aria-hidden="true">
            <span className="journal-cover-art-shape journal-cover-art-shape--one" />
            <span className="journal-cover-art-shape journal-cover-art-shape--two" />
            <span className="journal-cover-art-grain" />
            <span className="journal-placeholder-note"><Camera size={15} />{text.capaPlaceholder}</span>
          </div>
        )}
        <div className="journal-teaser-shade journal-teaser-shade--cover" />
        <div className="journal-teaser-content journal-teaser-content--cover">
          <h1>{capa.titulo}<br /><em>{capa.destaque}</em></h1>
        </div>
      </article>
    )
  }

  function renderTeaser(slide) {
    const item = slide.item
    const content = item[language] || item.pt
    const primaryPhoto = getPrimaryPhoto(item)
    const title = getTitle(content)
    const theme = slide.theme || temasViagem[0]
    const hasPhoto = Boolean(primaryPhoto?.src)

    return (
      <article
        className={`journal-teaser ${hasPhoto ? "journal-teaser--has-image" : "journal-teaser--placeholder"} journal-teaser--${slide.type}`}
        style={themeStyle(theme)}
      >
        {hasPhoto ? (
          <img className="journal-teaser-image" src={primaryPhoto.src} alt={primaryPhoto.alt?.[language] || title} loading="eager" />
        ) : (
          <div className="journal-teaser-art" aria-hidden="true">
            <span className="journal-teaser-art-orbit journal-teaser-art-orbit--one" />
            <span className="journal-teaser-art-orbit journal-teaser-art-orbit--two" />
            <span className="journal-teaser-art-landscape" />
            <span className="journal-placeholder-note"><Camera size={15} />{text.capaPlaceholder}</span>
          </div>
        )}
        <div className="journal-teaser-shade" />
        <div className="journal-teaser-content">
          <h1>{title}</h1>
          <button className="journal-teaser-more" type="button" onClick={() => setDetailOpen(true)}>
            <span>{text.verMais}</span><ArrowUpRight size={17} strokeWidth={1.7} />
          </button>
        </div>
        {primaryPhoto?.src && primaryPhoto[language]?.legenda && (
          <p className="journal-teaser-image-caption">{primaryPhoto[language].legenda}</p>
        )}
      </article>
    )
  }

  function renderDetails(slide) {
    if (!slide || slide.type === "cover") return null
    const item = slide.item
    const content = item[language] || item.pt
    const title = getTitle(content)
    const isTravel = slide.type === "destination"
    const photos = item.fotos || []
    const style = themeStyle(slide.theme || temasViagem[0])

    return (
      <div className="journal-detail-screen" style={style} role="dialog" aria-modal="true" aria-label={title}>
        <div className="journal-detail-topbar">
          <button className="journal-detail-back" type="button" onClick={() => setDetailOpen(false)}>
            <ArrowLeft size={17} /><span>{text.fecharDetalhes}</span>
          </button>
          <button className="journal-detail-close" type="button" onClick={() => setDetailOpen(false)} aria-label={text.fecharDetalhes}>
            <X size={21} />
          </button>
        </div>
        <div className="journal-detail-scroll">
          <div className="journal-detail-heading">
            <p className="journal-detail-kicker">{isTravel ? content.regiao : (content.tipo || text.hobbiesKicker)}</p>
            <h2>{title}</h2>
            <p className="journal-detail-summary">{isTravel ? content.resumo : content.descricao}</p>
            <p className="journal-detail-description">{isTravel ? content.detalhe : (content.detalhe || (language === "pt" ? "Um espaço para guardar imagens e pequenos detalhes deste interesse." : "A space to keep images and little details about this interest."))}</p>
          </div>
          <div className="journal-detail-gallery-section">
            <div className="journal-detail-gallery-heading">
              <p>{text.secaoFotos}</p>
              <span>{String(photos.length).padStart(2, "0")} {language === "pt" ? "fotografias" : "photographs"}</span>
            </div>
            <div className="journal-detail-gallery">
              {photos.map((foto, index) => {
                const photoText = foto[language] || foto.pt
                const hasPhoto = Boolean(foto.src)
                return (
                  <figure className={`journal-detail-photo journal-detail-photo--${index + 1}`} key={foto.id}>
                    <div className="journal-detail-photo-frame">
                      {hasPhoto ? (
                        <button
                          type="button"
                          className="journal-detail-photo-button"
                          onClick={() => setFotoAberta({ ...foto, ...photoText, alt: foto.alt?.[language] || title })}
                          aria-label={`${text.abrirFoto || "Open photo"}: ${photoText.local}`}
                        >
                          <img src={foto.src} alt={foto.alt?.[language] || photoText.local || title} loading="lazy" />
                          <span className="journal-detail-photo-open"><ArrowUpRight size={17} /></span>
                        </button>
                      ) : (
                        <div className="journal-detail-photo-placeholder">
                          <Camera size={22} strokeWidth={1.4} />
                          <span>{text.fotoLabel}</span>
                          <strong>{photoText.tipo || title}</strong>
                          <small>{photoText.dica || text.fotosPlaceholder}</small>
                        </div>
                      )}
                    </div>
                    <figcaption>
                      <span>{photoText.tipo || text.fotoLabel}</span>
                      <p>{photoText.legenda || text.semLegenda}</p>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  function slideLabel(slide) {
    if (slide.type === "cover") return text.nomeColecao
    const content = slide.item?.[language] || slide.item?.pt
    return getTitle(content) || text.nomeColecao
  }

  return (
    <div
      className={`personal-map-carousel ${detailOpen ? "personal-map-carousel--details-open" : ""}`}
      style={{ "--carousel-ui-ink": activeInk, "--slide-count": totalSlides }}
    >
      <div className="journal-topbar" role="banner">
        <button type="button" className="journal-back" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={1.8} />
          <span>{text.voltar}</span>
        </button>
        <div className="journal-brand" aria-label={text.nomeColecao}>
          <span className="journal-brand-monogram">LA</span>
          <span className="journal-brand-label">{text.nomeColecao}</span>
        </div>
        <button
          type="button"
          className="journal-language"
          onClick={toggleLanguage}
          aria-label={language === "pt" ? "Switch to English" : "Mudar para português"}
        >
          {text.idioma}
        </button>
      </div>

      <div className="journal-viewport" role="region" aria-label={text.nomeColecao} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          className="journal-track"
          style={{ transform: `translate3d(-${(activeIndex * 100) / totalSlides}%, 0, 0)` }}
        >
          {slides.map((slide, index) => {
            const active = index === activeIndex
            const content = slide.type === "cover" ? renderCover() : renderTeaser(slide)
            return (
              <section
                key={slide.id}
                className={`journal-slide journal-slide--${slide.type}`}
                aria-label={slideLabel(slide)}
                aria-hidden={!active}
                inert={!active || detailOpen}
              >
                {content}
              </section>
            )
          })}
        </div>
      </div>

      <footer className={`journal-controls ${activeIndex === 0 ? "journal-controls--cover" : ""} ${detailOpen ? "journal-controls--hidden" : ""}`}>
        <div className="journal-controls-progress">
          <div className="journal-progress-track" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / totalSlides) * 100}%` }} />
          </div>
          <span className="journal-controls-hint">{text.instrucao}</span>
          <span className="journal-sr-only" aria-live="polite">{activeIndex + 1} / {totalSlides}: {slideLabel(activeSlide)}</span>
        </div>
        <div className="journal-controls-buttons">
          <button className="journal-control-button" type="button" onClick={previousSlide} aria-label={text.anterior} title={text.anterior}>
            <ChevronLeft size={20} strokeWidth={1.65} />
          </button>
          <button
            className="journal-control-button journal-control-button--play"
            type="button"
            onClick={() => setAutoplayPaused((paused) => !paused)}
            aria-label={autoplayPaused ? text.retomar : text.pausar}
            title={autoplayPaused ? text.retomar : text.pausar}
          >
            {autoplayPaused ? <Play size={15} fill="currentColor" /> : <Pause size={15} />}
          </button>
          <button className="journal-control-button" type="button" onClick={nextSlide} aria-label={text.proximo} title={text.proximo}>
            <ChevronRight size={20} strokeWidth={1.65} />
          </button>
        </div>
      </footer>

      {detailOpen && renderDetails(activeSlide)}

      {fotoAberta && (
        <div className="journal-lightbox" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setFotoAberta(null)
        }}>
          <div className="journal-lightbox-panel" role="dialog" aria-modal="true" aria-label={fotoAberta.local}>
            <button type="button" className="journal-lightbox-close" onClick={() => setFotoAberta(null)} aria-label={language === "pt" ? "Fechar foto" : "Close photo"}>
              <X size={21} />
            </button>
            {fotoAberta.src && <img src={fotoAberta.src} alt={fotoAberta.alt || fotoAberta.local} />}
            <p className="journal-lightbox-label">{fotoAberta.tipo}</p>
            <h2>{fotoAberta.local}</h2>
            <p>{fotoAberta.legenda}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapaPessoal
