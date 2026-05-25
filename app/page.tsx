"use client";

import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Brain,
  Sliders,
  Check,
  ChevronDown,
  TrendingUp,
  Radar,
  GraduationCap,
  Filter,
  Send,
} from "lucide-react";
import PhoneFrame from "@/components/phone-frame";
import WhatsAppChatDemo from "@/components/whatsapp-chat-demo";
import NewspaperCollageBackground from "@/components/newspaper-collage-background";

/* ================================================================== */
/* useScrollProgress hook                                              */
/* ================================================================== */

function useScrollProgress(threshold = 0.4) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const sectionHeight = ref.current.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = sectionHeight * threshold;
      const p = Math.min(1, Math.max(0, scrolled / maxScroll));
      setProgress(p);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { ref, progress };
}

/* ================================================================== */
/* NAVBAR (figma-like: sticky blur, clean)                            */
/* ================================================================== */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(246,247,248,0.85)"
          : "rgba(246,247,248,0.95)",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(221,223,228,0.5)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          {/* Fi symbol */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* F letter */}
            <path
              d="M8 8V32H12V22H22V18H12V12H24V8H8Z"
              fill="#0938BD"
            />
            {/* i stem */}
            <rect x="26" y="16" width="4" height="16" fill="#0938BD" />
            {/* i dot (coral) */}
            <circle cx="28" cy="10" r="3" fill="#D07371" />
          </svg>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: "#0938BD" }}
          >
            Finnik
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Producto", href: "#producto" },
            { label: "Cómo funciona", href: "#como-funciona" },
            { label: "Planes", href: "#planes" },
            { label: "FAQ", href: "#faq" },
            { label: "Quiénes Somos", href: "#quienes-somos" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#070F14" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#planes"
          className="hidden rounded-lg px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90 md:inline-block"
          style={{ background: "#D07371", color: "#FCFDFD" }}
        >
          Anotarme
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1 md:hidden"
          aria-label="Menu"
        >
          <span
            className="block h-0.5 w-5 transition-transform"
            style={{
              background: "#070F14",
              transform: mobileOpen
                ? "rotate(45deg) translate(2px, 2px)"
                : "none",
            }}
          />
          <span
            className="block h-0.5 w-5 transition-opacity"
            style={{
              background: "#070F14",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-5 transition-transform"
            style={{
              background: "#070F14",
              transform: mobileOpen
                ? "rotate(-45deg) translate(2px, -2px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t px-5 pb-4 pt-2 md:hidden"
          style={{
            background: "rgba(246,247,248,0.98)",
            borderColor: "rgba(221,223,228,0.4)",
          }}
        >
          {[
            { label: "Producto", href: "#producto" },
            { label: "Cómo funciona", href: "#como-funciona" },
            { label: "Planes", href: "#planes" },
            { label: "FAQ", href: "#faq" },
            { label: "Quiénes Somos", href: "#quienes-somos" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium"
              style={{ color: "#070F14" }}
            >
              {label}
            </a>
          ))}
          <a
            href="#planes"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-block rounded-lg px-5 py-2 text-sm font-semibold"
            style={{ background: "#D07371", color: "#FCFDFD" }}
          >
            Anotarme
          </a>
        </div>
      )}
    </nav>
  );
}

/* ================================================================== */
/* HERO BULLETS (right column)                                         */
/* ================================================================== */

const HERO_BULLETS = [
  { icon: Zap, text: "Brief diario en 1 minuto" },
  { icon: Brain, text: "Contexto + qué significa" },
  { icon: Sliders, text: "Tu feed, a tu medida" },
];

/* ================================================================== */
/* HERO (3-column grid with collage bg + squish scroll)                */
/* ================================================================== */

function Hero({
  onChatAction,
  chatAction,
}: {
  onChatAction: (action: string) => void;
  chatAction: string | null;
}) {
  const { ref: heroRef, progress: scrollProgress } = useScrollProgress(0.4);

  // Phone scale based on scroll
  const phoneScale = 1 + scrollProgress * 0.04;
  const phoneShadow = `0 ${20 + scrollProgress * 15}px ${40 + scrollProgress * 20}px rgba(0,0,0,${0.25 + scrollProgress * 0.15})`;

  return (
    <section
      ref={heroRef}
      id="producto"
      className="relative min-h-[90vh] overflow-x-hidden lg:min-h-[85vh]"
    >
      {/* Collage background */}
      <NewspaperCollageBackground scrollProgress={scrollProgress} />

      {/* Content */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-5 pb-0 pt-12 lg:grid-cols-12 lg:gap-4 lg:pt-20">

        {/* === LEFT: Copy (cols 1-7) === */}
        <div className="pb-16 lg:col-span-7 lg:pb-24 lg:pr-6">
          {/* Editorial tag */}
          <div className="mb-5 flex items-center gap-2.5">
            <span className="h-px w-8 flex-shrink-0" style={{ background: "#D07371" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#D07371" }}
            >
              Curaduría financiera
            </span>
          </div>

          <h1
            className="font-display text-balance font-black leading-[1.02] tracking-tight"
            style={{
              color: "#FCFDFD",
              fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
            }}
          >
            Tu curaduría financiera, directo en WhatsApp.
          </h1>

          <p
            className="mt-5 max-w-md text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: "#DDDFE4" }}
          >
            Sin apps, ni newsletters interminables. Solo lo que importa, cuando importa.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onChatAction("am-brief")}
              className="rounded-xl px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:translate-y-[1px]"
              style={{
                background: "#D07371",
                color: "#FCFDFD",
                boxShadow:
                  "0 4px 12px rgba(208,115,113,0.4), 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              Probar demo
            </button>
            <a
              href="#como-funciona"
              className="rounded-xl border px-7 py-3 text-sm font-semibold transition-all hover:opacity-90 active:translate-y-[1px]"
              style={{
                borderColor: "rgba(221,223,228,0.35)",
                color: "#FCFDFD",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                background: "rgba(252,253,253,0.06)",
              }}
            >
              Ver cómo funciona
            </a>
          </div>

          {/* Bullets inline */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {HERO_BULLETS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={13} style={{ color: "#D07371" }} />
                <span className="text-sm" style={{ color: "rgba(252,253,253,0.55)" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* === RIGHT: Phone (cols 8-12) — tilted, bleeds off bottom === */}
        <div className="relative flex items-end justify-center lg:col-span-5 lg:justify-end">
          {/* Floating mini-card — breaks the axis */}
          <div
            className="absolute left-2 top-6 z-10 hidden lg:block"
            style={{ transform: "rotate(-4deg)" }}
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold shadow-xl"
              style={{
                background: "rgba(252,253,253,0.96)",
                color: "#070F14",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
                style={{ background: "#0938BD", color: "#fff" }}
              >
                F
              </span>
              Brief de hoy · 07:30 AM
            </div>
          </div>

          {/* Phone — rotated 3°, bleeds below section */}
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `rotate(3deg) scale(${phoneScale})`,
              filter: `drop-shadow(${phoneShadow})`,
              marginBottom: "-48px",
              willChange: "transform, filter",
            }}
          >
            <PhoneFrame>
              <WhatsAppChatDemo initialAction={chatAction} />
            </PhoneFrame>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ================================================================== */
/* HOW IT WORKS (3 visual steps)                                       */
/* ================================================================== */

const STEPS = [
  {
    number: "01",
    title: "Elegís un tema",
    description:
      "Personalizás tu feed: mercado argentino, global, bonos, acciones, cripto. Vos elegís qué te interesa.",
    icon: Sliders,
    visual: "chips",
  },
  {
    number: "02",
    title: "Finnik filtra el ruido",
    description:
      "Nuestro motor analiza decenas de fuentes y te deja solo lo relevante, con contexto real.",
    icon: Filter,
    visual: "filter",
  },
  {
    number: "03",
    title: "Te llega el brief",
    description:
      "Cada mañana recibís un mensaje claro y directo en WhatsApp. Listo en 2 minutos.",
    icon: Send,
    visual: "message",
  },
];

function StepVisual({ visual }: { visual: string }) {
  if (visual === "chips") {
    return (
      <div className="flex flex-wrap gap-2">
        {["Bonos", "Acciones", "CEDEARs", "Cripto", "Argentina", "Global"].map(
          (chip) => (
            <span
              key={chip}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(9,56,189,0.08)",
                color: "#0938BD",
                border: "1px solid rgba(9,56,189,0.15)",
              }}
            >
              {chip}
            </span>
          )
        )}
      </div>
    );
  }
  if (visual === "filter") {
    return (
      <div className="flex flex-col gap-1.5">
        {[
          { w: "100%", opacity: 0.15, blur: true },
          { w: "90%", opacity: 0.1, blur: true },
          { w: "95%", opacity: 1, blur: false },
        ].map((line, i) => (
          <div
            key={i}
            className="rounded-md px-3 py-1.5"
            style={{
              width: line.w,
              background: line.blur
                ? "rgba(9,56,189,0.05)"
                : "rgba(9,56,189,0.1)",
              opacity: line.opacity,
              filter: line.blur ? "blur(2px)" : "none",
              border: line.blur ? "none" : "1px solid rgba(9,56,189,0.2)",
            }}
          >
            <div
              className="h-2 rounded"
              style={{
                width: i === 2 ? "70%" : "60%",
                background: line.blur
                  ? "rgba(173,176,187,0.3)"
                  : "#0938BD",
                opacity: line.blur ? 0.5 : 0.6,
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  // message
  return (
    <div
      className="flex items-start gap-2 rounded-xl p-3"
      style={{
        background: "rgba(9,56,189,0.06)",
        border: "1px solid rgba(9,56,189,0.12)",
      }}
    >
      <div
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
        style={{ background: "#0938BD", color: "#FCFDFD" }}
      >
        F
      </div>
      <div className="flex flex-col gap-1">
        <div
          className="h-2 w-32 rounded"
          style={{ background: "rgba(9,56,189,0.2)" }}
        />
        <div
          className="h-2 w-24 rounded"
          style={{ background: "rgba(9,56,189,0.12)" }}
        />
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-step-idx"));
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.3 }
    );

    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="como-funciona"
      className="relative py-20 lg:py-28"
      style={{ background: "#F6F7F8" }}
    >
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "rgba(9,56,189,0.08)",
              color: "#0938BD",
            }}
          >
            Como funciona
          </span>
          <h2
            className="font-display mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#070F14" }}
          >
            De las noticias a tu WhatsApp, en 3 pasos
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              ref={(el) => {
                stepsRef.current[idx] = el;
              }}
              data-step-idx={idx}
              className="flex flex-col rounded-2xl border p-6 transition-all duration-500"
              style={{
                background: "#FCFDFD",
                borderColor: visibleSteps.has(idx)
                  ? "rgba(9,56,189,0.15)"
                  : "#DDDFE4",
                opacity: visibleSteps.has(idx) ? 1 : 0,
                transform: visibleSteps.has(idx)
                  ? "translateY(0)"
                  : "translateY(20px)",
                boxShadow: visibleSteps.has(idx)
                  ? "0 4px 24px rgba(9,56,189,0.06)"
                  : "none",
              }}
            >
              {/* Number + Icon */}
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "rgba(9,56,189,0.2)" }}
                >
                  {step.number}
                </span>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "rgba(9,56,189,0.08)" }}
                >
                  <step.icon size={20} style={{ color: "#0938BD" }} />
                </div>
              </div>

              <h3
                className="mt-4 text-lg font-semibold"
                style={{ color: "#070F14" }}
              >
                {step.title}
              </h3>

              <p
                className="mt-2 flex-1 text-sm leading-relaxed"
                style={{ color: "#ADB0BB" }}
              >
                {step.description}
              </p>

              {/* Mini visual */}
              <div className="mt-5">
                <StepVisual visual={step.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FEATURES SECTION (kept for backwards compat, now linked from steps) */
/* ================================================================== */

const FEATURES = [
  {
    icon: TrendingUp,
    title: "AM Brief",
    description:
      "Cada mañana recibís un resumen con las 3 noticias que importan, qué pasó y qué significa para vos.",
    action: "am-brief",
  },
  {
    icon: Radar,
    title: "Radar de Cartera",
    description:
      "Monitorea bonos, acciones y CEDEARs. Te avisa si hay movimientos relevantes.",
    action: "radar",
  },
  {
    icon: GraduationCap,
    title: "Explainers",
    description:
      "Aprendé TIR, duration, brecha y más. Explicaciones claras de 4 a 6 líneas, sin tecnicismos innecesarios.",
    action: "explainer",
  },
];

function FeaturesSection({
  onChatAction,
}: {
  onChatAction: (action: string) => void;
}) {
  return (
    <section
      className="relative py-20"
      style={{
        background:
          "linear-gradient(180deg, #0B2572 0%, #103195 50%, #0B2572 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-xl text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "rgba(252,253,253,0.1)",
              color: "#FCFDFD",
            }}
          >
            Producto
          </span>
          <h2
            className="font-display mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#FCFDFD" }}
          >
            Así se ve Finnik
          </h2>
          <p
            className="mt-3 text-pretty text-sm leading-relaxed"
            style={{ color: "#DDDFE4" }}
          >
            Tres formatos diseñados para que entiendas el mercado rápido.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, idx) => (
            <div
              key={f.title}
              className="group flex flex-col rounded-2xl border p-6 shadow-md backdrop-blur-sm transition-all hover:shadow-lg"
              style={{
                background:
                  idx % 2 === 0
                    ? "rgba(246,247,248,0.95)"
                    : "rgba(243,245,250,0.95)",
                borderColor: "#DDDFE4",
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "rgba(9,56,189,0.12)" }}
              >
                <f.icon size={20} style={{ color: "#0938BD" }} />
              </div>
              <h3
                className="mt-4 text-lg font-semibold"
                style={{ color: "#070F14" }}
              >
                {f.title}
              </h3>
              <p
                className="mt-2 flex-1 text-sm leading-relaxed"
                style={{ color: "#103195" }}
              >
                {f.description}
              </p>
              <button
                onClick={() => onChatAction(f.action)}
                className="mt-5 self-start rounded-lg px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                style={{ background: "#D07371", color: "#FCFDFD" }}
              >
                Ver en el chat
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* PLANS                                                               */
/* ================================================================== */

type WaitlistState = "idle" | "loading" | "success" | "error";

function WaitlistModal({
  onClose,
  planLabel,
}: {
  onClose: () => void;
  planLabel: string;
}) {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState<WaitlistState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, whatsapp }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div
        className="w-full max-w-sm rounded-2xl p-6 shadow-lg"
        style={{ background: "#F6F7F8", border: "1px solid #DDDFE4" }}
      >
        {state === "success" ? (
          <div className="text-center">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: "rgba(9,56,189,0.1)" }}
            >
              <Check size={22} style={{ color: "#0938BD" }} />
            </div>
            <p className="text-lg font-semibold" style={{ color: "#070F14" }}>
              ¡Ya estás en lista!
            </p>
            <p className="mt-2 text-sm" style={{ color: "#103195" }}>
              Te avisamos por WhatsApp cuando Finnik esté listo.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "#D07371", color: "#FCFDFD" }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-lg font-semibold" style={{ color: "#070F14" }}>
              Anotate en la lista de espera
            </p>
            <p className="mt-1 text-sm" style={{ color: "#ADB0BB" }}>
              Plan {planLabel} — te avisamos cuando esté disponible.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-blue-400"
                style={{
                  borderColor: "#DDDFE4",
                  color: "#070F14",
                  background: "#FCFDFD",
                }}
              />
              <input
                type="tel"
                placeholder="WhatsApp (ej: +54 9 11 1234-5678)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-blue-400"
                style={{
                  borderColor: "#DDDFE4",
                  color: "#070F14",
                  background: "#FCFDFD",
                }}
              />
            </div>

            {state === "error" && (
              <p className="mt-2 text-xs" style={{ color: "#D07371" }}>
                Algo salió mal. Intentá de nuevo.
              </p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl py-3 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ border: "1.5px solid #DDDFE4", color: "#070F14" }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={state === "loading"}
                className="flex-1 rounded-xl py-3 text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-60"
                style={{ background: "#D07371", color: "#FCFDFD" }}
              >
                {state === "loading" ? "Enviando..." : "Anotarme"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function PlansSection() {
  const [showModal, setShowModal] = useState(false);
  const [planLabel, setPlanLabel] = useState("");

  function openModal(label: string) {
    setPlanLabel(label);
    setShowModal(true);
  }

  const freePlanFeatures = [
    "Resumen corto de 1 noticia por semana",
    "Aviso de upgrade al final del resumen",
    "5 preguntas libres por día",
    '1 "Contame más" por día',
    "Sin alertas intra-día",
  ];

  const proPlanFeatures = [
    "Resumen completo y personalizado con 2 noticias",
    "50 preguntas libres por día",
    '"Contame más" ilimitado',
    "Hasta 2 alertas intra-día según industria",
    "Seguimiento de cartera personal de hasta 15 tickers",
    "Insights nocturnos de cartera",
    "Soporte prioritario",
  ];

  return (
    <section id="planes" className="relative py-20 lg:py-28" style={{ background: "#0B2572" }}>
      <div className="mx-auto max-w-4xl px-5">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-display text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#FCFDFD" }}
          >
            Planes
          </h2>
          <p
            className="mt-4 text-pretty text-base leading-relaxed"
            style={{ color: "#DDDFE4" }}
          >
            {"Elegí cómo querés seguir el mercado: gratis para empezar, Pro para personalizar."}
          </p>
        </div>

        {/* Plans grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* FREE PLAN */}
          <div
            className="relative flex flex-col rounded-2xl border p-7 shadow-lg"
            style={{
              background: "#FCFDFD",
              borderColor: "#DDDFE4",
            }}
          >
            {/* Badge */}
            <span
              className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(9,56,189,0.1)",
                color: "#0938BD",
              }}
            >
              Por defecto
            </span>

            {/* Plan name */}
            <h3
              className="mt-2 text-xl font-bold"
              style={{ color: "#070F14" }}
            >
              Free
            </h3>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-1">
              <span
                className="text-4xl font-bold tracking-tight"
                style={{ color: "#070F14" }}
              >
                $0
              </span>
              <span className="text-sm font-medium" style={{ color: "#ADB0BB" }}>
                / mes
              </span>
            </div>

            {/* Description */}
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#ADB0BB" }}
            >
              {"Probá Finnik sin costo y entendé lo importante sin perder tiempo."}
            </p>

            {/* Features */}
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {freePlanFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5">
                  <Check
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#0938BD" }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "#103195" }}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => openModal("Free")}
              className="mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:translate-y-[1px]"
              style={{
                background: "transparent",
                color: "#070F14",
                border: "1.5px solid #DDDFE4",
              }}
            >
              Empezar gratis
            </button>
          </div>

          {/* PRO PLAN */}
          <div
            className="relative flex flex-col rounded-2xl border-2 p-7 shadow-xl"
            style={{
              background: "#FCFDFD",
              borderColor: "#D07371",
            }}
          >
            {/* Badge */}
            <span
              className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "#D07371",
                color: "#FCFDFD",
              }}
            >
              Más completo
            </span>

            {/* Plan name */}
            <h3
              className="mt-2 text-xl font-bold"
              style={{ color: "#070F14" }}
            >
              Pro
            </h3>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-1">
              <span
                className="text-4xl font-bold tracking-tight"
                style={{ color: "#070F14" }}
              >
                $3.500
              </span>
              <span className="text-sm font-medium" style={{ color: "#ADB0BB" }}>
                ARS / mes
              </span>
            </div>

            {/* Description */}
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#ADB0BB" }}
            >
              {"Recibí análisis personalizado, seguimiento de cartera y alertas pensadas para tu perfil."}
            </p>

            {/* Features */}
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {proPlanFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5">
                  <Check
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#D07371" }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "#103195" }}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => openModal("Pro")}
              className="mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:translate-y-[1px]"
              style={{
                background: "#D07371",
                color: "#FCFDFD",
                boxShadow: "0 4px 12px rgba(208,115,113,0.3)",
              }}
            >
              Empezar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <WaitlistModal planLabel={planLabel} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}

/* ================================================================== */
/* FAQ                                                                 */
/* ================================================================== */

const FAQ_DATA = [
  {
    q: "¿Es asesoramiento financiero?",
    a: "No. Finnik es un servicio de curaduría informativa. No damos recomendaciones de inversión. Siempre consultá con un asesor financiero antes de tomar decisiones.",
  },
  {
    q: "¿Qué tan largo es el brief?",
    a: "El brief matutino se lee en 1 a 2 minutos. Priorizamos densidad informativa: 3 noticias clave con contexto, sin relleno.",
  },
  {
    q: "¿Puedo elegir Argentina o Global?",
    a: "Sí. Podés personalizar tu brief para mercado argentino, global o mixto. También elegís tu perfil de riesgo y el formato preferido.",
  },
  {
    q: "¿Cómo recibo el contenido?",
    a: "Directamente en WhatsApp. Te mandamos un mensaje cada mañana con tu brief personalizado. También podés pedir información on-demand escribiéndole al bot.",
  },
  {
    q: "¿Puedo cancelar cuando quiero?",
    a: "Sí, podés cancelar en cualquier momento sin costo. El plan Free no tiene vencimiento y el Pro se puede dar de baja antes de la próxima renovación mensual.",
  },
  {
    q: "¿Qué fuentes usan?",
    a: "Analizamos medios financieros locales e internacionales, datos de mercado en tiempo real y fuentes oficiales. Nuestro equipo de economistas valida la relevancia de cada noticia antes de que llegue a tu WhatsApp.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. Solo guardamos tu nombre y número de WhatsApp para enviarte el contenido. No compartimos tu información con terceros ni la usamos con fines comerciales.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-20"
      style={{
        background: "linear-gradient(180deg, #0B2572 0%, #103195 100%)",
      }}
    >
      <div className="mx-auto max-w-2xl px-5">
        <h2
          className="font-display text-center text-3xl font-bold tracking-tight md:text-4xl"
          style={{ color: "#FCFDFD" }}
        >
          Preguntas frecuentes
        </h2>

        <div className="mt-10 flex flex-col gap-3">
          {FAQ_DATA.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border shadow-sm backdrop-blur-sm"
              style={{
                background:
                  idx % 2 === 0
                    ? "rgba(246,247,248,0.95)"
                    : "rgba(243,245,250,0.95)",
                borderColor: "#DDDFE4",
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "#070F14" }}
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 transition-transform"
                  style={{
                    color: "#103195",
                    transform:
                      openIdx === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#103195" }}
                  >
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* QUIENES SOMOS                                                       */
/* ================================================================== */

const TEAM = [
  {
    name: "Julian Fernandez Sinisgalli",
    role: "Licenciado en Economia",
    university: "Universidad Torcuato Di Tella",
    linkedin: "https://www.linkedin.com/in/julianfernandezsinisgalli/",
  },
  {
    name: "Catalina Burgio Iraola",
    role: "Licenciada en Administracion de Empresas",
    university: "Universidad Torcuato Di Tella",
    linkedin: "https://www.linkedin.com/in/catalina-burgio-iraola/",
  },
];

function QuienesSomosSection() {
  return (
    <section
      id="quienes-somos"
      className="relative py-20 lg:py-28"
      style={{ background: "#F6F7F8" }}
    >
      <div className="mx-auto max-w-4xl px-5">
        <div className="mx-auto max-w-xl text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "rgba(9,56,189,0.08)",
              color: "#0938BD",
            }}
          >
            Equipo
          </span>
          <h2
            className="font-display mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#070F14" }}
          >
            Quiénes Somos
          </h2>
          <p
            className="mt-3 text-pretty text-base leading-relaxed"
            style={{ color: "#ADB0BB" }}
          >
            Tus noticias financieras curadas por economistas de verdad.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-2xl border p-8 text-center"
              style={{
                background: "#FCFDFD",
                borderColor: "#DDDFE4",
                boxShadow: "0 4px 24px rgba(9,56,189,0.06)",
              }}
            >
              {/* Avatar placeholder */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold"
                style={{ background: "rgba(9,56,189,0.08)", color: "#0938BD" }}
              >
                {member.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3
                className="mt-4 text-lg font-semibold"
                style={{ color: "#070F14" }}
              >
                {member.name}
              </h3>
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{ color: "#103195" }}
              >
                {member.role}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#ADB0BB" }}
              >
                {member.university}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ background: "rgba(9,56,189,0.08)", color: "#0938BD" }}
                aria-label={`LinkedIn de ${member.name}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FOOTER                                                              */
/* ================================================================== */

function Footer() {
  return (
    <footer className="py-10" style={{ background: "#0B2572" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: "#0938BD", color: "#FCFDFD" }}
          >
            F
          </div>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "#FCFDFD" }}
          >
            FINNIK
          </span>
        </div>
        <p className="text-xs" style={{ color: "#ADB0BB" }}>
          {
            "Finnik no brinda asesoramiento financiero. Consulta con un profesional."
          }
        </p>
        <p className="text-xs" style={{ color: "#ADB0BB" }}>
          {"2026 Finnik. Todos los derechos reservados."}
        </p>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* PAGE (single route)                                                 */
/* ================================================================== */

export default function Home() {
  const [chatAction, setChatAction] = useState<string | null>(null);

  function handleChatAction(action: string) {
    setChatAction(action);
    const el = document.getElementById("producto");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main>
      <Navbar />
      <Hero onChatAction={handleChatAction} chatAction={chatAction} />
      <HowItWorksSection />
      <FeaturesSection onChatAction={handleChatAction} />
      <PlansSection />
      <FAQSection />
      <QuienesSomosSection />
      <Footer />
    </main>
  );
}
