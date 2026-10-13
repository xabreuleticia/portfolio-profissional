import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { useLanguage } from "../context/useLanguage"

function Footer() {
  const { language } = useLanguage()

  const text = {
    pt: "Portfólio profissional",
    en: "Professional portfolio",
  }

  return (
    <footer className="bg-[#1E252B] px-6 py-8 text-[#FFFEE8]">

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">

        <p className="text-sm text-[#FFFEE8]/60">
          Letícia Abreu · {text[language]}
        </p>

        <div className="flex items-center gap-5">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:text-[#759AAB]"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-[#759AAB]"
          >
            <FaLinkedinIn size={20} />
          </a>

        </div>

      </div>

    </footer>
  )
}

export default Footer