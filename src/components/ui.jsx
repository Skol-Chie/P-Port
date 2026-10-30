import { motion } from "framer-motion";

export function Page({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 mx-auto max-w-5xl px-5 pb-28 pt-28 md:px-8"
    >
      <h2 className="disp mb-8 text-3xl font-extrabold uppercase tracking-[0.16em] md:text-5xl">{title}</h2>
      {children}
    </motion.section>
  );
}

export function Card({ children, color = "#FF6B00", className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-2xl border p-5 backdrop-blur ${className}`}
      style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)", borderLeft: `3px solid ${color}` }}
    >
      {children}
    </motion.div>
  );
}

export function Shell({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 mx-auto max-w-6xl px-5 pb-32 pt-28 md:px-8"
    >
      {children}
    </motion.section>
  );
}

const ic = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
export const IconArrow = () => <svg {...ic}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const IconMail = () => <svg {...ic}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 7l9 6 9-6" /></svg>;
export const IconDownload = () => <svg {...ic}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>;
