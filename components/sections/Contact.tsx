"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mbdzjaqn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitMessage("Mensaje enviado correctamente. ¡Gracias!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch {
      setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
    }

    setIsSubmitting(false);
  };

  const inputClass =
    "bg-[#0d0d0d] border border-[#2a2a2a] text-[#e0e0e0] px-4 py-3 rounded-md font-sans text-sm w-full outline-none transition-all duration-200 focus:border-[#00ff88] focus:shadow-[0_0_0_3px_rgba(0,255,136,0.08)] placeholder:text-[#444]";

  return (
    <section id="contacto" className="py-[100px] px-[clamp(20px,5vw,80px)]">
      <div className="max-w-[600px] mx-auto text-center">
        <span className="text-[#00ff88] font-mono text-xs tracking-[0.15em] uppercase block mb-3">
          // 05. contacto
        </span>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-white tracking-tight mb-12">
          Hablemos 💌
        </h2>
        <p className="text-[#666] text-[15px] mb-12 leading-relaxed">
          ¿Tienes un proyecto interesante, una idea o simplemente quieres
          conectar? Escríbeme.
        </p>
        <form
          className="flex flex-col gap-4 text-left mb-12"
          onSubmit={handleSubmit}
        >
          <input
            className={inputClass}
            placeholder="Tu nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            placeholder="tu@email.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className={`${inputClass} resize-y`}
            placeholder="Cuéntame..."
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            className="self-start bg-transparent border border-[#00ff88] text-[#00ff88] px-7 py-3 rounded-md font-mono text-[13px] tracking-[0.05em] hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "$ send_message →"}
          </button>
          {submitMessage && (
            <p
              className={`text-sm mt-1 ${
                submitMessage.includes("correctamente")
                  ? "text-[#00ff88]"
                  : "text-[#ff4444]"
              }`}
            >
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
