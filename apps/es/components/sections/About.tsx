import { getTranslations } from "next-intl/server";
import type { Feature } from "@ebecerra/sanity-client";
import styles from "./About.module.css";

type Stat = { value: string; label: string };

type Props = {
  features: Feature[];
};

export default async function About({ features }: Props) {
  const t = await getTranslations("about");

  const stats: Stat[] = [
    { value: "8+", label: t("statYears") },
    { value: "13", label: t("statProjects") },
    { value: "6", label: t("statPublicSector") },
  ];

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.kicker}>
          //{" "}
          <span className={styles.kickerAccent}>02.</span>{" "}
          {t("kicker").replace(/^\/\/\s*/i, "")}
        </div>
        <h2 id="about-heading" className={styles.heading}>
          {t("title")}
        </h2>

        <div className={styles.split}>
          <div className={styles.bio}>
            <p className={styles.bioPara}>{t("bio1")}</p>
            <p className={styles.bioParaLast}>{t("bio2")}</p>

            <div
              className={styles.stats}
              style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={i > 0 ? styles.statItemBordered : styles.statItem}
                >
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            <a href="#contacto" className={`link-accent ${styles.viewProfileLink}`}>
              {t("viewProfile")} →
            </a>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature, i) => (
              <div key={`${feature.label}-${i}`} className={styles.featureCard}>
                <span className={styles.featureIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className={styles.featureLabel}>{feature.label}</div>
                  <div className={styles.featureDesc}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
