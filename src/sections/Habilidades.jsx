import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, OrbitControls } from "@react-three/drei"
import { useLanguage } from "../context/useLanguage"
import "./Habilidades.css"

const SKILLS = [
  { name: "JavaScript", color: "#D6AD62" },
  { name: "React", color: "#8CB7C5" },
  { name: "HTML", color: "#C77A68" },
  { name: "CSS", color: "#A99BCB" },
  { name: "Tailwind", color: "#8CB7C5" },
  { name: "Bootstrap", color: "#B39ACB" },
  { name: "Python", color: "#D6AD62" },
  { name: "Pygame", color: "#C77A68" },
  { name: "Java", color: "#D6AD62" },
  { name: "Spring Boot", color: "#9FB58B" },
  { name: "Node.js", color: "#9FB58B" },
  { name: "SQL", color: "#8CB7C5" },
  { name: "REST API", color: "#C77A68" },
  { name: "Git", color: "#D6AD62" },
  { name: "GitHub", color: "#FFFEE8" },
  { name: "Figma", color: "#C77A68" },
  { name: "Vite", color: "#A99BCB" },
  { name: "JSON Server", color: "#8CB7C5" },
]

const COPY = {
  pt: {
    kicker: "HABILIDADES / MAPA EM MOVIMENTO",
    title: "Tecnologia se aprende na prática,",
    accent: "e na curiosidade.",
    intro:
      "Um mapa do que venho estudando e colocando em prática. Não é uma lista fechada de respostas, mas um repertório que cresce a cada projeto.",
    overline: "EM CONSTRUÇÃO CONTÍNUA",
    group1: "Interfaces",
    desc1: "Da estrutura visual à experiência de quem navega.",
    group2: "Lógica & back-end",
    desc2: "Algoritmos, serviços e dados trabalhando juntos.",
    group3: "Ferramentas & fluxo",
    desc3: "Organização, prototipação e trabalho com código.",
    panelLabel: "CADERNO DE TECNOLOGIAS",
    panelSub: "INTERATIVO · 2026",
    panelBottom: "18 TECNOLOGIAS EM PRÁTICA",
    instruction: "ARRASTE PARA EXPLORAR",
    fallback: "Mapa interativo de habilidades",
    accessible: "Tecnologias que estou estudando e usando em projetos",
  },
  en: {
    kicker: "SKILLS / A MAP IN MOTION",
    title: "Technology is learned by building,",
    accent: "and staying curious.",
    intro:
      "A map of what I am studying and putting into practice. Not a finished checklist, but a growing toolkit shaped by each project.",
    overline: "ALWAYS IN PROGRESS",
    group1: "Interfaces",
    desc1: "From visual structure to the experience of navigating.",
    group2: "Logic & back end",
    desc2: "Algorithms, services, and data working together.",
    group3: "Tools & workflow",
    desc3: "Organization, prototyping, and working with code.",
    panelLabel: "TECHNOLOGY NOTEBOOK",
    panelSub: "INTERACTIVE · 2026",
    panelBottom: "18 TECHNOLOGIES IN PRACTICE",
    instruction: "DRAG TO EXPLORE",
    fallback: "Interactive skills map",
    accessible: "Technologies I am studying and using in projects",
  },
}

function pointOnSphere(index, total, radius) {
  const y = 1 - (2 * (index + 0.5)) / total
  const horizontalRadius = Math.sqrt(1 - y * y)
  const angle = index * Math.PI * (3 - Math.sqrt(5))

  return [
    Math.cos(angle) * horizontalRadius * radius,
    y * radius,
    Math.sin(angle) * horizontalRadius * radius,
  ]
}

function SkillMarker({ skill, position }) {
  return (
    <group position={position}>
      {/*
        O ponto colorido é desenhado no próprio rótulo via CSS.
        Evitamos um mesh 3D no mesmo ponto do <Html>, pois ele pode
        ser detectado como obstáculo pelo occlude e esconder a própria ferramenta.
      */}
      <Html center distanceFactor={7.3} occlude>
        <span
          className="skills-globe-tag"
          style={{ "--skill-accent": skill.color }}
        >
          {skill.name}
        </span>
      </Html>
    </group>
  )
}

function SkillsGlobe() {
  const globeRef = useRef(null)
  const interactionRef = useRef(false)
  const markers = useMemo(
    () => SKILLS.map((skill, index) => ({
      skill,
      position: pointOnSphere(index, SKILLS.length, 1.43),
    })),
    [],
  )

  useFrame((_, delta) => {
    if (globeRef.current && !interactionRef.current) {
      globeRef.current.rotation.y += delta * 0.085
      globeRef.current.rotation.x = Math.sin(Date.now() * 0.00018) * 0.055
    }
  })

  return (
    <>
      <ambientLight intensity={1.6} />
      <pointLight position={[3, 3, 4]} intensity={2.2} color="#FFFEE8" />
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1.38, 42, 42]} />
          <meshBasicMaterial
            color="#759AAB"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.51, 0.006, 8, 100]} />
          <meshBasicMaterial color="#759AAB" transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.51, 0.004, 8, 100]} />
          <meshBasicMaterial color="#FFFEE8" transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.51, 0.004, 8, 100]} />
          <meshBasicMaterial color="#600819" transparent opacity={0.5} />
        </mesh>
        {markers.map(({ skill, position }) => (
          <SkillMarker key={skill.name} skill={skill} position={position} />
        ))}
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.23}
        maxPolarAngle={Math.PI * 0.77}
        onStart={() => { interactionRef.current = true }}
        onEnd={() => { interactionRef.current = false }}
      />
    </>
  )
}

function Habilidades() {
  const { language } = useLanguage()
  const text = COPY[language] || COPY.pt
  const sectionRef = useRef(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === "undefined") return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "180px 0px", threshold: 0.01 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="habilidades" ref={sectionRef} className="skills-section">
      <div className="skills-container">
        <div className="skills-section-heading">
          <p className="skills-kicker">
            <span className="skills-kicker-mark" aria-hidden="true">✳</span>
            {text.kicker}
          </p>
          <div className="skills-heading-grid">
            <h2 className="skills-title">
              {text.title} <span>{text.accent}</span>
            </h2>
            <p className="skills-intro">{text.intro}</p>
          </div>
        </div>

        <div className="skills-layout">
          <div className="skills-copy">
            <p className="skills-overline">{text.overline}</p>
            <div className="skills-group-list">
              <article className="skills-group">
                <span className="skills-group-number">01</span>
                <div>
                  <h3>{text.group1}</h3>
                  <p>{text.desc1}</p>
                </div>
              </article>
              <article className="skills-group">
                <span className="skills-group-number">02</span>
                <div>
                  <h3>{text.group2}</h3>
                  <p>{text.desc2}</p>
                </div>
              </article>
              <article className="skills-group">
                <span className="skills-group-number">03</span>
                <div>
                  <h3>{text.group3}</h3>
                  <p>{text.desc3}</p>
                </div>
              </article>
            </div>
            <p className="skills-interaction-hint">
              <span aria-hidden="true" />
              {text.instruction}
            </p>
          </div>

          <div className="skills-globe-panel">
            <div className="skills-panel-heading">
              <span>{text.panelLabel}</span>
              <span className="skills-panel-meta">{text.panelSub}</span>
            </div>
            <div className="skills-canvas-wrap" role="img" aria-label={text.accessible}>
              {isNearViewport ? (
                <Canvas
                  dpr={[1, 1.5]}
                  camera={{ position: [0, 0, 4.8], fov: 43 }}
                  gl={{ alpha: true, antialias: true }}
                >
                  <SkillsGlobe />
                </Canvas>
              ) : (
                <div className="skills-globe-placeholder" aria-hidden="true">
                  <span className="skills-placeholder-orbit skills-placeholder-orbit-one" />
                  <span className="skills-placeholder-orbit skills-placeholder-orbit-two" />
                  <span className="skills-placeholder-core">&lt;/&gt;</span>
                </div>
              )}
            </div>
            <div className="skills-panel-footer">
              <span>{text.panelBottom}</span>
              <span className="skills-panel-index">LA / 2026</span>
            </div>
            <ul className="skills-sr-list" aria-label={text.accessible}>
              {SKILLS.map((skill) => <li key={skill.name}>{skill.name}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Habilidades
