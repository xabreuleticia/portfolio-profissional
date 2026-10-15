import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react"
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
    abrir: "Abrir álbum",
    capaAlt: "Capa do álbum de recordações",
    fotoAlt: "Espaço para fotografia",
    fotoAbrir: "Ampliar fotografia",
    fotoFechar: "Fechar fotografia",
    anterior: "Abrir página anterior",
    proximo: "Virar para a próxima página",
    pausar: "Pausar virada automática",
    retomar: "Retomar virada automática",
    dataVazia: "Espaço em branco para a data",
  },
  en: {
    voltar: "About me",
    idioma: "PT",
    abrir: "Open album",
    capaAlt: "Memory album cover",
    fotoAlt: "Photograph placeholder",
    fotoAbrir: "Enlarge photograph",
    fotoFechar: "Close photograph",
    anterior: "Turn to previous page",
    proximo: "Turn to next page",
    pausar: "Pause automatic page turning",
    retomar: "Resume automatic page turning",
    dataVazia: "Blank space for the date",
  },
}

const temasViagem = [
  { paper: "#f7f0e4", inner: "#eee3d3", accent: "#94624e" },
  { paper: "#e8eff0", inner: "#dce7e9", accent: "#92515b" },
  { paper: "#e8eee6", inner: "#dce7dc", accent: "#90634f" },
  { paper: "#f1e2dc", inner: "#e8d2ca", accent: "#8d3549" },
  { paper: "#f0eedf", inner: "#e5e4d2", accent: "#91644c" },
  { paper: "#e9e9e5", inner: "#dedfdb", accent: "#7d3948" },
  { paper: "#e1ecee", inner: "#cfe1e5", accent: "#8a5147" },
  { paper: "#e4eadf", inner: "#d4dfd0", accent: "#7d4b43" },
]

const temasHobbies = [
  { paper: "#eee4d9", inner: "#e1d3c6", accent: "#8b3948" },
  { paper: "#e7eaf2", inner: "#d7deeb", accent: "#7e4c5b" },
  { paper: "#e6ebde", inner: "#d6e0c9", accent: "#855644" },
]

const angles = [-0.9, 0.65, -0.45, 0.8, -0.55, 0.35, -0.7, 0.5]
const PHOTOS_PER_SPREAD = 12

function makePhotoSlides(items, type, themes) {
  return items.flatMap((item, index) => {
    const allPhotos = Array.isArray(item?.fotos) ? item.fotos : []
    const sourcePhotos = allPhotos.length ? allPhotos : [{ id: `${item.id}-foto-vazia`, src: "", pt: {}, en: {} }]
    const spreads = []

    for (let start = 0; start < sourcePhotos.length; start += PHOTOS_PER_SPREAD) {
      spreads.push(sourcePhotos.slice(start, start + PHOTOS_PER_SPREAD))
    }

    return spreads.map((photos, spreadIndex) => ({
      id: `${item.id}-spread-${spreadIndex + 1}`,
      type,
      item,
      photos,
      spreadIndex,
      theme: themes[index % themes.length],
    }))
  })
}

function albumTheme(theme) {
  return {
    "--paper-color": theme.paper,
    "--paper-inner": theme.inner,
    "--paper-accent": theme.accent,
  }
}

function Polaroid({ photo, language, fallbackLocal, index, onOpen, text }) {
  const localized = photo?.[language] || photo?.pt || {}
  const local = localized.local || fallbackLocal
  const date = localized.data || photo?.data || ""
  const alt = photo?.alt?.[language] || local || text.fotoAlt
  const isFilled = Boolean(photo?.src)

  const picture = (
    <span className="memory-polaroid-image">
      {isFilled ? (
        <img src={photo.src} alt={alt} loading="lazy" />
      ) : (
        <span className="memory-polaroid-empty" aria-hidden="true">
          <Camera size={19} strokeWidth={1.15} />
        </span>
      )}
    </span>
  )

  return (
    <div
      className={`memory-polaroid memory-polaroid--${index}`}
      style={{ "--polaroid-angle": `${angles[index % angles.length]}deg` }}
    >
      {isFilled ? (
        <button
          type="button"
          className="memory-polaroid-photo-button"
          onClick={() => onOpen({ src: photo.src, alt, local, date })}
          aria-label={`${text.fotoAbrir}: ${local}${date ? `, ${date}` : ""}`}
        >
          {picture}
        </button>
      ) : (
        <div className="memory-polaroid-photo-button memory-polaroid-photo-button--empty" role="img" aria-label={text.fotoAlt}>
          {picture}
        </div>
      )}
      <div className="memory-polaroid-caption">
        <span className="memory-polaroid-place">{local}</span>
        <span className={`memory-polaroid-date ${date ? "memory-polaroid-date--filled" : ""}`}>
          {date || <span className="memory-date-blank" aria-label={text.dataVazia} />}
        </span>
      </div>
    </div>
  )
}

function MemoryAlbum({ onBack }) {
  const { language, toggleLanguage } = useLanguage()
  const text = copy[language] || copy.pt
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(() => (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
  ))
  const [pointerInside, setPointerInside] = useState(false)
  const [openedPhoto, setOpenedPhoto] = useState(null)
  const touchStartX = useRef(null)
  const turnSequence = useRef(0)
  const [turningPage, setTurningPage] = useState(null)

  const slides = [
    { id: "cover", type: "cover" },
    ...makePhotoSlides(mapaPessoalDestinos, "travel", temasViagem),
    ...makePhotoSlides(mapaPessoalHobbies, "hobby", temasHobbies),
  ]
  const totalSlides = slides.length
  const activeSlide = slides[activeIndex]

  const beginTurn = useCallback((direction) => {
    if (turningPage) return

    const fromIndex = activeIndex
    const toIndex = direction === "next"
      ? (activeIndex + 1) % totalSlides
      : (activeIndex - 1 + totalSlides) % totalSlides

    setOpenedPhoto(null)

    // Em telas compactas ou com movimento reduzido, não executa o efeito 3D.
    // Isso evita desalinhamento no layout móvel, que não usa uma dupla de páginas.
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    const compactLayout = window.matchMedia?.("(max-width: 600px)")?.matches
    if (reducedMotion || compactLayout) {
      setActiveIndex(toIndex)
      setTurningPage(null)
      return
    }

    turnSequence.current += 1
    setTurningPage({
      key: turnSequence.current,
      direction,
      fromIndex,
      toIndex,
      cover: fromIndex === 0 || toIndex === 0,
    })
  }, [activeIndex, totalSlides, turningPage])

  const previousPage = useCallback(() => beginTurn("previous"), [beginTurn])
  const nextPage = useCallback(() => beginTurn("next"), [beginTurn])

  // Fallback de segurança: se o navegador interromper a animação (por exemplo,
  // ao redimensionar a janela), conclui a virada após a duração prevista.
  useEffect(() => {
    if (!turningPage) return undefined

    const turnKey = turningPage.key
    const targetIndex = turningPage.toIndex
    const fallback = window.setTimeout(() => {
      setActiveIndex(targetIndex)
      setTurningPage((current) => current?.key === turnKey ? null : current)
    }, 1150)

    return () => window.clearTimeout(fallback)
  }, [turningPage])

  useEffect(() => {
    if (autoplayPaused || pointerInside || openedPhoto || turningPage) return undefined

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") nextPage()
    }, 11000)

    return () => window.clearInterval(timer)
  }, [activeIndex, autoplayPaused, nextPage, openedPhoto, pointerInside, turningPage])

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (!preference) return undefined

    const handlePreference = (event) => {
      if (event.matches) setAutoplayPaused(true)
    }

    preference.addEventListener?.("change", handlePreference)
    return () => preference.removeEventListener?.("change", handlePreference)
  }, [])

  useEffect(() => {
    function handleKeyboard(event) {
      if (event.key === "Escape" && openedPhoto) {
        setOpenedPhoto(null)
        return
      }
      if (openedPhoto || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.target?.closest?.("input, textarea, select, [contenteditable='true']")) return

      if (event.key === "ArrowRight") {
        event.preventDefault()
        nextPage()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        previousPage()
      }
    }

    window.addEventListener("keydown", handleKeyboard)
    return () => window.removeEventListener("keydown", handleKeyboard)
  }, [openedPhoto, nextPage, previousPage])

  function handleTouchStart(event) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return
    const endX = event.changedTouches[0]?.clientX
    if (typeof endX === "number") {
      const delta = endX - touchStartX.current
      if (Math.abs(delta) > 55) {
        if (delta < 0) nextPage()
        else previousPage()
      }
    }
    touchStartX.current = null
  }

  function renderCover() {
    const cover = mapaPessoalCapa[language] || mapaPessoalCapa.pt

    return (
      <div className={`memory-cover ${mapaPessoalCapa.src ? "memory-cover--with-photo" : "memory-cover--blank"}`}>
        <span className="memory-cover-grain" aria-hidden="true" />
        <span className="memory-cover-spine" aria-hidden="true" />
        <span className="memory-cover-stitch" aria-hidden="true" />

        <div className="memory-cover-content">
          <div className="memory-cover-photo-frame">
            {mapaPessoalCapa.src ? (
              <img
                className="memory-cover-photo"
                src={mapaPessoalCapa.src}
                alt={mapaPessoalCapa.alt?.[language] || text.capaAlt}
                fetchPriority="high"
              />
            ) : (
              <div className="memory-cover-photo-placeholder" aria-hidden="true">
                <Camera size={24} strokeWidth={1.25} />
                <span>{language === "en" ? "YOUR PHOTOGRAPH" : "SUA FOTOGRAFIA"}</span>
              </div>
            )}
          </div>

          <div className="memory-cover-title">
            <span className="memory-cover-kicker">
              {language === "en" ? "PERSONAL ALBUM" : "CADERNO PESSOAL"}
            </span>
            <h1>
              {cover.titulo || "Memórias"}
              {cover.destaque && <em>{cover.destaque}</em>}
            </h1>
            <span className="memory-cover-rule" aria-hidden="true" />
            <button type="button" className="memory-cover-open" onClick={nextPage}>
              <span>{cover.comecar || text.abrir}</span>
            </button>
          </div>
        </div>

        <span className="memory-cover-monogram" aria-hidden="true">LA</span>
      </div>
    )
  }

  function getSpreadParts(slide) {
    const item = slide.item
    const content = item?.[language] || item?.pt || {}
    const fallbackLocal = slide.type === "hobby"
      ? content.nome || "Hobby"
      : [content.nome, content.complemento].filter(Boolean).join(" ")
    const photos = slide.photos || item?.fotos || []
    const splitIndex = Math.ceil(photos.length / 2)

    return {
      item,
      content,
      fallbackLocal,
      photos,
      leftPhotos: photos.slice(0, splitIndex),
      rightPhotos: photos.slice(splitIndex),
    }
  }

  function renderBookPage(slide, side, photos, indexOffset = 0) {
    const { item, fallbackLocal } = getSpreadParts(slide)

    return (
      <div
        className={`memory-book-page memory-book-page--${side} memory-book-page--count-${Math.min(6, photos.length)}`}
        style={albumTheme(slide.theme)}
      >
        {photos.map((photo, index) => (
          <Polaroid
            key={photo.id || `${item.id}-${side}-${index}`}
            photo={photo}
            language={language}
            fallbackLocal={fallbackLocal}
            index={index + indexOffset}
            onOpen={setOpenedPhoto}
            text={text}
          />
        ))}
      </div>
    )
  }

  function renderSpread(slide) {
    const { item, fallbackLocal, leftPhotos, rightPhotos } = getSpreadParts(slide)

    return (
      <div className={`memory-spread memory-spread--${slide.type}`} style={albumTheme(slide.theme)}>
        <div className="memory-book" aria-label={fallbackLocal}>
          {renderBookPage(slide, "left", leftPhotos, 0)}
          {renderBookPage(slide, "right", rightPhotos, leftPhotos.length)}
          <span className="memory-book-spine" aria-hidden="true" />
          <span className="memory-book-page-curl memory-book-page-curl--left" aria-hidden="true" />
          <span className="memory-book-page-curl memory-book-page-curl--right" aria-hidden="true" />
        </div>
      </div>
    )
  }

  // Durante uma virada normal, o conteúdo de fundo é um composto estável:
  // próximo: página esquerda atual + página direita do destino;
  // anterior: página esquerda do destino + página direita atual.
  function renderHybridSpread(turn) {
    const fromSlide = slides[turn.fromIndex]
    const toSlide = slides[turn.toIndex]
    const fromParts = getSpreadParts(fromSlide)
    const toParts = getSpreadParts(toSlide)

    const leftSlide = turn.direction === "next" ? fromSlide : toSlide
    const leftPhotos = turn.direction === "next" ? fromParts.leftPhotos : toParts.leftPhotos
    const rightSlide = turn.direction === "next" ? toSlide : fromSlide
    const rightPhotos = turn.direction === "next" ? toParts.rightPhotos : fromParts.rightPhotos
    const fallbackLocal = [
      (leftSlide?.item?.[language] || leftSlide?.item?.pt)?.nome,
      (rightSlide?.item?.[language] || rightSlide?.item?.pt)?.nome,
    ].filter(Boolean).join(" · ")

    return (
      <div className="memory-spread memory-spread--hybrid" style={albumTheme(fromSlide.theme)}>
        <div className="memory-book" aria-label={fallbackLocal}>
          {renderBookPage(leftSlide, "left", leftPhotos, 0)}
          {renderBookPage(rightSlide, "right", rightPhotos, leftPhotos.length)}
          <span className="memory-book-spine" aria-hidden="true" />
          <span className="memory-book-page-curl memory-book-page-curl--left" aria-hidden="true" />
          <span className="memory-book-page-curl memory-book-page-curl--right" aria-hidden="true" />
        </div>
      </div>
    )
  }

  return (
    <div className="personal-memory-book" aria-label={language === "pt" ? "Álbum de recordações" : "Memory album"}>
      <span className="memory-table-grain" aria-hidden="true" />
      <div className="memory-toolbar">
        <button type="button" className="memory-back-button" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={1.6} />
          <span>{text.voltar}</span>
        </button>
        <div className="memory-toolbar-center">
          <span className="memory-toolbar-mark" aria-hidden="true">LA</span>
          <span className="memory-toolbar-label">{language === "pt" ? "ÁLBUM DE MEMÓRIAS" : "MEMORY ALBUM"}</span>
          <button
            type="button"
            className="memory-play-button"
            onClick={() => setAutoplayPaused((paused) => !paused)}
            aria-label={autoplayPaused ? text.retomar : text.pausar}
            title={autoplayPaused ? text.retomar : text.pausar}
          >
            {autoplayPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} />}
          </button>
        </div>
        <button
          type="button"
          className="memory-language-button"
          onClick={toggleLanguage}
          aria-label={language === "pt" ? "Switch to English" : "Mudar para português"}
        >
          {text.idioma}
        </button>
      </div>

      <div
        className="memory-viewport"
        onMouseEnter={() => setPointerInside(true)}
        onMouseLeave={() => setPointerInside(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`memory-track ${turningPage ? "memory-track--turning" : ""}`}
          style={{
            "--memory-slide-count": totalSlides,
            transform: `translate3d(-${(activeIndex * 100) / totalSlides}%, 0, 0)`,
          }}
        >
          {slides.map((slide, index) => {
            const active = index === activeIndex
            const content = slide.type === "cover"
              ? renderCover()
              : (active && turningPage && !turningPage.cover
                ? renderHybridSpread(turningPage)
                : renderSpread(slide))

            return (
              <div
                key={slide.id}
                className={`memory-slide ${active ? "memory-slide--active" : ""} memory-slide--${slide.type}`}
                aria-hidden={!active}
                inert={!active}
              >
                {content}
              </div>
            )
          })}
        </div>

        {turningPage && (
          <div className="memory-leaf-stage" aria-hidden="true" inert>
            <div className="memory-leaf-frame">
              <div
                key={turningPage.key}
                className={`memory-leaf-turn memory-leaf-turn--${turningPage.direction} ${turningPage.cover ? "memory-leaf-turn--cover" : ""}`}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return
                  const completedTurn = turningPage
                  setActiveIndex(completedTurn.toIndex)
                  setTurningPage((current) => current?.key === completedTurn.key ? null : current)
                }}
              >
                <div className="memory-leaf-turn__front">
                  <div className="memory-leaf-turn__content">
                    {turningPage.cover
                      ? (turningPage.fromIndex === 0
                        ? renderCover()
                        : renderSpread(slides[turningPage.fromIndex]))
                      : (() => {
                        const sourceSlide = slides[turningPage.fromIndex]
                        const sourceParts = getSpreadParts(sourceSlide)
                        return renderBookPage(
                          sourceSlide,
                          turningPage.direction === "next" ? "right" : "left",
                          turningPage.direction === "next" ? sourceParts.rightPhotos : sourceParts.leftPhotos,
                          turningPage.direction === "next" ? sourceParts.leftPhotos.length : 0,
                        )
                      })()}
                  </div>
                </div>
                <div className="memory-leaf-turn__back">
                  <div className="memory-leaf-turn__back-content">
                    {turningPage.cover
                      ? (turningPage.toIndex === 0
                        ? renderCover()
                        : renderSpread(slides[turningPage.toIndex]))
                      : (() => {
                        const destinationSlide = slides[turningPage.toIndex]
                        const destinationParts = getSpreadParts(destinationSlide)
                        return renderBookPage(
                          destinationSlide,
                          turningPage.direction === "next" ? "left" : "right",
                          turningPage.direction === "next" ? destinationParts.leftPhotos : destinationParts.rightPhotos,
                          turningPage.direction === "next" ? 0 : destinationParts.leftPhotos.length,
                        )
                      })()}
                  </div>
                </div>
                <div className="memory-leaf-turn__edge" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="memory-navigation" aria-label={language === "pt" ? "Controles do álbum" : "Album controls"}>
        <button type="button" className="memory-page-button memory-page-button--previous" onClick={previousPage} aria-label={text.anterior} title={text.anterior}>
          <ChevronLeft size={21} strokeWidth={1.45} />
        </button>
        <button type="button" className="memory-page-button memory-page-button--next" onClick={nextPage} aria-label={text.proximo} title={text.proximo}>
          <ChevronRight size={21} strokeWidth={1.45} />
        </button>
      </div>

      {openedPhoto && (
        <div
          className="memory-photo-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenedPhoto(null)
          }}
        >
          <div className="memory-photo-enlarged" role="dialog" aria-modal="true" aria-label={openedPhoto.local}>
            <button type="button" className="memory-photo-close" onClick={() => setOpenedPhoto(null)} aria-label={text.fotoFechar}>
              <X size={19} />
            </button>
            <div className="memory-photo-enlarged-image">
              <img src={openedPhoto.src} alt={openedPhoto.alt} />
            </div>
            <div className="memory-photo-enlarged-caption">
              <span>{openedPhoto.local}</span>
              {openedPhoto.date && <small>{openedPhoto.date}</small>}
            </div>
          </div>
        </div>
      )}

      <span className="memory-sr-only" aria-live="polite">
        {activeSlide?.type === "cover"
          ? (language === "pt" ? "Capa do álbum" : "Album cover")
          : ((activeSlide?.item?.[language] || activeSlide?.item?.pt)?.nome || "")}
      </span>
    </div>
  )
}

export default MemoryAlbum
