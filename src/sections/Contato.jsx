import { useEffect, useState } from "react";
import { Download, ExternalLink, FileText, Mail, X } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import { useLanguage } from "../context/useLanguage";
import EMAILJS_CONFIG from "../config/emailJsConfig";

const EMAILJS_OPTIONS = {
  publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
  blockHeadless: true,
};

// Coloque o PDF real em public/documentos/curriculo-leticia.pdf.
const CURRICULO_PDF_URL = "/documentos/curriculo-leticia.pdf";

function Contato() {
  const { language } = useLanguage();
  const [feedback, setFeedback] = useState("");
  const [curriculoAberto, setCurriculoAberto] = useState(false);

  useEffect(() => {
    if (!curriculoAberto) return undefined;

    const overflowAnterior = document.body.style.overflow;
    const fecharComEscape = (event) => {
      if (event.key === "Escape") setCurriculoAberto(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fecharComEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", fecharComEscape);
    };
  }, [curriculoAberto]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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
      sucesso: "Mensagem enviada! Em breve entrarei em contato.",
      parcial:
        "A confirmação foi enviada, mas ocorreu um erro ao encaminhar a notificação para minha caixa de entrada. Tente contato por outro canal.",
      erro: "Não foi possível enviar a mensagem. Tente novamente em instantes.",
      configuracao:
        "O formulário ainda não está configurado. Confira as variáveis do EmailJS no arquivo .env.local e reinicie o servidor.",
      nomeErro: "Digite seu nome.",
      emailErro: "Digite um e-mail válido.",
      mensagemErro: "Digite uma mensagem.",
      curriculo: "Currículo",
      curriculoTitulo: "Currículo | Letícia Abreu",
      curriculoDescricao: "Visualize meu currículo nesta página ou baixe o PDF.",
      curriculoTipo: "PDF · Currículo profissional",
      baixarCurriculo: "Baixar PDF",
      abrirNovaAba: "Abrir em nova aba",
      fecharCurriculo: "Fechar currículo",
      pdfAjuda: "Se a pré-visualização não carregar, use “Abrir em nova aba” ou “Baixar PDF”.",
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
      sucesso: "Message sent! I'll get back to you soon.",
      parcial:
        "The confirmation email was sent, but the notification could not reach my inbox. Please contact me through another channel.",
      erro: "Could not send the message. Please try again shortly.",
      configuracao:
        "The form is not configured yet. Check the EmailJS variables in .env.local and restart the server.",
      nomeErro: "Enter your name.",
      emailErro: "Enter a valid email.",
      mensagemErro: "Enter a message.",
      curriculo: "Resume",
      curriculoTitulo: "Resume | Letícia Abreu",
      curriculoDescricao: "View my resume on this page or download the PDF.",
      curriculoTipo: "PDF · Professional resume",
      baixarCurriculo: "Download PDF",
      abrirNovaAba: "Open in new tab",
      fecharCurriculo: "Close resume",
      pdfAjuda: 'If the preview does not load, use “Open in new tab” or “Download PDF”.',
    },
  };

  const t = text[language] || text.pt;

  async function onSubmit(data) {
    setFeedback("");

    const requiredConfig = [
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
      EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
      EMAILJS_CONFIG.PUBLIC_KEY,
    ];

    if (requiredConfig.some((value) => !value?.trim())) {
      setFeedback("config");
      return;
    }

    const params = {
      name: data.nome.trim(),
      email: data.email.trim(),
      message: data.mensagem.trim(),
      time: new Date().toLocaleString(
        language === "en" ? "en-US" : "pt-BR",
      ),
    };

    // Primeiro envia a confirmação para quem preencheu o formulário.
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_SENDER,
        {
          ...params,
          title: language === "en" ? "We received your message!" : "Recebemos sua mensagem!",
        },
        EMAILJS_OPTIONS,
      );
    } catch (error) {
      console.error("EmailJS: falha ao enviar confirmação ao remetente.", error);
      setFeedback("error");
      return;
    }

    // Depois envia a notificação para o endereço definido no template FOR ME.
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_FOR_ME,
        {
          ...params,
          title: `${language === "en" ? "New portfolio message from" : "Nova mensagem do portfólio de"} ${params.name}`,
        },
        EMAILJS_OPTIONS,
      );

      setFeedback("success");
      reset();
    } catch (error) {
      console.error("EmailJS: a confirmação foi enviada, mas a notificação falhou.", error);
      setFeedback("partial");
      reset();
    }
  }

  const feedbackMessage = {
    success: t.sucesso,
    partial: t.parcial,
    error: t.erro,
    config: t.configuracao,
  }[feedback];

  return (
    <>
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
          <div className="flex flex-col justify-center gap-7">
            {import.meta.env.VITE_CONTACT_EMAIL && (
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                className="flex items-center gap-4 transition hover:text-[#759AAB]"
              >
                <Mail size={22} aria-hidden="true" />
                <span>{import.meta.env.VITE_CONTACT_EMAIL}</span>
              </a>
            )}

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 transition hover:text-[#759AAB]"
            >
              <FaLinkedinIn size={22} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 transition hover:text-[#759AAB]"
            >
              <FaGithub size={22} aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <button
              type="button"
              onClick={() => setCurriculoAberto(true)}
              className="flex items-center gap-4 text-left transition hover:text-[#759AAB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#759AAB]"
              aria-haspopup="dialog"
              aria-label={t.curriculo}
            >
              <FileText size={22} aria-hidden="true" />
              <span>{t.curriculo}</span>
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-[#759AAB]/30 bg-[#1E252B]/40 p-8"
            noValidate
          >
            <div>
              <label htmlFor="contato-nome" className="text-sm">
                {t.nome}
              </label>
              <input
                id="contato-nome"
                type="text"
                autoComplete="name"
                maxLength={100}
                {...register("nome", { required: t.nomeErro, maxLength: 100 })}
                className="mt-2 w-full rounded-xl border border-[#759AAB]/40 bg-transparent px-4 py-3 outline-none placeholder:text-[#FFFEE8]/40 focus:border-[#759AAB]"
                aria-invalid={Boolean(errors.nome)}
              />
              {errors.nome && (
                <p className="mt-2 text-xs text-[#FFB4B4]" role="alert">
                  {errors.nome.message || t.nomeErro}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="contato-email" className="text-sm">
                {t.email}
              </label>
              <input
                id="contato-email"
                type="email"
                autoComplete="email"
                maxLength={254}
                {...register("email", {
                  required: t.emailErro,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t.emailErro,
                  },
                })}
                className="mt-2 w-full rounded-xl border border-[#759AAB]/40 bg-transparent px-4 py-3 outline-none focus:border-[#759AAB]"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-[#FFB4B4]" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="contato-mensagem" className="text-sm">
                {t.mensagem}
              </label>
              <textarea
                id="contato-mensagem"
                rows={6}
                maxLength={5000}
                {...register("mensagem", {
                  required: t.mensagemErro,
                  maxLength: 5000,
                })}
                className="mt-2 w-full resize-y rounded-xl border border-[#759AAB]/40 bg-transparent px-4 py-3 outline-none focus:border-[#759AAB]"
                aria-invalid={Boolean(errors.mensagem)}
              />
              {errors.mensagem && (
                <p className="mt-2 text-xs text-[#FFB4B4]" role="alert">
                  {errors.mensagem.message || t.mensagemErro}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 rounded-full bg-[#FFFEE8] px-6 py-3 text-sm font-semibold text-[#253D5B] transition hover:bg-[#759AAB] disabled:cursor-wait disabled:opacity-50"
            >
              {isSubmitting ? t.enviando : t.enviar}
            </button>

            {feedbackMessage && (
              <p
                className={`mt-4 text-sm leading-6 ${feedback === "success" ? "text-[#D1E8D0]" : "text-[#FFD4C9]"}`}
                role="status"
                aria-live="polite"
              >
                {feedbackMessage}
              </p>
            )}
          </form>
        </div>
      </div>
      </section>

      {curriculoAberto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1E252B]/85 p-3 backdrop-blur-sm sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCurriculoAberto(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="curriculo-dialog-title"
            className="flex h-[92vh] max-h-[920px] min-h-[420px] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#759AAB]/50 bg-[#FFFEE8] shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 bg-[#253D5B] px-4 py-4 text-[#FFFEE8] sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <FileText size={22} aria-hidden="true" className="shrink-0 text-[#759AAB]" />
                <div className="min-w-0">
                  <h3 id="curriculo-dialog-title" className="truncate text-base font-semibold sm:text-lg">
                    {t.curriculoTitulo}
                  </h3>
                  <p className="mt-1 text-xs text-[#FFFEE8]/75 sm:text-sm">
                    {t.curriculoDescricao}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurriculoAberto(false)}
                className="shrink-0 rounded-full border border-[#759AAB]/50 p-2 text-[#FFFEE8] transition hover:bg-[#759AAB]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFEE8]"
                aria-label={t.fecharCurriculo}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#759AAB]/30 bg-[#FFFEE8] px-4 py-3 sm:px-6">
              <p className="text-xs leading-5 text-[#253D5B]/75 sm:text-sm">{t.curriculoTipo}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={CURRICULO_PDF_URL}
                  download="Curriculo-Leticia-Abreu.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-[#600819] px-4 py-2 text-sm font-semibold text-[#FFFEE8] transition hover:bg-[#253D5B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#759AAB]"
                >
                  <Download size={16} aria-hidden="true" />
                  {t.baixarCurriculo}
                </a>
                <a
                  href={CURRICULO_PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#253D5B]/30 px-4 py-2 text-sm font-semibold text-[#253D5B] transition hover:bg-[#759AAB]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#759AAB]"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  {t.abrirNovaAba}
                </a>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-[#1E252B]">
              <iframe
                src={CURRICULO_PDF_URL}
                title={t.curriculoTitulo}
                className="h-full w-full border-0"
              />
            </div>
            <p className="bg-[#FFFEE8] px-4 py-2 text-xs text-[#253D5B]/70 sm:px-6">
              {t.pdfAjuda}
            </p>
          </section>
        </div>
      )}
    </>
  );
}

export default Contato;
