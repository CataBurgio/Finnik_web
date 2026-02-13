"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap,
  Brain,
  BookOpen,
  Sliders,
  Check,
  ChevronDown,
  MessageCircle,
  TrendingUp,
  Radar,
  GraduationCap,
  Filter,
  Sparkles,
  Send,
  X,
  Newspaper,
  Clock,
  Smartphone,
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
        <a href="#" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
            style={{ background: "#0938BD", color: "#FCFDFD" }}
          >
            F
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: "#070F14" }}
          >
            FINNIK
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {["Producto", "Como funciona", "Planes", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#070F14" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#planes"
          className="hidden rounded-lg px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90 md:inline-block"
          style={{ background: "#D07371", color: "#FCFDFD" }}
        >
          Empezar en WhatsApp
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
          {["Producto", "Como funciona", "Planes", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium"
              style={{ color: "#070F14" }}
            >
              {link}
            </a>
          ))}
          <a
            href="#planes"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-block rounded-lg px-5 py-2 text-sm font-semibold"
            style={{ background: "#D07371", color: "#FCFDFD" }}
          >
            Empezar en WhatsApp
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
  { icon: Brain, text: "Contexto + que significa" },
  { icon: BookOpen, text: "Aprende sin humo" },
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
      className="relative min-h-[90vh] overflow-hidden lg:min-h-[85vh]"
    >
      {/* Collage background */}
      <NewspaperCollageBackground scrollProgress={scrollProgress} />

      {/* Content */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-16 pt-12 lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-20">
        {/* === LEFT: Promise (cols 1-5) === */}
        <div className="lg:col-span-5">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              borderColor: "rgba(221,223,228,0.3)",
              color: "#FCFDFD",
              background: "rgba(252,253,253,0.06)",
            }}
          >
            <MessageCircle size={12} />
            Bot de WhatsApp
          </span>

          <h1
            className="mt-6 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem]"
            style={{ color: "#FCFDFD" }}
          >
            Tu curaduria financiera, directo en WhatsApp.
          </h1>

          <p
            className="mt-4 max-w-md text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: "#DDDFE4" }}
          >
            Noticias clave, contexto y aprendizaje en 2 minutos. Sin ruido.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#planes"
              className="rounded-xl px-7 py-3 text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: "#D07371", color: "#FCFDFD" }}
            >
              Empezar en WhatsApp
            </a>
            <a
              href="#como-funciona"
              className="rounded-xl border px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                borderColor: "rgba(221,223,228,0.35)",
                color: "#FCFDFD",
              }}
            >
              Ver como funciona
            </a>
          </div>
        </div>

        {/* === CENTER: Phone (cols 6-9) === */}
        <div className="flex items-center justify-center lg:col-span-4">
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${phoneScale})`,
              filter: `drop-shadow(${phoneShadow})`,
              willChange: "transform, filter",
            }}
          >
            <PhoneFrame>
              <WhatsAppChatDemo initialAction={chatAction} />
            </PhoneFrame>
            {/* Demo label */}
            <p
              className="mt-3 text-center text-xs font-medium tracking-wide"
              style={{ color: "rgba(252,253,253,0.5)" }}
            >
              Demo interactiva
            </p>
          </div>
        </div>

        {/* === RIGHT: Bullets (cols 10-12) === */}
        <div className="flex flex-row flex-wrap gap-3 lg:col-span-3 lg:flex-col lg:gap-4">
          {HERO_BULLETS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{
                borderColor: "rgba(221,223,228,0.15)",
                background: "rgba(252,253,253,0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(252,253,253,0.1)" }}
              >
                <Icon size={15} style={{ color: "#FCFDFD" }} />
              </div>
              <span
                className="text-sm leading-snug"
                style={{ color: "#DDDFE4" }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SOCIAL PROOF STRIP                                                  */
/* ================================================================== */

const TRUST_CHIPS = [
  { icon: Newspaper, label: "3 noticias clave" },
  { icon: Clock, label: "2 minutos" },
  { icon: Smartphone, label: "En WhatsApp (sin app)" },
];

function SocialProofStrip() {
  return (
    <section
      className="relative py-12 lg:py-16"
      style={{ background: "#F6F7F8" }}
    >
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h3
          className="text-balance text-lg font-semibold tracking-tight md:text-xl"
          style={{ color: "#070F14" }}
        >
          Hecho para entender el mercado sin ruido.
        </h3>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {TRUST_CHIPS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                background: "#FCFDFD",
                borderColor: "#DDDFE4",
              }}
            >
              <Icon size={16} style={{ color: "#0938BD" }} />
              <span
                className="text-sm font-medium"
                style={{ color: "#070F14" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed"
          style={{ color: "#5A5E6B" }}
        >
          Contenido curado + contexto claro. Sin newsletters interminables.
        </p>
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
    title: "Elegis un tema",
    description:
      "Personalizas tu feed: mercado argentino, global, bonos, acciones, cripto. Vos elegis que te interesa.",
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
      "Cada manana recibis un mensaje claro y directo en WhatsApp. Listo en 2 minutos.",
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
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#070F14" }}
          >
            De las noticias a tu WhatsApp, en 3 pasos
          </h2>
          <p
            className="mt-3 text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: "#5A5E6B" }}
          >
            Sin apps, sin newsletters interminables. Solo lo que importa,
            cuando importa.
          </p>
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
                style={{ color: "#4A4E59" }}
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
/* FEATURES SECTION + EXAMPLE MODALS                                   */
/* ================================================================== */

const FEATURES = [
  {
    icon: TrendingUp,
    title: "AM Brief",
    description:
      "Cada manana recibis un resumen con las 3 noticias que importan, que paso y que significa para vos.",
    action: "am-brief",
    example: {
      heading: "AM Brief - Ejemplo",
      content: `Buenos dias! Tu brief de hoy:

1. S&P Merval sube 2.1% impulsado por bancos
   Que paso: Galicia (+3.8%) y Macro (+2.5%) lideran tras datos de depositos en alza.
   Que significa: El mercado lee estabilidad cambiaria y apuesta al sector financiero.

2. BCRA compro USD 120M, reservas en USD 28.400M
   Que paso: Tercera rueda consecutiva con compras netas en el MULC.
   Que significa: Refuerza la posicion del Central y reduce presion sobre el CCL.

3. Inflacion de abril: 3.2% (debajo de lo esperado)
   Que paso: El dato sorprendio al consenso que esperaba 3.8%.
   Que significa: Buen dato para bonos CER cortos y expectativas de baja de tasas.`,
    },
  },
  {
    icon: Radar,
    title: "Radar de Cartera",
    description:
      "Monitorea bonos, acciones y CEDEARs. Te avisa si hay movimientos relevantes.",
    action: "radar",
    example: {
      heading: "Radar de Cartera - Ejemplo",
      content: `Alerta de cartera:

Bonos soberanos USD (AL30, GD30)
Suba semanal: +0.8%. Riesgo pais bajo a 720 pbs. La compresion de spread beneficia la deuda larga.

CEDEARs Tech
NVDA +3.8% | MELI +2.4% | AAPL +1.1%
CCL estable en $1.180. Rendimiento refleja suba en NYSE sin efecto cambiario.

Accion sugerida: Revisar posiciones en renta fija larga si buscas capturar la compresion de spread.`,
    },
  },
  {
    icon: GraduationCap,
    title: "Explainers",
    description:
      "Aprende TIR, duration, brecha y mas. Explicaciones claras de 4 a 6 lineas, sin tecnicismos innecesarios.",
    action: "explainer",
    example: {
      heading: "Explainer: TIR",
      content: `TIR (Tasa Interna de Retorno) es el rendimiento anual que obtenes si mantenes un bono hasta su vencimiento, reinvirtiendo los cupones a la misma tasa.

Ejemplo practico: Si compras AL30 a USD 55 y el bono paga USD 100 al vencimiento en 2030, la TIR te dice cuanto ganas por anio. Cuanto menor el precio de entrada, mayor la TIR.

Clave: Es la metrica mas usada para comparar bonos. Pero ojo, asume que podes reinvertir los cupones a la misma tasa, lo cual no siempre pasa en la practica.`,
    },
  },
];

function ExampleModal({
  open,
  onClose,
  heading,
  content,
}: {
  open: boolean;
  onClose: () => void;
  heading: string;
  content: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 shadow-xl"
        style={{ background: "#FCFDFD", border: "1px solid #DDDFE4" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 transition-opacity hover:opacity-70"
          aria-label="Cerrar"
        >
          <X size={18} style={{ color: "#070F14" }} />
        </button>

        {/* Heading */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
            style={{ background: "#0938BD", color: "#FCFDFD" }}
          >
            F
          </div>
          <h3 className="text-lg font-semibold" style={{ color: "#070F14" }}>
            {heading}
          </h3>
        </div>

        {/* Content */}
        <div
          className="mt-4 max-h-[60vh] overflow-y-auto whitespace-pre-line rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: "#F6F7F8",
            color: "#070F14",
            border: "1px solid #DDDFE4",
          }}
        >
          {content}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          <a
            href="#planes"
            onClick={onClose}
            className="rounded-xl px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#D07371", color: "#FCFDFD" }}
          >
            Empezar en WhatsApp
          </a>
          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ borderColor: "#DDDFE4", color: "#070F14" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection({
  onChatAction,
}: {
  onChatAction: (action: string) => void;
}) {
  const [activeExample, setActiveExample] = useState<number | null>(null);

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
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#FCFDFD" }}
          >
            Asi se ve Finnik
          </h2>
          <p
            className="mt-3 text-pretty text-sm leading-relaxed"
            style={{ color: "#DDDFE4" }}
          >
            Tres formatos disenados para que entiendas el mercado rapido.
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
                onClick={() => setActiveExample(idx)}
                className="mt-5 self-start rounded-lg px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                style={{ background: "#D07371", color: "#FCFDFD" }}
              >
                Ver ejemplo
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Example Modals */}
      {FEATURES.map((f, idx) => (
        <ExampleModal
          key={f.title}
          open={activeExample === idx}
          onClose={() => setActiveExample(null)}
          heading={f.example.heading}
          content={f.example.content}
        />
      ))}
    </section>
  );
}

/* ================================================================== */
/* PLANS                                                               */
/* ================================================================== */

function PlansSection() {
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: "Gratis",
      price: "$0",
      period: "/mes",
      features: [
        "1 brief semanal",
        "Acceso a la demo interactiva",
        "Explainers basicos",
      ],
      cta: "Empezar gratis",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$4.99",
      period: "/mes",
      features: [
        "Brief diario AM & PM",
        "Radar de cartera completo",
        "Explainers ilimitados",
        "Personalizacion de mercado y perfil",
      ],
      cta: "Empezar en WhatsApp",
      highlighted: true,
    },
  ];

  return (
    <section id="planes" className="relative py-20" style={{ background: "#0B2572" }}>
      <div className="mx-auto max-w-3xl px-5">
        <h2
          className="text-center text-3xl font-bold tracking-tight md:text-4xl"
          style={{ color: "#FCFDFD" }}
        >
          Planes
        </h2>
        <p
          className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed"
          style={{ color: "#DDDFE4" }}
        >
          Empeza gratis, escala cuando quieras.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-2xl border p-6 shadow-md backdrop-blur-sm"
              style={{
                background:
                  idx % 2 === 0
                    ? "rgba(246,247,248,0.95)"
                    : "rgba(243,245,250,0.95)",
                borderColor: plan.highlighted
                  ? "rgba(208,115,113,0.5)"
                  : "#DDDFE4",
              }}
            >
              <p className="text-sm font-medium" style={{ color: "#103195" }}>
                {plan.name}
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#070F14" }}
                >
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: "#ADB0BB" }}>
                  {plan.period}
                </span>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "#D07371" }}
                    />
                    <span className="text-sm" style={{ color: "#103195" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowModal(true)}
                className="mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={
                  plan.highlighted
                    ? { background: "#D07371", color: "#FCFDFD" }
                    : {
                        background: "transparent",
                        color: "#070F14",
                        border: "1px solid #DDDFE4",
                      }
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coming soon modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div
            className="w-full max-w-sm rounded-2xl p-6 text-center shadow-lg"
            style={{
              background: "#F6F7F8",
              border: "1px solid #DDDFE4",
            }}
          >
            <p
              className="text-lg font-semibold"
              style={{ color: "#070F14" }}
            >
              Proximamente
            </p>
            <p className="mt-2 text-sm" style={{ color: "#103195" }}>
              Estamos terminando los ultimos detalles. Te vamos a avisar
              cuando este listo!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 rounded-lg px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: "#D07371", color: "#FCFDFD" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================================================================== */
/* FAQ                                                                 */
/* ================================================================== */

const FAQ_DATA = [
  {
    q: "Es asesoramiento financiero?",
    a: "No. Finnik es un servicio de curaduria informativa. No damos recomendaciones de inversion. Siempre consulta con un asesor financiero antes de tomar decisiones.",
  },
  {
    q: "Que tan largo es el brief?",
    a: "El brief matutino se lee en 1 a 2 minutos. Priorizamos densidad informativa: 3 noticias clave con contexto, sin relleno.",
  },
  {
    q: "Puedo elegir Argentina o Global?",
    a: "Si. Podes personalizar tu brief para mercado argentino, global o mixto. Tambien elegis tu perfil de riesgo y el formato preferido.",
  },
  {
    q: "Como recibo el contenido?",
    a: "Directamente en WhatsApp. Te mandamos un mensaje cada manana con tu brief personalizado. Tambien podes pedir informacion on-demand escribiendole al bot.",
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
          className="text-center text-3xl font-bold tracking-tight md:text-4xl"
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
      <SocialProofStrip />
      <HowItWorksSection />
      <FeaturesSection onChatAction={handleChatAction} />
      <PlansSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
