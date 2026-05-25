"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Usuarios activos" },
  { value: 3, suffix: "", label: "Fuentes verificadas por brief" },
  { value: 2, suffix: " min", label: "De lectura promedio" },
  { value: 2026, suffix: "", label: "En operación desde" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("es-AR")}
      {suffix}
    </span>
  );
}

export default function NumbersSection() {
  return (
    <section
      className="py-16"
      style={{ background: "#0938BD" }}
    >
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="font-display text-4xl font-black tracking-tight md:text-5xl"
                style={{ color: "#FCFDFD" }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide" style={{ color: "rgba(252,253,253,0.55)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
