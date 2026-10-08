import { Mail, Phone } from "lucide-react"
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"

import { useLanguage } from "../context/LanguageContext"

function Contato() {
  const { language } = useLanguage()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const text = {
    pt: {
      numero: "04 / Contato",
      titulo: "Vamos conversar?",
      descricao:
        "Tem uma ideia, projeto ou oportunidade? Entre em contato comigo.",
      nome: "Nome",
      email: "E-mail",
      mensagem: "Mensagem",
      enviar: "Enviar mensagem",
      enviando: "Enviando...",
      sucesso: "Mensagem enviada com sucesso!",
      erro: "Não foi possível enviar a mensagem.",
      nomeErro: "Digite seu nome.",
      emailErro: "Digite um e-mail válido.",
      mensagemErro: "Digite uma mensagem.",
    },

    en: {
      numero: "04 / Contact",
      titulo: "Let's talk?",
      descricao:
        "Have an idea, project or opportunity? Get in touch with me.",
      nome: "Name",
      email: "Email",
      mensagem: "Message",
      enviar: "Send message",
      enviando: "Sending...",
      sucesso: "Message sent successfully!",
      erro: "Could not send the message.",
      nomeErro: "Enter your name.",
      emailErro: "Enter a valid email.",
      mensagemErro: "Enter a message.",
    },
  }

  const t = text[language]

  async function onSubmit(data) {
    try {
      await emailjs.send(
        "SEU_SERVICE_ID",
        "SEU_TEMPLATE_ID",
        {
          name: data.nome,
          email: data.email,
          message: data.mensagem,
        },
        {
          publicKey: "SUA_PUBLIC_KEY",
        }
      )

      alert(t.sucesso)
      reset()

    } catch (error) {
      console.error(error)
      alert(t.erro)
    }
  }

  return (
    <section
      id="contato"
      className="bg-[#253D5B] px-6 py-24 text-[#FFFEE8]"
    >
      <div className="mx-auto max-w-6xl">

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#759AAB]">
          {t.numero}
        </p>

        <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
          {t.titulo}
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#FFFEE8]/70">
          {t.descricao}
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2">

          {/* Redes */}
          <div className="flex flex-col justify-center gap-7">

            <a
              href="mailto:seuemail@email.com"
              className="flex items-center gap-4 transition hover:text-[#759AAB]"
            >
              <Mail size={22} />
              <span>seuemail@email.com</span>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 transition hover:text-[#759AAB]"
            >
              <FaLinkedinIn size={22} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 transition hover:text-[#759AAB]"
            >
              <FaGithub size={22} />
              <span>GitHub</span>
            </a>

            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 transition hover:text-[#759AAB]"
            >
              <FaWhatsapp size={22} />
              <span>WhatsApp</span>
            </a>

          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-[#759AAB]/30 bg-[#1E252B]/40 p-8"
          >

            <div>

              <label className="text-sm">
                {t.nome}
              </label>

              <input
                type="text"
                {...register("nome", {
                  required: t.nomeErro,
                })}
                className="mt-2 w-full rounded-xl border border-[#759AAB]/40 bg-transparent px-4 py-3 outline-none placeholder:text-[#FFFEE8]/40 focus:border-[#759AAB]"
              />

              {errors.nome && (
                <p className="mt-2 text-xs text-[#FFB4B4]">
                  {errors.nome.message}
                </p>
              )}

            </div>

            <div className="mt-5">

              <label className="text-sm">
                {t.email}
              </label>

              <input
                type="email"
                {...register("email", {
                  required: t.emailErro,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t.emailErro,
                  },
                })}
                className="mt-2 w-full rounded-xl border border-[#759AAB]/40 bg-transparent px-4 py-3 outline-none focus:border-[#759AAB]"
              />

              {errors.email && (
                <p className="mt-2 text-xs text-[#FFB4B4]">
                  {errors.email.message}
                </p>
              )}

            </div>

            <div className="mt-5">

              <label className="text-sm">
                {t.mensagem}
              </label>

              <textarea
                rows="6"
                {...register("mensagem", {
                  required: t.mensagemErro,
                })}
                className="mt-2 w-full resize-none rounded-xl border border-[#759AAB]/40 bg-transparent px-4 py-3 outline-none focus:border-[#759AAB]"
              />

              {errors.mensagem && (
                <p className="mt-2 text-xs text-[#FFB4B4]">
                  {errors.mensagem.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 rounded-full bg-[#FFFEE8] px-6 py-3 text-sm font-semibold text-[#253D5B] transition hover:bg-[#759AAB] disabled:opacity-50"
            >
              {isSubmitting ? t.enviando : t.enviar}
            </button>

          </form>

        </div>

      </div>
    </section>
  )
}

export default Contato