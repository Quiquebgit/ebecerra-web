import { getTranslations } from "next-intl/server";
import type { CaseCard } from "@/lib/content";
import styles from "./Case.module.css";

type Props = {
  cases: CaseCard[];
};

export default async function Case({ cases }: Props) {
  const t = await getTranslations("cases");

  if (cases.length === 0) return null;

  return (
    <section
      id="casos"
      aria-labelledby="cases-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.kicker}>{t("kicker")}</div>
        <h2 id="cases-heading" className={styles.heading}>
          {t("title")}
        </h2>
        <p className={`lead ${styles.lead}`}>{t("lead")}</p>

        <div className={styles.grid}>
          {cases.map((c) => (
            <article key={c._id} className={styles.card}>
              <div className={styles.cardSector}>{c.sector}</div>
              <h3 className={styles.cardTitle}>{c.title}</h3>

              <Block label={t("contextLabel")} text={c.context} />
              <Block label={t("solutionLabel")} text={c.solution} />
              <Block label={t("resultLabel")} text={c.result} accent />

              {c.metrics.length > 0 && (
                <div className={styles.metrics}>
                  {c.metrics.map((m) => (
                    <span key={`${c._id}-${m.label}`} className={styles.metricChip}>
                      <span className={styles.metricLabel}>{m.label}:</span>{" "}
                      <span className={styles.metricValue}>{m.value}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.translatesFooter}>
                <span className={styles.translatesLabel}>→ {t("translatesLabel")}</span>
                {c.translatesTo}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className={accent ? styles.blockLabelAccent : styles.blockLabel}>
        {label}
      </div>
      <p className={accent ? styles.blockTextAccent : styles.blockText}>{text}</p>
    </div>
  );
}
