import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, OrbitControls } from "@react-three/drei"
import { Database, Gamepad2, Network } from "lucide-react"
import {
  SiBootstrap,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiVite,
} from "react-icons/si"
import { useLanguage } from "../context/useLanguage"
import "./Habilidades.css"

const SKILLS = [
  { name: "JavaScript", Icon: SiJavascript, color: "#FFFEE8" },
  { name: "React", Icon: SiReact, color: "#759AAB" },
  { name: "HTML", Icon: SiHtml5, color: "#D19AA4" },
  { name: "CSS", Icon: SiCss, color: "#FFFEE8" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#759AAB" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#D19AA4" },
  { name: "Python", Icon: SiPython, color: "#FFFEE8" },
  { name: "Pygame", Icon: Gamepad2, color: "#759AAB" },
  { name: "Java", Icon: SiOpenjdk, color: "#D19AA4" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#FFFEE8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#759AAB" },
  { name: "SQL", Icon: Database, color: "#D19AA4" },
  { name: "REST API", Icon: Network, color: "#FFFEE8" },
  { name: "Git", Icon: SiGit, color: "#759AAB" },
  { name: "GitHub", Icon: SiGithub, color: "#D19AA4" },
  { name: "Figma", Icon: SiFigma, color: "#FFFEE8" },
  { name: "Vite", Icon: SiVite, color: "#759AAB" },
  { name: "JSON Server", Icon: SiJson, color: "#D19AA4" },
]

const COPY = {
  pt: {
    kicker: "HABILIDADES ",
    title: "Tecnologia se aprende na prática,",
    accent: "e na curiosidade.",
    intro:
      "A cada projeto, um novo mundo de oportunidades de aprendizado.",
    overline: "EM CONSTRUÇÃO CONTÍNUA",
    group1: "Design",
    desc1: "Layouts, protótipos, mockups, design no figma pensado na experiencia do usuário.",
    group2: "Interfaces",
    desc2: "HTML, CSS, JavaScript, React, Tailwind CSS, Bootstrap.",
    group3: "Lógica & back-end",
    desc3: "Python, Java, Node.js, Spring Boot, SQL, REST API, JSON Server.",
    group4: "Ferramentas & fluxo",
    desc4: "Git, GitHub, VS Code, Vite, npm, Maven, Figma, ESLint.",
    panelLabel: "CADERNO DE TECNOLOGIAS",
    panelSub: "INTERATIVO · 2026",
    panelBottom: "18 TECNOLOGIAS EM PRÁTICA",
    instruction: "PASSE O MOUSE SOBRE OS ÍCONES",
    fallback: "Mapa interativo de habilidades",
    accessible: "Tecnologias que estou estudando e usando em projetos",
  },
  en: {
    kicker: "SKILLS ",
    title: "Technology is learned by building,",
    accent: "and staying curious.",
    intro:
      "With every project, a new world of learning opportunities.",
    overline: "ALWAYS IN PROGRESS",
    group1: "Design",
    desc1: "Layouts, prototypes, mockups, and Figma designs focused on the user experience.",
    group2: "Interfaces",
    desc2: "HTML, CSS, JavaScript, React, Tailwind CSS, and Bootstrap.",
    group3: "Logic & back end",
    desc3: "Python, Java, Node.js, Spring Boot, SQL, REST API, and JSON Server.",
    group4: "Tools & workflow",
    desc4: "Git, GitHub, VS Code, Vite, npm, Maven, Figma, and ESLint.",
    panelLabel: "TECHNOLOGY NOTEBOOK",
    panelSub: "INTERACTIVE · 2026",
    panelBottom: "18 TECHNOLOGIES IN PRACTICE",
    instruction: "HOVER OVER THE ICONS",
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

function SkillMarker({ skill, position, interactionRef }) {
  const Icon = skill.Icon

  return (
    <group position={position}>
      <Html center occlude zIndexRange={[40, 0]}>
        <button
          type="button"
          className="skills-globe-marker"
          style={{ "--skill-accent": skill.color }}
          aria-label={skill.name}
          data-skill-name={skill.name}
          onMouseEnter={() => { interactionRef.current.hovering = true }}
          onMouseLeave={() => { interactionRef.current.hovering = false }}
          onFocus={() => { interactionRef.current.hovering = true }}
          onBlur={() => { interactionRef.current.hovering = false }}
        >
          <Icon className="skills-globe-logo" aria-hidden="true" focusable="false" />
        </button>
      </Html>
    </group>
  )
}

function SkillsGlobe() {
  const globeRef = useRef(null)
  const interactionRef = useRef({ dragging: false, hovering: false })
  const markers = useMemo(
    () => SKILLS.map((skill, index) => ({
      skill,
      position: pointOnSphere(index, SKILLS.length, 1.43),
    })),
    [],
  )

  useFrame((_, delta) => {
    if (globeRef.current && !interactionRef.current.dragging && !interactionRef.current.hovering) {
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
          <torusGeometry args={[1.5, 0.004, 6, 96]} />
          <meshBasicMaterial color="#759AAB" transparent opacity={0.32} />
        </mesh>
        {markers.map(({ skill, position }) => (
          <SkillMarker key={skill.name} skill={skill} position={position} interactionRef={interactionRef} />
        ))}
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.23}
        maxPolarAngle={Math.PI * 0.77}
        onStart={() => { interactionRef.current.dragging = true }}
        onEnd={() => { interactionRef.current.dragging = false }}
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
              <article className="skills-group">
                <span className="skills-group-number">04</span>
                <div>
                  <h3>{text.group4}</h3>
                  <p>{text.desc4}</p>
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
            <div className="skills-canvas-wrap" role="group" aria-label={text.accessible}>
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
