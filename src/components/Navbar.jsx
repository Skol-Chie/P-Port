import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "../data/config";
import Avatar from "./Avatar.jsx";

export default function Navbar({ view, go }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const pick = (id) => { setOpen(false); go(id); };
  const current = SECTIONS.find((s) => s.id === view);

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} exit={{ y: -80 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl"
      style={{ background: "rgba(11,11,12,.7)", paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      {/* tablets and desktops: pill bar */}
      <div className="mx-auto hidden max-w-6xl items-center gap-3 px-4 py-3 md:flex">
        <button onClick={() => go("home")} aria-label="Back to the spinning wheel"
          className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: "var(--amber)", color: "var(--amber)" }}>
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 4 }} className="inline-block">&#9881;</motion.span>
          Home
        </button>
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border p-1" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.04)" }}>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => go(s.id)} className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm" style={{ color: view === s.id ? "var(--ink)" : "var(--mute)" }}>
                {view === s.id && <motion.span layoutId="pill" className="absolute inset-0 rounded-full" style={{ background: s.color + "33", border: `1px solid ${s.color}` }} />}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="hidden lg:block"><Avatar small /></div>
      </div>

      {/* phones: drop-down menu, top right */}
      <div ref={box} className="relative flex items-center justify-between px-4 py-3 md:hidden">
        <span className="disp text-sm font-bold uppercase tracking-[0.18em]">{current ? current.label : ""}</span>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border" style={{ borderColor: open ? "var(--amber)" : "var(--line)", background: "rgba(255,255,255,.06)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute right-4 top-full mt-1 w-60 origin-top-right rounded-2xl border p-2 shadow-2xl"
              style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.97)" }}>
              <li>
                <button onClick={() => pick("home")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold" style={{ color: "var(--amber)" }}>
                  <span aria-hidden="true">&#9881;</span> Home (wheel)
                </button>
              </li>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button onClick={() => pick(s.id)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm"
                    style={{ background: view === s.id ? s.color + "26" : "transparent", color: view === s.id ? "var(--ink)" : "var(--soft)" }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
