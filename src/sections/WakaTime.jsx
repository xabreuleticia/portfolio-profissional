import { useEffect, useMemo, useRef, useState } from "react"
import {
  Activity,
  Award,
  CalendarDays,
  Clock3,
  Code2,
  Sparkles,
  Sun,
} from "lucide-react"
import { useLanguage } from "../context/useLanguage"
import WAKATIME_CONFIG from "../config/wakatimeConfig"
import { fetchCodingNow, fetchWakaTimeStats } from "../services/wakatimeService"
import "./WakaTime.css"


const LANGUAGE_COLORS = {
  JavaScript: "#8A6A00", 
  TypeScript: "#315F91", 
  Python: "#2B7185",     
  Java: "#8B4E2C",       
  HTML: "#B54A35",       
  CSS: "#6D5796",        
  "C++": "#9A3F67",      
  C: "#46525B",          
  "C#": "#4D713D",       
  PHP: "#5E5790",        
  Go: "#267B77",         
  Rust: "#98563B",       
  Kotlin: "#7960A8",     
  Swift: "#B54B49",      
  SQL: "#94651E",        
  Shell: "#577047",      
  JSON: "#587B8D",       
  Markdown: "#3E628A",   
}


function languageColor(name) {
  return LANGUAGE_COLORS[name] || "#759AAB"
}

function formatDuration(seconds = 0, language = "pt") {
  const value = Math.max(0, Math.floor(Number(seconds) || 0))
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const secs = value % 60

  if (hours > 0) {
    return language === "en"
      ? `${hours}h${minutes ? ` ${minutes}m` : ""}`
      : `${hours}h${minutes ? ` ${minutes}min` : ""}`
  }
  if (minutes > 0) return language === "en" ? `${minutes}m` : `${minutes}min`
  return `${secs}s`
}

function formatPercent(value, language = "pt") {
  return `${(Number(value) || 0).toLocaleString(language === "en" ? "en-US" : "pt-BR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`
}

function formatDate(value, language = "pt") {
  if (!value) return "—"
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? `${value}T12:00:00` : value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(date)
}

function formatAgo(timestamp, language = "pt") {
  if (!timestamp) return language === "en" ? "no recent activity" : "sem atividade recente"
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000))
  if (minutes < 1) return language === "en" ? "just now" : "agora mesmo"
  if (minutes < 60) return language === "en" ? `${minutes} min ago` : `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  return language === "en" ? `${hours}h ago` : `há ${hours}h`
}

function Metric({ icon: Icon, label, value, note }) {
  return (
    <article className="waka-metric">
      <p className="waka-metric-label"><Icon size={15} aria-hidden="true" />{label}</p>
      <strong className="waka-metric-value">{value}</strong>
      {note ? <span className="waka-metric-note">{note}</span> : null}
    </article>
  )
}

function CodingNowCard({ live, language }) {
  if (live?.status !== "ok") return null

  const data = live.data || {}
  const last = data.last
  const active = Boolean(data.active && last)

  if (!active) {
    return (
      <div className="waka-live waka-live-idle">
        <span className="waka-live-status">
          <span className="waka-live-dot" />
          {language === "en" ? "No live coding signal" : "Sem atividade neste momento"}
        </span>
        <span className="waka-live-detail">
          {last
            ? `${language === "en" ? "Last activity" : "Última atividade"}: ${formatAgo(last.at, language)}${last.language ? ` · ${last.language}` : ""}`
            : (language === "en" ? "No coding session recorded today." : "Nenhuma sessão de código registrada hoje.")}
        </span>
      </div>
    )
  }

  const lastAt = Number(last.at) || 0
  const sessionStart = Number(last.sessionStart) || lastAt
  const sessionSeconds = Math.max(0, Math.floor((lastAt - sessionStart) / 1000))

  return (
    <div className="waka-live waka-live-active" aria-live="polite">
      <div className="waka-live-header">
        <span className="waka-live-status">
          <span className="waka-live-dot" />
          {language === "en" ? "Coding now" : "Codando agora"}
        </span>
        <span className="waka-live-detail">{language === "en" ? "Updated" : "Atualizado"} {formatAgo(last.at, language)}</span>
      </div>
      <div className="waka-live-meta">
        {last.language ? <span><Code2 size={15} aria-hidden="true" />{last.language}</span> : null}
        {sessionSeconds >= 60 ? <span><Clock3 size={15} aria-hidden="true" />{language === "en" ? "Session" : "Sessão"}: {formatDuration(sessionSeconds, language)}</span> : null}
      </div>
    </div>
  )
}

function ErrorNotice({ error, language }) {
  const messages = {
    missing_config: language === "en"
      ? "Add WAKATIME_API_KEY to .env.local and restart the development server."
      : "Adicione WAKATIME_API_KEY ao arquivo .env.local e reinicie o servidor.",
    invalid_key: language === "en"
      ? "The API key was rejected. Check your WakaTime API settings."
      : "A chave da API foi recusada. Confira as configurações do WakaTime.",
    pending: language === "en"
      ? "WakaTime is still calculating this period. Try again shortly."
      : "O WakaTime ainda está calculando esse período. Tente novamente em instantes.",
  }

  return (
    <div className={`waka-message ${error?.code === "pending" ? "is-warning" : "is-error"}`} role="alert">
      <strong>{error?.message || (language === "en" ? "Could not load WakaTime." : "Não foi possível carregar o WakaTime.")}</strong>
      {messages[error?.code] ? <span>{messages[error.code]}</span> : null}
    </div>
  )
}

function WakaTime() {
  const { language } = useLanguage()
  const sectionRef = useRef(null)
  const [hasEntered, setHasEntered] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window)
  )
  const [range, setRange] = useState(WAKATIME_CONFIG.DEFAULT_RANGE)
  const [statsState, setStatsState] = useState({ status: "loading", data: null, error: null, loadedRange: null })
  const [live, setLive] = useState(null)

  const text = {
    pt: {
      number: "03 / ROTINA DE CÓDIGO",
      titleStart: "Programar é construir",
      titleAccent: "um pouco todo dia.",
      intro: "Um recorte da minha jornada com tecnologia: tempo dedicado, ritmo de prática e linguagens que estou explorando.",
      liveLabel: "DIÁRIO DE CÓDIGO",
      panelTitle: "Constância antes da pressa.",
      panelIntro: "Cada sessão faz parte do processo de aprender, testar ideias e transformar curiosidade em código.",
      footer: "APRENDER · PRATICAR · EVOLUIR",
      period: "Escolha o intervalo",
      total: "Tempo no período",
      dailyAverage: "Média diária",
      today: "Hoje",
      bestDay: "Dia mais intenso",
      languages: "Linguagens exploradas",
      languagesCaption: "Distribuição do tempo de prática",
      activeDays: "dias ativos",
      since: "desde",
      todayNote: "atividade registrada hoje",
      noBestDay: "sem dados neste intervalo",
      empty: "Ainda não há atividade de programação registrada neste período.",
      loading: "Reunindo seus dados...",
      source: "Dados de atividade fornecidos pelo WakaTime.",
      retry: "Tentar novamente",
    },
    en: {
      number: "03 / CODING ROUTINE",
      titleStart: "Build through code,",
      titleAccent: "one day at a time.",
      intro: "A glimpse into my journey with technology: time invested, practice rhythm, and the languages I am exploring.",
      liveLabel: "CODING JOURNAL",
      panelTitle: "Consistency over speed.",
      panelIntro: "Every session is part of learning, testing ideas, and turning curiosity into code.",
      footer: "LEARN · PRACTICE · GROW",
      period: "Choose a time range",
      total: "Time in period",
      dailyAverage: "Daily average",
      today: "Today",
      bestDay: "Most active day",
      languages: "Languages explored",
      languagesCaption: "Practice time distribution",
      activeDays: "active days",
      since: "since",
      todayNote: "activity recorded today",
      noBestDay: "no data for this range",
      empty: "No coding activity has been recorded for this period yet.",
      loading: "Gathering your stats...",
      source: "Activity data provided by WakaTime.",
      retry: "Try again",
    },
  }
  const t = text[language] || text.pt

  // Ativa as animações de entrada apenas quando a seção se aproxima da tela.
  // Ativa as animações de entrada quando a seção se aproxima da tela.
  useEffect(() => {
    const section = sectionRef.current

    if (!section || !("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let mounted = true
    fetchWakaTimeStats(range)
      .then((result) => {
        if (mounted) setStatsState({ status: "ready", data: result.data, error: null, loadedRange: range })
      })
      .catch((error) => {
        if (mounted) setStatsState((current) => ({ ...current, status: "error", error, loadedRange: range }))
      })
    return () => { mounted = false }
  }, [range])

  useEffect(() => {
    let mounted = true
    let timer
    const refresh = async () => {
      if (document.visibilityState === "hidden") return
      try {
        const result = await fetchCodingNow()
        if (mounted) setLive(result)
      } catch {
        if (mounted) setLive({ status: "unavailable" })
      }
    }
    refresh()
    timer = window.setInterval(refresh, WAKATIME_CONFIG.CODING_NOW.REFRESH_SECONDS * 1000)
    document.addEventListener("visibilitychange", refresh)
    return () => {
      mounted = false
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", refresh)
    }
  }, [])

  const data = statsState.data
  const visibleLanguages = useMemo(() => {
    const hidden = new Set(WAKATIME_CONFIG.HIDDEN_LANGUAGES)
    return (data?.languages || [])
      .filter((item) => !hidden.has(item.name))
      .sort((a, b) => b.seconds - a.seconds)
  }, [data])
  const languages = visibleLanguages.slice(0, WAKATIME_CONFIG.MAX_LANGUAGES)
  const others = visibleLanguages.slice(WAKATIME_CONFIG.MAX_LANGUAGES)
  const othersSeconds = others.reduce((sum, item) => sum + item.seconds, 0)
  const othersPercent = others.reduce((sum, item) => sum + item.percent, 0)

  return (
    <section id="wakatime" ref={sectionRef} className={`waka-section ${hasEntered ? "is-visible" : ""}`}>
      <div className="waka-container">
        <div className="waka-section-header">
          <p className="waka-kicker"><span className="waka-kicker-dot" aria-hidden="true" />{t.number}</p>
          <div className="waka-heading-grid">
            <h2 className="waka-title">{t.titleStart} <span>{t.titleAccent}</span></h2>
            <p className="waka-intro">{t.intro}</p>
          </div>
        </div>

        <div className="waka-overview">
          <aside className="waka-note">
            <div className="waka-note-orbit" aria-hidden="true"><span>&lt;/&gt;</span></div>
            <div className="waka-icon"><Code2 size={22} aria-hidden="true" /></div>
            <p className="waka-note-label">{t.liveLabel}</p>
            <h3>{t.panelTitle}</h3>
            <p className="waka-note-description">{t.panelIntro}</p>
            <div className="waka-note-footer"><Sparkles size={15} aria-hidden="true" /><span>{t.footer}</span></div>
          </aside>

          <div className="waka-dashboard" aria-busy={statsState.status === "loading"}>
            <CodingNowCard live={live} language={language} />

            <div className="waka-toolbar">
              <div className="waka-toolbar-heading">
                <span className="waka-overline">WAKATIME / STATS</span>
                <span className="waka-toolbar-caption">{t.period}</span>
              </div>
              <div className="waka-ranges" role="group" aria-label={language === "en" ? "Statistics period" : "Período das estatísticas"}>
                {WAKATIME_CONFIG.RANGES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={option.value === range ? "active" : ""}
                    aria-pressed={option.value === range}
                    onClick={() => setRange(option.value)}
                  >
                    {language === "en" ? option.en : option.pt}
                  </button>
                ))}
              </div>
            </div>

            {statsState.status === "error" ? <ErrorNotice error={statsState.error} language={language} /> : null}
            {statsState.status === "loading" && !data ? (
              <div className="waka-loading"><span className="waka-spinner" />{t.loading}</div>
            ) : null}

            {data ? (
              <div className={`waka-body ${statsState.loadedRange !== range ? "is-updating" : ""}`}>
                <div className="waka-metrics">
                  <Metric
                    icon={Clock3}
                    label={t.total}
                    value={formatDuration(data.totalSeconds, language)}
                    note={data.start ? `${t.since} ${formatDate(data.start, language)}` : `${visibleLanguages.length} ${language === "en" ? "languages" : "linguagens"}`}
                  />
                  <Metric
                    icon={Activity}
                    label={t.dailyAverage}
                    value={formatDuration(data.dailyAverage, language)}
                    note={data.activeDays != null ? `${data.activeDays} ${t.activeDays}` : null}
                  />
                  <Metric icon={Sun} label={t.today} value={formatDuration(data.today?.seconds || 0, language)} note={t.todayNote} />
                  <Metric
                    icon={Award}
                    label={t.bestDay}
                    value={data.bestDay ? formatDuration(data.bestDay.seconds, language) : "—"}
                    note={data.bestDay ? formatDate(data.bestDay.date, language) : t.noBestDay}
                  />
                </div>

                <div className="waka-panel waka-language-panel">
                  <div className="waka-panel-heading">
                    <div>
                      <h3>{t.languages}</h3>
                      <p>{t.languagesCaption}</p>
                    </div>
                    <span className="waka-language-count">{visibleLanguages.length.toString().padStart(2, "0")}</span>
                  </div>

                  {languages.length > 0 ? (
                    <>
                      <div className="waka-stack" aria-label={t.languages}>
                        {languages.map((item) => (
                          <span
                            key={item.name}
                            title={`${item.name} · ${formatDuration(item.seconds, language)} · ${formatPercent(item.percent, language)}`}
                            style={{ flexGrow: Math.max(item.seconds, 1), background: languageColor(item.name) }}
                          />
                        ))}
                        {othersSeconds > 0 ? (
                          <span
                            title={language === "en" ? "Other languages" : "Outras linguagens"}
                            style={{ flexGrow: othersSeconds, background: "#759AAB" }}
                          />
                        ) : null}
                      </div>
                      <ul className="waka-language-list">
                        {languages.map((item) => (
                          <li key={item.name} style={{ "--language-color": languageColor(item.name) }}>
                            <div className="waka-language-heading">
                              <span className="waka-language-dot" aria-hidden="true" />
                              <span className="waka-language-name">{item.name}</span>
                              <span className="waka-language-time">{formatDuration(item.seconds, language)}</span>
                              <strong>{formatPercent(item.percent, language)}</strong>
                            </div>
                            <div className="waka-progress" aria-hidden="true">
                              <span style={{ width: `${Math.min(100, Math.max(item.percent, 1))}%` }} />
                            </div>
                          </li>
                        ))}
                        {others.length > 0 ? (
                          <li className="waka-other-languages">
                            <span>{language === "en" ? "Other languages" : "Outras linguagens"} ({others.length})</span>
                            <strong>{formatDuration(othersSeconds, language)} · {formatPercent(othersPercent, language)}</strong>
                          </li>
                        ) : null}
                      </ul>
                    </>
                  ) : (
                    <div className="waka-empty"><CalendarDays size={19} aria-hidden="true" />{t.empty}</div>
                  )}
                </div>

                <p className="waka-source">{t.source}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WakaTime
