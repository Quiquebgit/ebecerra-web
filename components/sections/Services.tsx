import { getTranslations } from "next-intl/server";
import type { Service } from "@/lib/content";

type Props = {
  services: Service[];
};

export default async function Services({ services }: Props) {
  const t = await getTranslations("services");

  return (
    <section
      id="servicios"
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--s-5)",
            marginTop: "var(--s-8)",
          }}
        >
          {services.map((service) => (
            <article
              key={service._id}
              style={{
                background: "var(--surface)",
                border: "var(--bw-hair) solid var(--border)",
                borderRadius: "var(--r-md)",
                padding: "var(--s-6) var(--s-5)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--s-3)",
              }}
            >
              <h3>{service.title}</h3>
              <p style={{ color: "var(--text-secondary)", flexGrow: 1 }}>
                {service.summary}
              </p>
              {service.priceRange && (
                <p
                  style={{
                    fontFamily: "var(--font-mono-stack)",
                    fontSize: "var(--fs-sm)",
                    color: "var(--cta)",
                    margin: 0,
                  }}
                >
                  {t("priceFrom")} {service.priceRange}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
