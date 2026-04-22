import { getTranslations } from "next-intl/server";
import type { CaseStudySummary, CaseStudyMetric } from "@/lib/content";

type Props = {
  caseStudy: (CaseStudySummary & { metrics?: CaseStudyMetric[] }) | null;
};

export default async function Case({ caseStudy }: Props) {
  const t = await getTranslations("case");

  if (!caseStudy) return null;

  return (
    <section
      id="casos"
      className="section section--subtle"
      style={{
        paddingBlock: "var(--section-py)",
        background: "var(--surface-subtle)",
      }}
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
        <h2>{caseStudy.title}</h2>
        <p className="lead" style={{ maxWidth: "52ch" }}>
          {caseStudy.summary}
        </p>

        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "var(--s-7) 0 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "var(--s-5)",
            }}
          >
            {caseStudy.metrics.map((metric) => (
              <li
                key={metric.label}
                style={{
                  padding: "var(--s-4)",
                  background: "var(--surface)",
                  border: "var(--bw-hair) solid var(--border)",
                  borderRadius: "var(--r-md)",
                }}
              >
                <p
                  className="metric"
                  style={{
                    fontSize: "var(--fs-h3)",
                    color: "var(--cta)",
                    margin: 0,
                  }}
                >
                  {metric.value}
                </p>
                <p
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--text-muted)",
                    margin: "var(--s-2) 0 0",
                  }}
                >
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        )}

        <a
          href={`/casos/${caseStudy.slug}`}
          className="link-accent"
          style={{ display: "inline-block", marginTop: "var(--s-6)" }}
        >
          {t("readCase")} →
        </a>
      </div>
    </section>
  );
}
