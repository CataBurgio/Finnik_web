"use client";

const TOPICS = [
  "Bonos", "Acciones", "CEDEARs", "Cripto", "Merval",
  "Dólar", "Riesgo País", "Tasas", "Inflación", "FCI",
  "Bonos", "Acciones", "CEDEARs", "Cripto", "Merval",
  "Dólar", "Riesgo País", "Tasas", "Inflación", "FCI",
];

export default function MarqueeSection() {
  return (
    <div
      className="overflow-hidden py-4"
      style={{ background: "#0B2572", borderTop: "1px solid rgba(221,223,228,0.08)", borderBottom: "1px solid rgba(221,223,228,0.08)" }}
    >
      <div className="flex" style={{ animation: "marquee 28s linear infinite" }}>
        {TOPICS.map((topic, i) => (
          <span key={i} className="flex flex-shrink-0 items-center gap-3 px-6 text-sm font-medium" style={{ color: "rgba(252,253,253,0.5)" }}>
            <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: "#D07371" }} />
            {topic}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="marquee"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
