import { useEffect } from "react";
import { motion } from "framer-motion";

const LETTERS = [
  ["S", "#ffffff"],
  ["K", "#FF6B00"],
  ["O", "#ffffff"],
  ["L", "#FF6B00"],
];
const STEP = 0.6;

export default function Loader({ onDone }) {
  useEffect(() => {
    let minDone = false, loaded = document.readyState === "complete", finished = false;
    const finish = () => { if (!finished) { finished = true; onDone(); } };
    const check = () => { if (minDone && loaded) finish(); };
    const t1 = setTimeout(() => { minDone = true; check(); }, 3800);
    const t2 = setTimeout(finish, 9000); // safety net
    const onLoad = () => { loaded = true; check(); };
    if (!loaded) window.addEventListener("load", onLoad);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("load", onLoad); };
  }, []);

  const panel = "absolute inset-x-0 h-1/2 bg-grid";
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden" role="status" aria-label="Loading">
      <motion.div className={`${panel} top-0`} style={{ background: "radial-gradient(60% 90% at 50% 100%, rgba(255,107,0,.35), #0B0B0C 70%)" }} exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}>
        <div className="absolute inset-0 bg-grid" />
      </motion.div>
      <motion.div className={`${panel} bottom-0`} style={{ background: "radial-gradient(60% 90% at 50% 0%, rgba(255,107,0,.35), #0B0B0C 70%)" }} exit={{ y: "100%" }} transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}>
        <div className="absolute inset-0 bg-grid" />
      </motion.div>

      <motion.div className="relative z-10 flex flex-col items-center px-4" exit={{ opacity: 0, scale: 1.3 }} transition={{ duration: 0.5 }}>
        <div className="disp flex items-center gap-2 text-6xl font-extrabold sm:gap-4 sm:text-8xl md:text-9xl">
          {LETTERS.map(([ch, col], i) => (
            <span key={ch} className="flex items-center gap-2 sm:gap-4">
              <motion.span
                initial={{ y: 90, opacity: 0, rotateX: -90, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * STEP, duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
                style={{ color: col, display: "inline-block" }}
              >
                {ch}
              </motion.span>
              {i < LETTERS.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * STEP, duration: 0.3 }}
                  className="inline-block h-1.5 w-5 rounded-full sm:w-9" style={{ background: "#FF6B00", transformOrigin: "left" }}
                />
              )}
            </span>
          ))}
        </div>

        <svg viewBox="0 0 320 60" className="mt-3 w-64 sm:w-96" aria-hidden="true">
          <motion.path d="M6 40 C 60 4, 110 70, 170 32 S 270 8, 314 26" fill="none" stroke="#FF6B00" strokeWidth="9" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.6, duration: 0.9, ease: "easeInOut" }} />
        </svg>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-4 text-sm" style={{ color: "#A0A0A5" }}>
          Comfort Chidimma Emmanuel
        </motion.p>
        <div className="mt-4 h-1 w-48 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,.14)" }}>
          <motion.div className="h-full rounded-full" style={{ background: "#FF6B00" }} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3.6, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
