import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { SECTIONS } from "../data/config";

const polar = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r * Math.cos(a), r * Math.sin(a)];
};

const sectorPath = (i, n) => {
  const a0 = (i * 360) / n, a1 = ((i + 1) * 360) / n;
  const [x0, y0] = polar(250, a0), [x1, y1] = polar(250, a1);
  const [x2, y2] = polar(62, a1), [x3, y3] = polar(62, a0);
  return `M${x0} ${y0} A250 250 0 0 1 ${x1} ${y1} L${x2} ${y2} A62 62 0 0 0 ${x3} ${y3}Z`;
};

export default function Wheel({ onPick, picked }) {
  const angle = useMotionValue(0);
  const speed = useRef(6);
  const target = useRef(6);
  const [hover, setHover] = useState(null);
  const n = SECTIONS.length;

  useEffect(() => {
    let raf, prev = performance.now();
    const tick = (t) => {
      const dt = (t - prev) / 1000; prev = t;
      speed.current += (target.current - speed.current) * Math.min(1, dt * 4);
      angle.set(angle.get() + speed.current * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle]);

  return (
    <motion.div
      className="wheel-size relative"
      initial={{ scale: 0.3, opacity: 0, rotate: -120 }}
      animate={picked == null ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 3.2, opacity: 0, rotate: 90 }}
      transition={{ duration: picked == null ? 0.9 : 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={() => (target.current = 70)}
      onMouseLeave={() => { target.current = 6; setHover(null); }}
    >
      <div className="absolute -inset-6 rounded-full opacity-40 blur-3xl" style={{ background: "conic-gradient(from 0deg,#FF6B00,#C85A17,#FFA24A,#FF8A3D,#E04E00,#FF6B00)" }} />
      <div className="absolute -top-3 left-1/2 z-20 h-0 w-0 -translate-x-1/2" style={{ borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderTop: "22px solid #FF6B00" }} />

      <motion.svg viewBox="-270 -270 540 540" className="relative z-10 h-full w-full" style={{ rotate: angle }} role="navigation" aria-label="Site sections">
        <circle r="262" fill="none" stroke="rgba(255,255,255,.18)" strokeDasharray="2 9" strokeWidth="3" />
        {SECTIONS.map((s, i) => {
          const mid = ((i + 0.5) * 360) / n;
          return (
            <g key={s.id} tabIndex={0} role="link" aria-label={s.label} style={{ cursor: "pointer", outline: "none" }}
              onClick={() => onPick(i)} onKeyDown={(e) => e.key === "Enter" && onPick(i)}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <path d={sectorPath(i, n)} fill={s.color} fillOpacity={hover === i ? 0.55 : 0.14} stroke={s.color} strokeWidth="2" style={{ transition: "fill-opacity .2s" }} />
              <g transform={`rotate(${mid - 90})`}>
                <text x="150" y="6" textAnchor="middle" fill="#ffffff" className="disp" style={{ fontSize: s.label.length > 10 ? 21 : 27, fontWeight: 700, pointerEvents: "none" }}>{s.label}</text>
              </g>
            </g>
          );
        })}
        <circle r="62" fill="#0B0B0C" stroke="rgba(255,255,255,.25)" strokeWidth="2" />
        <text y="-4" textAnchor="middle" fill="#FF6B00" className="disp" style={{ fontSize: 20, fontWeight: 800 }}>&lt;/&gt;</text>
      </motion.svg>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <span className="mt-9 text-[11px]" style={{ color: "var(--mute)" }}>{hover == null ? "pick a path" : SECTIONS[hover].label}</span>
      </div>
    </motion.div>
  );
}
