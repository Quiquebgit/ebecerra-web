import { getTranslations } from "next-intl/server";
import type { ProcessStep } from "@/lib/content";

type Props = {
  steps: ProcessStep[];
};

export default async function Process({ steps }: Props) {
  const t = await getTranslations("process");

  return (
    <section
      id="proceso"
      className="section"
      style={{ paddingBlock: "var(--section-py)" }}
    >
      <div
        className="container"
        style={{
          maxWidth: "var(--container-max)",
          marginInline: "auto",
          paddingInline: "var(--gutter)",
        }}
      >
        <p className="kicker" style={{ color: "var(--text-muted)" }}>
          {t("kicker")}
        </p>
        <h2>{t("title")}</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>
          {t("lead")}
        </p>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "var(--s-8) 0 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--s-6)",
          }}
        >
          {steps.map((step) => (
            <li
              key={step._id}
              style={{
                borderTop: "var(--bw-hair) solid var(--border)",
                paddingTop: "var(--s-4)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono-stack)",
                  fontSize: "var(--fs-mono-md)",
                  color: "var(--cta)",
                  margin: 0,
                  letterSpacing: "var(--tr-kicker-md)",
                }}
              >
                {String(step.order).padStart(2, "0")}
              </p>
              <h3
                style={{
                  fontSize: "var(--fs-h4)",
                  margin: "var(--s-3) 0 var(--s-2)",
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
