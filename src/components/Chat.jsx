import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EMAIL, SOCIALS } from "../data/config";

const reply = (q) => {
  q = q.toLowerCase();
  if (/cv|resume|download|certificate|document/.test(q)) return "Open the About page and scroll to the Download center for her CV and other documents.";
  if (/linkedin|whatsapp|telegram|substack|social|link/.test(q)) return "You can reach Comfort on " + SOCIALS.map((s) => s.name).join(", ") + ". The links are on the About and Contact pages.";
  if (/service|hire|offer|work/.test(q)) return "Comfort offers frontend development, UI/UX thinking, team collaboration and community coordination. See the Services page.";
  if (/project|portfolio|built/.test(q)) return "The Projects page shows her latest repositories, loaded live from GitHub (Skol-Chie).";
  if (/contact|email|reach|talk/.test(q)) return `You can email ${EMAIL} or use the form on the Contact Me page.`;
  if (/who|about|skill|stack|study|school/.test(q)) return "Comfort is an Information Technology student at Anchor University, Lagos, focused on frontend development and UX. She is also Commandant of the Nigerian Red Cross Society, Anchor University Detachment.";
  return "I can help with her background, services, projects, documents and contact links. Try one of those.";
};

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ f: "bot", t: "Hi! I’m Comfort’s assistant. Ask about her background, projects, documents or how to get in touch." }]);
  const [v, setV] = useState("");
  const end = useRef(null);

  useEffect(() => { end.current && end.current.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const send = (t) => {
    t = (t || v).trim();
    if (!t) return;
    setMsgs((m) => [...m, { f: "me", t }]);
    setV("");
    setTimeout(() => setMsgs((m) => [...m, { f: "bot", t: reply(t) }]), 500);
  };

  return (
    <div className="fixed right-5 z-50" style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom,0px))" }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{ transformOrigin: "bottom right", background: "#161618", borderColor: "var(--line)" }}
            className="absolute bottom-16 right-0 flex h-[26rem] w-[min(88vw,22rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl"
          >
            <div className="disp px-4 py-3 font-bold" style={{ background: "rgba(255,107,0,.14)" }}>Chat assistant</div>
            <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 ${m.f === "me" ? "ml-auto text-[#0B0B0C]" : ""}`} style={{ background: m.f === "me" ? "var(--amber)" : "rgba(255,255,255,.08)" }}>{m.t}</div>
              ))}
              <div ref={end} />
            </div>
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {["About", "Documents", "Contact"].map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: "var(--line)" }}>{q}</button>
              ))}
            </div>
            <div className="flex gap-2 border-t p-2" style={{ borderColor: "var(--line)" }}>
              <input className="field !py-2" placeholder="Type a message" value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} aria-label="Chat message" />
              <button onClick={() => send()} className="rounded-xl px-3 font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={() => setOpen(!open)} aria-label="Open chat"
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 font-bold" style={{ background: "#161618", borderColor: "var(--violet)" }}>
        <motion.span className="absolute inset-0 rounded-full border" style={{ borderColor: "var(--violet)" }} animate={{ scale: [1, 1.5], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
        <span className="disp text-sm">{open ? "×" : "Chat"}</span>
      </motion.button>
    </div>
  );
}
