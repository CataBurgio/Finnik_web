"use client";

import { useState } from "react";
import {
  Zap,
  Brain,
  BookOpen,
  TrendingUp,
  Radar,
  GraduationCap,
  Check,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import PhoneFrame from "@/components/phone-frame";
import WhatsAppChatDemo from "@/components/whatsapp-chat-demo";

/* ================================================================== */
/* NAVBAR                                                              */
/* ================================================================== */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-finnik-gray-light/20"
      style={{ background: "#CAD5F2" }}
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
          <span className="text-lg font-bold tracking-tight" style={{ color: "#070F14" }}>
            FINNIK
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {["Producto", "Como funciona", "Planes", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "#070F14" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#producto"
          className="hidden rounded-lg px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90 md:inline-block"
          style={{ background: "#D07371", color: "#FCFDFD" }}
        >
          Probar
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1 md:hidden"
          aria-label="Menu"
        >
          <span className="block h-0.5 w-5" style={{ background: "#070F14" }} />
          <span className="block h-0.5 w-5" style={{ background: "#070F14" }} />
          <span className="block h-0.5 w-5" style={{ background: "#070F14" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-finnik-gray-light/30 px-5 pb-4 pt-2 md:hidden" style={{ background: "#CAD5F2" }}>
          {["Producto", "Como funciona", "Planes", "FAQ"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium"
              style={{ color: "#070F14" }}
            >
              {link}
            </a>
          ))}
          <a
            href="#producto"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-block rounded-lg px-5 py-2 text-sm font-semibold"
            style={{ background: "#D07371", color: "#FCFDFD" }}
          >
            Probar
          </a>
        </div>
      )}
    </nav>
  );
}

/* ================================================================== */
/* HERO                                                                */
/* ================================================================== */

function Hero({
  onChatAction,
  chatAction,
}: {
  onChatAction: (action: string) => void;
  chatAction: string | null;
}) {
  return (
    <section
      id="producto"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0938BD 0%, #0931AC 30%, #0730AA 60%, #0B2572 100%)",
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 opacity-20 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0938BD, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 pb-16 pt-12 lg:flex-row lg:gap-16 lg:pb-24 lg:pt-20">
        {/* Left column */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor: "rgba(221,223,228,0.4)", color: "#FCFDFD" }}
          >
            <MessageCircle size={12} />
            Bot de WhatsApp
          </span>

          <h1
            className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-[3.4rem]"
            style={{ color: "#FCFDFD" }}
          >
            Tu curaduria financiera, directo en WhatsApp.
          </h1>

          <p
            className="mt-4 max-w-lg text-pretty text-base leading-relaxed md:text-lg"
            style={{ color: "#DDDFE4" }}
          >
            Noticias clave, contexto y aprendizaje en 2 minutos. Sin ruido.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={() => onChatAction("am-brief")}
              className="rounded-xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "#D07371", color: "#FCFDFD" }}
            >
              Probar demo
            </button>
            <a
              href="#como-funciona"
              className="rounded-xl border px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(221,223,228,0.4)", color: "#FCFDFD" }}
            >
              Ver como funciona
            </a>
          </div>

          {/* Bullets */}
          <div className="mt-10 flex flex-col gap-3">
            {[
              { icon: Zap, text: "Brief diario en 1 minuto" },
              { icon: Brain, text: "Contexto + que significa" },
              { icon: BookOpen, text: "Aprende conceptos sin humo" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: "rgba(252,253,253,0.1)" }}
                >
                  <Icon size={14} style={{ color: "#FCFDFD" }} />
                </div>
                <span className="text-sm" style={{ color: "#DDDFE4" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Phone */}
        <div className="flex-shrink-0">
          <PhoneFrame>
            <WhatsAppChatDemo initialAction={chatAction} />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FEATURES SECTION                                                    */
/* ================================================================== */

const FEATURES = [
  {
    icon: TrendingUp,
    title: "AM Brief",
    description:
      "Cada manana recibis un resumen con las 3 noticias que importan, que paso y que significa para vos.",
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
      "Aprende TIR, duration, brecha y mas. Explicaciones claras de 4 a 6 lineas, sin tecnicismos innecesarios.",
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
      id="como-funciona"
      className="relative py-20"
      style={{
        background:
          "linear-gradient(180deg, #0B2572 0%, #103195 50%, #0B2572 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5">
        <h2
          className="text-center text-3xl font-bold tracking-tight md:text-4xl"
          style={{ color: "#FCFDFD" }}
        >
          Asi se ve Finnik
        </h2>
        <p
          className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed"
          style={{ color: "#DDDFE4" }}
        >
          Tres formatos disenados para que entiendas el mercado rapido.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, idx) => (
            <div
              key={f.title}
              className="group flex flex-col rounded-2xl border p-6 shadow-md backdrop-blur-sm transition-colors"
              style={{
                background: idx % 2 === 0 ? "rgba(246,247,248,0.95)" : "rgba(243,245,250,0.95)",
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
      cta: "Empezar por WhatsApp",
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
                background: idx % 2 === 0 ? "rgba(246,247,248,0.95)" : "rgba(243,245,250,0.95)",
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
            <p className="text-lg font-semibold" style={{ color: "#070F14" }}>
              Proximamente
            </p>
            <p className="mt-2 text-sm" style={{ color: "#103195" }}>
              Estamos terminando los ultimos detalles. Te vamos a avisar cuando este listo!
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
        background:
          "linear-gradient(180deg, #0B2572 0%, #103195 100%)",
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
                background: idx % 2 === 0 ? "rgba(246,247,248,0.95)" : "rgba(243,245,250,0.95)",
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
          {"Finnik no brinda asesoramiento financiero. Consulta con un profesional."}
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
    /* Scroll to the phone on mobile */
    const el = document.getElementById("producto");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main>
      <Navbar />
      <Hero onChatAction={handleChatAction} chatAction={chatAction} />
      <FeaturesSection onChatAction={handleChatAction} />
      <PlansSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
