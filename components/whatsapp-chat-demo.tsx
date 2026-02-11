"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  Phone,
  Video,
  Search,
  Plus,
  Camera,
  Mic,
  RotateCcw,
  Lock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Sender = "user" | "bot";

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  time: string;
}

interface QuickReply {
  label: string;
  action: string;
}

/* ------------------------------------------------------------------ */
/* Data / responses                                                    */
/* ------------------------------------------------------------------ */

const INITIAL_BOT_MSG: ChatMessage = {
  id: "init",
  sender: "bot",
  text: "Hola! Soy Finnik, tu curador financiero. Que queres hacer hoy?",
  time: "09:41",
};

const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { label: "Noticias del dia", action: "noticias" },
  { label: "Mi cartera", action: "cartera" },
  { label: "Aprender algo", action: "aprender" },
];

function getBotResponse(action: string): {
  text: string;
  quickReplies?: QuickReply[];
} {
  switch (action) {
    case "noticias":
      return {
        text: "Tu brief de hoy:\n\n- S&P Merval sube 2.1% impulsado por bancos\n- El BCRA compro USD 120M, reservas en USD 28.400M\n- Inflacion de abril: 3.2% (debajo de lo esperado)\n\nQue significa: El mercado festeja la baja de inflacion. Los bancos lideran porque se benefician de tasas reales positivas. Buen momento para revisar posiciones en renta fija corta.",
      };
    case "cartera":
      return {
        text: "Que miramos de tu cartera?",
        quickReplies: [
          { label: "Bonos", action: "bonos" },
          { label: "Acciones", action: "acciones" },
          { label: "CEDEARs", action: "cedears" },
        ],
      };
    case "aprender":
      return {
        text: "Que concepto te interesa?",
        quickReplies: [
          { label: "TIR", action: "tir" },
          { label: "Duration", action: "duration" },
          { label: "Brecha cambiaria", action: "brecha" },
        ],
      };
    case "bonos":
      return {
        text: "Tus bonos soberanos en USD (AL30, GD30) subieron 0.8% esta semana. El riesgo pais bajo a 720 puntos, lo que beneficia la deuda en dolares. Si buscas mas rendimiento, los Bopreales ofrecen TIR del 12% en USD.",
      };
    case "acciones":
      return {
        text: "El panel lider cerro mixto. YPF destaca con +3.2% por la licitacion de areas en Vaca Muerta. Galicia y Macro acompanan con subas de 1.5%. BYMA lateraliza. El volumen opero por encima del promedio de 20 ruedas.",
      };
    case "cedears":
      return {
        text: "Los CEDEARs tech se recuperan: MELI +2.4%, AAPL +1.1%, NVDA +3.8%. El CCL se mantuvo estable en $1.180, asi que el rendimiento refleja la suba en NYSE. Ojo con TSLA que reporta earnings la proxima semana.",
      };
    case "tir":
      return {
        text: "TIR (Tasa Interna de Retorno) es el rendimiento anual que obtenes si mantenes un bono hasta su vencimiento, reinvirtiendo los cupones a la misma tasa. Ejemplo: si compras AL30 a USD 55 y paga USD 100 en 2030, la TIR te dice cuanto ganas por ano. Cuanto menor el precio de entrada, mayor la TIR.",
      };
    case "duration":
      return {
        text: "Duration mide la sensibilidad del precio de un bono ante cambios en la tasa de interes. Si un bono tiene duration 5, por cada 1% que sube la tasa, el precio baja ~5%. Bonos cortos = menos duration = menos riesgo de tasa. Es clave para armar una cartera de renta fija.",
      };
    case "brecha":
      return {
        text: "La brecha cambiaria es la diferencia entre el dolar oficial y los dolares paralelos (MEP, CCL, blue). Si el oficial esta en $900 y el CCL en $1.180, la brecha es ~31%. Una brecha alta genera incentivos a subfacturar exportaciones y anticipa presion devaluatoria.",
      };
    default:
      return {
        text: "Disculpa, no tengo info sobre eso todavia. Proba con otra opcion!",
      };
  }
}

/* ------------------------------------------------------------------ */
/* Typing indicator                                                    */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <div className="flex animate-fade-in-up justify-start px-3 pb-2">
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-2.5"
        style={{ background: "#DDDFE4" }}
      >
        <span
          className="inline-block h-2 w-2 animate-typing-dot-1 rounded-full"
          style={{ background: "#ADB0BB" }}
        />
        <span
          className="inline-block h-2 w-2 animate-typing-dot-2 rounded-full"
          style={{ background: "#ADB0BB" }}
        />
        <span
          className="inline-block h-2 w-2 animate-typing-dot-3 rounded-full"
          style={{ background: "#ADB0BB" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsAppChatDemo                                                    */
/* ------------------------------------------------------------------ */

interface WhatsAppChatDemoProps {
  initialAction?: string | null;
}

export default function WhatsAppChatDemo({
  initialAction,
}: WhatsAppChatDemoProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MSG]);
  const [quickReplies, setQuickReplies] =
    useState<QuickReply[]>(INITIAL_QUICK_REPLIES);
  const [isTyping, setIsTyping] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastActionRef = useRef<string | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* Handle external trigger (from "Ver en el chat" cards) */
  useEffect(() => {
    if (initialAction && initialAction !== lastActionRef.current) {
      lastActionRef.current = initialAction;
      handleQuickReply(
        initialAction === "am-brief"
          ? { label: "Noticias del dia", action: "noticias" }
          : initialAction === "radar"
            ? { label: "Mi cartera", action: "cartera" }
            : { label: "Aprender algo", action: "aprender" }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAction]);

  function now() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  function handleQuickReply(qr: QuickReply) {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: qr.label,
      time: now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuickReplies([]);
    setIsTyping(true);

    setTimeout(() => {
      const resp = getBotResponse(qr.action);
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: resp.text,
        time: now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setQuickReplies(resp.quickReplies ?? []);
    }, 800);
  }

  function handleReset() {
    setMessages([INITIAL_BOT_MSG]);
    setQuickReplies(INITIAL_QUICK_REPLIES);
    setIsTyping(false);
    lastActionRef.current = null;
  }

  return (
    <div className="flex h-full flex-col" style={{ background: "#070F14" }}>
      {/* Chat header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "#CAD5F2" }}
      >
        <ChevronLeft size={20} style={{ color: "#070F14" }} />
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: "#0938BD", color: "#FCFDFD" }}
        >
          F
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#070F14" }}>
            Finnik
          </p>
          <p className="text-[10px]" style={{ color: "#070F14", opacity: 0.6 }}>
            en linea
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Video size={18} style={{ color: "#070F14" }} />
          <Phone size={16} style={{ color: "#070F14" }} />
        </div>
      </div>

      {/* E2E banner */}
      <div
        className="flex items-center justify-center gap-1.5 px-3 py-1.5"
        style={{ background: "#F6F7F8" }}
      >
        <Lock size={10} style={{ color: "#ADB0BB" }} />
        <p className="text-[9px]" style={{ color: "#070F14", opacity: 0.6 }}>
          Mensajes cifrados de extremo a extremo (demo)
        </p>
      </div>

      {/* Date separator */}
      <div className="flex justify-center py-2">
        <span
          className="rounded-md px-3 py-0.5 text-[10px]"
          style={{ background: "#103195", color: "#ADB0BB" }}
        >
          Hoy
        </span>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 space-y-2 overflow-y-auto px-3 pb-2"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex animate-fade-in-up ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[12.5px] leading-relaxed ${
                msg.sender === "user"
                  ? "rounded-tr-sm"
                  : "rounded-tl-sm"
              }`}
              style={
                msg.sender === "user"
                  ? { background: "#0938BD", color: "#FCFDFD" }
                  : { background: "#DDDFE4", color: "#070F14" }
              }
            >
              {msg.text}
              <span
                className="mt-0.5 block text-right text-[9px]"
                style={{ color: msg.sender === "user" ? "rgba(252,253,253,0.5)" : "#ADB0BB" }}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && <TypingIndicator />}

        {/* Quick replies */}
        {quickReplies.length > 0 && !isTyping && (
          <div className="flex animate-fade-in-up flex-wrap gap-1.5 pt-1">
            {quickReplies.map((qr) => (
              <button
                key={qr.action}
                onClick={() => handleQuickReply(qr)}
                className="rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors hover:opacity-80"
                style={{
                  borderColor: "#DDDFE4",
                  color: "#FCFDFD",
                  background: "rgba(9, 56, 189, 0.4)",
                }}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* WhatsApp CTA after conversation */}
        {messages.length > 2 && !isTyping && quickReplies.length === 0 && (
          <div className="flex animate-fade-in-up flex-col items-center gap-2 pt-3">
            <button
              onClick={() => setShowComingSoon(true)}
              className="w-full rounded-xl px-4 py-2.5 text-[12px] font-semibold transition-opacity hover:opacity-90"
              style={{ background: "#D07371", color: "#FCFDFD" }}
            >
              Mandarmelo por WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* Coming soon modal */}
      {showComingSoon && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-black/60 p-6">
          <div
            className="w-full rounded-2xl p-5 text-center"
            style={{ background: "#070F14", border: "1px solid rgba(221,223,228,0.2)" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#FCFDFD" }}>
              Proximamente
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: "#ADB0BB" }}
            >
              Te vamos a avisar cuando este listo!
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-4 rounded-lg px-5 py-2 text-xs font-medium transition-opacity hover:opacity-90"
              style={{ background: "#D07371", color: "#FCFDFD" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-2 py-2"
        style={{ background: "#070F14" }}
      >
        <button aria-label="Adjuntar" className="p-1">
          <Plus size={20} style={{ color: "#ADB0BB" }} />
        </button>
        <div
          className="flex flex-1 items-center gap-2 rounded-full px-3 py-1.5"
          style={{ background: "#F6F7F8" }}
        >
          <span className="flex-1 text-[12px]" style={{ color: "#ADB0BB" }}>
            Mensaje
          </span>
          <Camera size={16} style={{ color: "#ADB0BB" }} />
        </div>
        <button aria-label="Audio" className="p-1">
          <Mic size={20} style={{ color: "#ADB0BB" }} />
        </button>
      </div>

      {/* Reset button (floating) */}
      {messages.length > 1 && (
        <button
          onClick={handleReset}
          className="absolute bottom-14 right-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium opacity-70 transition-opacity hover:opacity-100"
          style={{
            background: "rgba(7,15,20,0.8)",
            color: "#ADB0BB",
            border: "1px solid rgba(221,223,228,0.15)",
          }}
          aria-label="Reiniciar chat"
        >
          <RotateCcw size={10} />
          Reiniciar
        </button>
      )}
    </div>
  );
}
