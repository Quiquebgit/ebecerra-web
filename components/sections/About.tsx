import type { Feature } from "@/lib/content";

interface AboutProps {
  features: Feature[];
}

export default function About({ features }: AboutProps) {
  return (
    <section id="sobre-mí" className="py-[100px] px-[clamp(20px,5vw,80px)]">
      <div className="max-w-[1100px] mx-auto">
        <span className="text-[#00ff88] font-mono text-xs tracking-[0.15em] uppercase block mb-3">
          // 01. sobre mí
        </span>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-white tracking-tight mb-12">
          Un poco sobre mí 📖
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-[#999] leading-[1.8] text-[15px] space-y-5">
            <p>
              Soy arquitecto de software con 8 años de experiencia,
              especializado en{" "}
              <span className="text-[#00ff88]">Magnolia CMS</span> y ecosistema
              Java. Actualmente lidero equipos técnicos en VASS y coordino el
              gremio VassNolia en VASS University.
            </p>
            <p>
              Me gusta entender cómo funcionan las cosas por dentro. Disfruto
              tanto construyendo soluciones sólidas como explicándolas y
              formando a otros. Si algo puede hacerse mejor, me pica la
              curiosidad hasta descubrir cómo.
            </p>
            <p>
              Fuera del trabajo: geek, curioso crónico, y alguien que también
              sabe que hay vida más allá del teclado.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {features.map((item) => (
              <div
                key={item.label}
                className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg p-6 flex gap-4 items-start hover:border-[#333] hover:shadow-[0_0_30px_rgba(0,255,136,0.04)] transition-all duration-300 cursor-default"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="text-white font-medium text-sm mb-1">
                    {item.label}
                  </div>
                  <div className="text-[#666] text-[13px]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
