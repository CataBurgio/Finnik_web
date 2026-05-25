"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sliders,
  Check,
  ChevronDown,
  TrendingUp,
  Radar,
  GraduationCap,
  Filter,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "@/components/phone-frame";
import WhatsAppChatDemo from "@/components/whatsapp-chat-demo";
import NewspaperCollageBackground from "@/components/newspaper-collage-background";
import { FadeIn, FadeInStagger, fadeUpItem } from "@/components/fade-in";
import MarqueeSection from "@/components/marquee-section";
import WhyFinnikSection from "@/components/why-finnik-section";
import NumbersSection from "@/components/numbers-section";

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

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

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5" style={{ background: "rgba(0,0,0,0)" }}>
      <motion.div
        className="h-full origin-left"
        style={{ background: "#D07371", scaleX: progress, transformOrigin: "0%" }}
      />
    </div>
  );
}

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
              className="group relative text-sm font-medium"
              style={{ color: "#070F14" }}
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: "#D07371" }}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#planes"
          className="hidden rounded-lg px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90 md:inline-block"
          style={{ background: "#25D366", color: "#FCFDFD" }}
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
            style={{ background: "#25D366", color: "#FCFDFD" }}
          >
            Anotarme
          </a>
        </div>
      )}
    </nav>
  );
}

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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0, ease }}
            className="mb-5 flex items-center gap-2.5"
          >
            <span className="h-px w-8 flex-shrink-0" style={{ background: "#D07371" }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#D07371" }}>
              Claridad. Criterio. Foco.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="font-display text-balance font-normal leading-[1.05] tracking-normal"
            style={{ color: "#FCFDFD", fontSize: "clamp(2.6rem, 5.8vw, 5.2rem)" }}
          >
            Tu curaduría financiera, directo en WhatsApp.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease }}
            className="mt-5 max-w-md text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: "#DDDFE4" }}
          >
            Cada mañana, las 3 noticias financieras que más importan. Directo en tu WhatsApp.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => onChatAction("am-brief")}
              className="rounded-xl px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "#25D366",
                color: "#FCFDFD",
                boxShadow: "0 4px 12px rgba(37,211,102,0.4), 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              Probar demo
            </button>
            <a
              href="#como-funciona"
              className="rounded-xl border px-7 py-3 text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                borderColor: "rgba(221,223,228,0.35)",
                color: "#FCFDFD",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                background: "rgba(252,253,253,0.06)",
              }}
            >
              Ver cómo funciona
            </a>
          </motion.div>

        </div>

        {/* === RIGHT: Phone (cols 8-12) — tilted, bleeds off bottom === */}
        <div className="relative flex items-end justify-center lg:col-span-5 lg:justify-end">
          {/* Floating mini-card — breaks the axis */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="absolute left-2 top-6 z-10 hidden lg:block"
            style={{ rotate: -4 }}
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold shadow-xl"
              style={{ background: "rgba(252,253,253,0.96)", color: "#070F14", backdropFilter: "blur(8px)" }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]" style={{ background: "#0938BD", color: "#fff" }}>
                F
              </span>
              Brief de hoy · 07:30 AM
            </div>
          </motion.div>

          {/* Phone — entrance animation + scroll scale */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease }}
          >
            <div
              className="transition-[transform,filter] duration-300 ease-out"
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
          </motion.div>
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
    title: "Elegís un tema",
    description: "Personalizás tu feed: mercado argentino, global, bonos, acciones, cripto. Vos elegís qué te interesa.",
    icon: Sliders,
  },
  {
    title: "Finnik filtra el ruido",
    description: "Nuestro motor analiza decenas de fuentes y te deja solo lo relevante, con contexto real.",
    icon: Filter,
  },
  {
    title: "Te llega el brief",
    description: "Cada mañana recibís un mensaje claro y directo en WhatsApp. Listo en 1 minuto.",
    icon: Send,
  },
];

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-20 lg:py-28" style={{ background: "#F6F7F8" }}>
      <div className="mx-auto max-w-3xl px-5">
        <FadeIn>
          <h2 className="font-display text-3xl font-normal tracking-normal md:text-4xl" style={{ color: "#070F14" }}>
            De las noticias a tu WhatsApp, en 3 pasos
          </h2>
        </FadeIn>

        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px" style={{ background: "rgba(9,56,189,0.15)" }} />

          <div className="flex flex-col gap-12">
            {STEPS.map((step, idx) => (
              <FadeIn key={step.title} delay={idx * 0.1}>
                <div className="relative flex gap-8 pl-14">
                  {/* Node */}
                  <div
                    className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2"
                    style={{ background: "#F6F7F8", borderColor: "#0938BD" }}
                  >
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#0938BD" }} />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(9,56,189,0.08)" }}>
                        <step.icon size={18} style={{ color: "#0938BD" }} />
                      </div>
                      <h3 className="text-lg font-semibold" style={{ color: "#070F14" }}>{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#ADB0BB" }}>{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FEATURES SECTION — WhatsApp message mockups                         */
/* ================================================================== */

function WhatsMsgBubble({ content, time = "07:30" }: { content: string; time?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg" style={{ background: "#ECE5DD" }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#075E54" }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold" style={{ background: "#0938BD", color: "#fff" }}>
          F
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Finnik</p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>en línea</p>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="max-w-[95%] rounded-2xl rounded-tl-none bg-white px-4 py-3 shadow-sm">
          <p className="whitespace-pre-wrap text-xs leading-[1.75]" style={{ color: "#111" }}>{content}</p>
          <div className="mt-2 flex items-center justify-end gap-1">
            <span className="text-[9px]" style={{ color: "#999" }}>{time}</span>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L4 7L9 1" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 4L10 7L15 1" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const AM_BRIEF_MSG = `🔵 AM Brief — 25 mayo

1. El Merval cerró +2.3% impulsado por YPF tras confirmarse la extensión del acuerdo con Petronas.

2. El BCRA compró USD 87M en el MULC. Acumula USD 1.200M en mayo.

3. Tesla cayó 4.1% after hours por guidance débil. Impacto en CEDEAR: TSLA.BA -3.8%.

📌 ¿Querés saber más de alguna? Respondé con el número.`;

const RADAR_MSG = `📊 Radar de Cartera — 15:30

Tu cartera se movió hoy:

▲ AL30 +1.2% ($67.000)
▼ TSLA.BA -2.4% ($28.100)

⚡ Alerta: GGAL superó tu precio objetivo de $5.800.

¿Querés ver el detalle de algún ticker?`;

const EXPLAINER_MSG = `📚 ¿Qué es la TIR?

La Tasa Interna de Retorno es el rendimiento anual que te da un bono si lo mantenés hasta el vencimiento.

Ejemplo: si comprás un AL30 a $67.000 y al vencimiento cobrás $100.000, la TIR te dice cuánto ganás por año en ese camino.

A mayor TIR → más rendimiento, pero también más riesgo.

¿Querés que te explique otro concepto?`;

const PRODUCT_ITEMS = [
  {
    icon: TrendingUp,
    title: "AM Brief",
    subtitle: "Las 3 noticias del día, en 1 minuto",
    description: "Cada mañana antes de las 8am recibís un resumen con lo que movió el mercado, por qué pasó y qué significa para tu plata.",
    message: AM_BRIEF_MSG,
    time: "07:30",
    reverse: false,
  },
  {
    icon: Radar,
    title: "Radar de Cartera",
    subtitle: "Tu cartera, monitoreada en tiempo real",
    description: "Seguimiento de bonos, acciones y CEDEARs. Alertas intra-día cuando hay movimientos relevantes en lo que te importa.",
    message: RADAR_MSG,
    time: "15:30",
    reverse: true,
  },
  {
    icon: GraduationCap,
    title: "Explainers",
    subtitle: "Conceptos financieros en 4 líneas",
    description: "TIR, duration, brecha, carry trade — explicados con ejemplos del mercado argentino, sin tecnicismos innecesarios.",
    message: EXPLAINER_MSG,
    time: "12:00",
    reverse: false,
  },
];

function FeaturesSection() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: "linear-gradient(180deg, #0B2572 0%, #103195 100%)" }}>
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-normal tracking-normal md:text-4xl" style={{ color: "#FCFDFD" }}>
            Así se ve Finnik
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#DDDFE4" }}>
            Tres formatos diseñados para que entiendas el mercado rápido.
          </p>
        </FadeIn>

        <div className="mt-20 flex flex-col gap-24">
          {PRODUCT_ITEMS.map((item, idx) => (
            <FadeIn key={item.title} delay={0.1}>
              <div className={`grid items-center gap-12 md:grid-cols-2${item.reverse ? " [&>*:first-child]:md:order-2" : ""}`}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(252,253,253,0.1)" }}>
                      <item.icon size={20} style={{ color: "#FCFDFD" }} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(252,253,253,0.5)" }}>{item.title}</span>
                  </div>
                  <h3 className="font-display text-2xl font-normal md:text-3xl" style={{ color: "#FCFDFD" }}>
                    {item.subtitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#DDDFE4" }}>
                    {item.description}
                  </p>
                </div>
                <div className="md:px-4">
                  <WhatsMsgBubble content={item.message} time={item.time} />
                </div>
              </div>
            </FadeIn>
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
                style={{ background: "#25D366", color: "#FCFDFD" }}
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

/* ================================================================== */
/* SOCIAL PROOF                                                        */
/* ================================================================== */

const TESTIMONIALS = [
  { quote: "Arranco el día leyendo el brief con el café. En 1 minuto ya sé qué pasó.", name: "Martín R." },
  { quote: "Me avisó que GGAL estaba subiendo antes de que lo viera en ningún lado.", name: "Lucía G." },
  { quote: "Finalmente entiendo qué es la TIR. Y lo entendí en 4 líneas.", name: "Sebastián M." },
];

function SocialProofSection() {
  /* TODO: reemplazar con testimonios reales */
  return (
    <section className="py-20" style={{ background: "#FCFDFD" }}>
      <div className="mx-auto max-w-5xl px-5">
        <FadeIn className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ADB0BB" }}>
            Probado por economistas, traders y curiosos del mercado argentino
          </p>
        </FadeIn>
        <FadeInStagger stagger={0.12} className="grid gap-10 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUpItem} className="flex flex-col">
              <span className="font-display text-5xl leading-none" style={{ color: "rgba(9,56,189,0.12)" }}>&ldquo;</span>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "#070F14" }}>{t.quote}</p>
              <p className="mt-5 text-sm font-medium" style={{ color: "#ADB0BB" }}>— {t.name}</p>
            </motion.div>
          ))}
        </FadeInStagger>
      </div>
    </section>
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
    "5 preguntas libres por día",
    '1 "Contame más" por día',
    "Sin alertas intra-día",
  ];

  const proPlanGroups = [
    {
      label: "Contenido",
      features: [
        "Resumen completo y personalizado con 2 noticias",
        "50 preguntas libres por día",
        '"Contame más" ilimitado',
      ],
    },
    {
      label: "Cartera",
      features: [
        "Seguimiento de hasta 15 tickers",
        "Hasta 2 alertas intra-día según industria",
        "Insights nocturnos de cartera",
      ],
    },
    {
      label: "Soporte",
      features: ["Soporte prioritario"],
    },
  ];

  return (
    <section id="planes" className="relative py-20 lg:py-28" style={{ background: "#0B2572" }}>
      <div className="mx-auto max-w-5xl px-5">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-balance text-3xl font-normal tracking-normal md:text-4xl" style={{ color: "#FCFDFD" }}>
            Planes
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#DDDFE4" }}>
            Empezá gratis, escalá cuando tenga sentido para vos.
          </p>
        </FadeIn>

        <FadeInStagger stagger={0.12} className="mt-14 flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          {/* FREE — subdued, smaller */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-col rounded-2xl border p-6 md:w-5/12"
            style={{ background: "rgba(252,253,253,0.05)", borderColor: "rgba(252,253,253,0.12)" }}
          >
            <h3 className="text-lg font-semibold" style={{ color: "#FCFDFD" }}>Free</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold" style={{ color: "#FCFDFD" }}>$0</span>
              <span className="text-sm" style={{ color: "rgba(252,253,253,0.5)" }}> / mes</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(252,253,253,0.5)" }}>
              Probá Finnik sin costo.
            </p>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {freePlanFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(252,253,253,0.4)" }} />
                  <span className="text-sm" style={{ color: "rgba(252,253,253,0.6)" }}>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal("Free")}
              className="mt-7 w-full rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90"
              style={{ border: "1.5px solid rgba(252,253,253,0.2)", color: "#FCFDFD" }}
            >
              Empezar gratis
            </button>
          </motion.div>

          {/* PRO — featured, prominent */}
          <motion.div
            variants={fadeUpItem}
            whileHover={{ y: -4, boxShadow: "0 24px 56px rgba(37,211,102,0.15)" }}
            transition={{ duration: 0.25 }}
            className="flex flex-col rounded-2xl border-2 p-8 shadow-2xl md:w-7/12"
            style={{ background: "#FCFDFD", borderColor: "#25D366" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold" style={{ color: "#070F14" }}>Pro</h3>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight" style={{ color: "#070F14" }}>$3.500</span>
              <span className="text-sm font-medium" style={{ color: "#ADB0BB" }}>ARS / mes</span>
            </div>
            <p className="mt-1 text-xs" style={{ color: "#ADB0BB" }}>Menos de $120 por día</p>

            <div className="mt-6 flex flex-col gap-5">
              {proPlanGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#ADB0BB" }}>{group.label}</p>
                  <ul className="flex flex-col gap-2">
                    {group.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#25D366" }} />
                        <span className="text-sm leading-relaxed" style={{ color: "#103195" }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => openModal("Pro")}
              className="mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all hover:brightness-110 active:translate-y-[1px]"
              style={{ background: "#25D366", color: "#FCFDFD", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}
            >
              Empezar por WhatsApp
            </button>
          </motion.div>
        </FadeInStagger>
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
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
          className="font-display text-center text-3xl font-normal tracking-normal md:text-4xl"
          style={{ color: "#FCFDFD" }}
        >
          Preguntas frecuentes
        </h2>

        <FadeInStagger stagger={0.07} className="mt-10 flex flex-col gap-3">
          {FAQ_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpItem}
              className="overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm"
              style={{ background: idx % 2 === 0 ? "rgba(246,247,248,0.95)" : "rgba(243,245,250,0.95)", borderColor: "#DDDFE4" }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/50"
              >
                <span className="text-sm font-medium" style={{ color: "#070F14" }}>{item.q}</span>
                <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={18} style={{ color: "#103195" }} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#103195" }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </FadeInStagger>
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
    role: "Licenciado en Economía",
    university: "Universidad Torcuato Di Tella",
    bio: "3+ años en financial planning y cash management. Armó Finnik porque la info buena no llegaba a gente fuera del rubro.",
    linkedin: "https://www.linkedin.com/in/julianfernandezsinisgalli/",
    twitter: "#",
    photo: "/julian.jpg",
  },
  {
    name: "Catalina Burgio Iraola",
    role: "Licenciada en Administración de Empresas",
    university: "Universidad Torcuato Di Tella",
    bio: "Obsesionada con que los productos financieros sean accesibles, y entendibles, para todos.",
    linkedin: "https://www.linkedin.com/in/catalina-burgio-iraola/",
    twitter: "#",
    photo: "/catalina.jpg",
  },
];

function QuienesSomosSection() {
  return (
    <section id="quienes-somos" className="relative py-20 lg:py-28" style={{ background: "#F6F7F8" }}>
      <div className="mx-auto max-w-4xl px-5">
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-normal tracking-normal md:text-4xl" style={{ color: "#070F14" }}>
            Quiénes Somos
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "#ADB0BB" }}>
            Tus noticias curadas por economistas de verdad.
          </p>
        </FadeIn>

        <FadeInStagger stagger={0.15} className="mt-14 grid gap-6 md:grid-cols-2">
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUpItem}
              whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(9,56,189,0.08)" }}
              transition={{ duration: 0.25 }}
              className="flex flex-col rounded-2xl border p-8"
              style={{ background: "#FCFDFD", borderColor: "#DDDFE4" }}
            >
              {/* TODO: agregar foto real — reemplazar placeholder por <img src={member.photo} ... /> */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "#DDDFE4" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#ADB0BB" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#ADB0BB" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold" style={{ color: "#070F14" }}>{member.name}</h3>
              <p className="mt-0.5 text-sm" style={{ color: "#0938BD" }}>{member.role}</p>
              <p className="text-xs" style={{ color: "#ADB0BB" }}>{member.university}</p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#ADB0BB" }}>{member.bio}</p>
              <div className="mt-5 flex gap-2">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: "rgba(9,56,189,0.08)", color: "#0938BD" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: "rgba(9,56,189,0.06)", color: "#0938BD" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X / Twitter
                </a>
              </div>
            </motion.div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}

/* ================================================================== */
/* PRE-FOOTER CTA                                                      */
/* ================================================================== */

function PreFooterCTA() {
  return (
    <section className="py-24" style={{ background: "#0938BD" }}>
      <div className="mx-auto max-w-3xl px-5 text-center">
        <FadeIn>
          <h2
            className="font-display text-balance text-3xl font-normal tracking-normal md:text-5xl"
            style={{ color: "#FCFDFD", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Empezá a entender el mercado en 1 minuto.
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(252,253,253,0.7)" }}>
            Sin apps. Sin newsletters. Solo lo que importa, directo en tu WhatsApp.
          </p>
          <motion.a
            href="#planes"
            whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(37,211,102,0.4)" }}
            transition={{ duration: 0.2 }}
            className="mt-8 inline-block rounded-xl px-8 py-4 text-base font-bold"
            style={{ background: "#25D366", color: "#FCFDFD", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
          >
            Anotarme gratis →
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FOOTER                                                              */
/* ================================================================== */

function Footer() {
  return (
    <footer className="py-14" style={{ background: "#070F14" }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ background: "#0938BD", color: "#FCFDFD" }}>F</div>
              <span className="text-sm font-semibold tracking-tight" style={{ color: "#FCFDFD" }}>FINNIK</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: "#ADB0BB" }}>
              Curaduría financiera directo en WhatsApp. Para el mercado argentino.
            </p>
            <p className="mt-4 text-xs" style={{ color: "rgba(173,176,187,0.4)" }}>
              © 2026 Finnik. Todos los derechos reservados.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(252,253,253,0.3)" }}>Navegación</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Producto", href: "#producto" },
                { label: "Cómo funciona", href: "#como-funciona" },
                { label: "Planes", href: "#planes" },
                { label: "FAQ", href: "#faq" },
                { label: "Quiénes Somos", href: "#quienes-somos" },
              ].map(({ label, href }) => (
                <a key={href} href={href} className="text-sm transition-opacity hover:opacity-100" style={{ color: "#ADB0BB" }}>{label}</a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(252,253,253,0.3)" }}>Contacto</p>
            <a href="mailto:finnikfinance@gmail.com" className="text-sm transition-opacity hover:opacity-100" style={{ color: "#ADB0BB" }}>
              finnikfinance@gmail.com
            </a>
            <div className="mt-5 flex gap-3">
              <a href="https://www.linkedin.com/company/finnik" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ADB0BB"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" aria-label="X / Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ADB0BB"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(252,253,253,0.3)" }}>Legal</p>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="text-sm transition-opacity hover:opacity-100" style={{ color: "#ADB0BB" }}>Términos y Condiciones</a>
              <a href="#" className="text-sm transition-opacity hover:opacity-100" style={{ color: "#ADB0BB" }}>Política de Privacidad</a>
            </div>
            <p className="mt-5 text-xs leading-relaxed" style={{ color: "rgba(173,176,187,0.5)" }}>
              Finnik no brinda asesoramiento financiero. El contenido es informativo.
            </p>
          </div>
        </div>
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
      <ScrollProgressBar />
      <Navbar />
      <Hero onChatAction={handleChatAction} chatAction={chatAction} />
      <MarqueeSection />
      <WhyFinnikSection />
      <NumbersSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SocialProofSection />
      <PlansSection />
      <FAQSection />
      <QuienesSomosSection />
      <PreFooterCTA />
      <Footer />
    </main>
  );
}
