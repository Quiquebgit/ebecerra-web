"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "success" | "error";

const INFO: {
  labelKey: "infoEmail" | "infoLinkedin" | "infoLocation";
  value: string;
  href?: string;
  external?: boolean;
}[] = [
  {
    labelKey: "infoEmail",
    value: "contacto@ebecerra.es",
    href: "mailto:contacto@ebecerra.es",
  },
  {
    labelKey: "infoLinkedin",
    value: "/in/enriquebecerra",
    href: "https://www.linkedin.com/in/enrique-becerra-garcia/",
    external: true,
  },
  { labelKey: "infoLocation", value: "Madrid · España · remoto" },
];

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.kicker}>
          //{" "}
          <span className={styles.kickerAccent}>04.</span>{" "}
          {t("kicker").replace(/^\/\/\s*/i, "")}
        </div>

        <div className={styles.split}>
          <div>
            <h2 id="contact-heading" className={styles.heading}>
              {t("title")}
            </h2>
            <p className={styles.lead}>{t("lead")}</p>

            <ul className={styles.infoList}>
              {INFO.map((item) => (
                <li key={item.labelKey} className={styles.infoItem}>
                  <span className={styles.infoItemLabel}>{t(item.labelKey)}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={styles.infoLink}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
              <li className={styles.infoItem}>
                <span className={styles.infoItemLabel}>{t("infoResponse")}</span>
                <span className={styles.responseStatus}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {t("infoResponseValue")}
                </span>
              </li>
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            aria-describedby="contact-status"
            className={styles.form}
          >
            <label className={styles.label} htmlFor="contact-name">
              {t("formName")}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder={t("formNamePlaceholder")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={styles.input}
              autoComplete="name"
              aria-invalid={status === "error" ? true : undefined}
            />

            <label className={styles.label} htmlFor="contact-email">
              {t("formEmail")}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder={t("formEmailPlaceholder")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={styles.input}
              autoComplete="email"
              aria-invalid={status === "error" ? true : undefined}
            />

            <label className={styles.label} htmlFor="contact-message">
              {t("formMessage")}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              placeholder={t("formMessagePlaceholder")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-invalid={status === "error" ? true : undefined}
              className={styles.textarea}
            />

            {/* Honeypot anti-bot: invisible para humanos, visible para scrapers. */}
            <label aria-hidden="true" className={styles.honeypot}>
              Website (no rellenar)
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </label>

            <div className={styles.formActions}>
              <span
                id="contact-status"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={
                  status === "error"
                    ? styles.formStatusError
                    : status === "success"
                      ? styles.formStatusSuccess
                      : styles.formStatus
                }
              >
                {status === "success"
                  ? t("formSuccess")
                  : status === "error"
                    ? t("formError")
                    : `→ ${t("infoResponseValue")}`}
              </span>
              <button
                type="submit"
                disabled={status === "sending"}
                className={clsx(
                  styles.submitBtn,
                  status === "success" && styles.submitBtnSuccess,
                  status === "sending" && styles.submitBtnSending,
                )}
              >
                {status === "success"
                  ? `✓ ${t("formSuccess").split(".")[0]}`
                  : status === "sending"
                    ? t("formSending")
                    : `→ ${t("formSubmit")}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
