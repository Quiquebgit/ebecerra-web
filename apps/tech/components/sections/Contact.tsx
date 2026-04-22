"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/mbdzjaqn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  const inputClass =
    "bg-[#0d0d0d] border border-[#2a2a2a] text-[#e0e0e0] px-4 py-3 rounded-md font-sans text-sm w-full outline-none transition-all duration-200 focus:border-[#00ff88] focus:shadow-[0_0_0_3px_rgba(0,255,136,0.08)] placeholder:text-[#444]";

  return (
    <section id="contacto" className="py-[100px] px-[clamp(20px,5vw,80px)]">
      <div className="max-w-[600px] mx-auto text-center">
        <span className="text-[#00ff88] font-mono text-xs tracking-[0.15em] uppercase block mb-3">
          {t("eyebrow")}
        </span>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-white tracking-tight mb-12">
          {t("title")}
        </h2>
        <p className="text-[#666] text-[15px] mb-12 leading-relaxed">
          {t("description")}
        </p>
        <form
          className="flex flex-col gap-4 text-left mb-12"
          onSubmit={handleSubmit}
        >
          <input
            className={inputClass}
            placeholder={t("form.name")}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            placeholder={t("form.email")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className={`${inputClass} resize-y`}
            placeholder={t("form.message")}
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
            {isSubmitting ? t("form.sending") : t("form.submit")}
          </button>
          {submitStatus !== "idle" && (
            <p
              className={`text-sm mt-1 ${
                submitStatus === "success" ? "text-[#00ff88]" : "text-[#ff4444]"
              }`}
            >
              {submitStatus === "success" ? t("form.success") : t("form.error")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
