"use client";

import { FadeIn, FadeInStagger, fadeUpItem } from "@/components/fade-in";
import { motion } from "framer-motion";

const VALUES = [
  {
    emoji: "🔇",
    title: "Sin ruido",
    description: "Filtramos decenas de fuentes para dejarte solo lo que importa. Sin clickbait, sin humo.",
  },
  {
    emoji: "🇦🇷",
    title: "En tu idioma",
    description: "Todo en español, pensado para el mercado argentino. Contexto local, no traducido.",
  },
  {
    emoji: "⏱",
    title: "En 2 minutos",
    description: "El brief está diseñado para que entiendas el mercado antes de terminar el café.",
  },
];

export default function WhyFinnikSection() {
  return (
    <section className="relative py-20 lg:py-24" style={{ background: "#F6F7F8" }}>
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn className="mx-auto max-w-xl text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(9,56,189,0.08)", color: "#0938BD" }}
          >
            Por qué Finnik
          </span>
          <h2
            className="font-display mt-4 text-balance text-3xl font-normal tracking-normal md:text-4xl"
            style={{ color: "#070F14" }}
          >
            Información financiera sin el drama
          </h2>
        </FadeIn>

        <FadeInStagger stagger={0.12} className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUpItem}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(9,56,189,0.1)" }}
              transition={{ duration: 0.25 }}
              className="flex flex-col rounded-2xl border p-8"
              style={{ background: "#FCFDFD", borderColor: "#DDDFE4" }}
            >
              <span className="text-3xl">{v.emoji}</span>
              <h3 className="font-display mt-5 text-xl font-normal" style={{ color: "#070F14" }}>
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#ADB0BB" }}>
                {v.description}
              </p>
            </motion.div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
