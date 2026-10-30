import { motion } from "framer-motion";
import { DOCUMENTS } from "../data/config";

export default function Downloads() {
  const ready = DOCUMENTS.filter((d) => d.available);
  const all = () => ready.forEach((d, i) => setTimeout(() => {
    const a = document.createElement("a");
    a.href = d.file; a.download = d.file.split("/").pop();
    document.body.appendChild(a); a.click(); a.remove();
  }, i * 500));

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        {DOCUMENTS.map((d) => (
          <motion.div key={d.title} whileHover={d.available ? { y: -3 } : undefined}
            className="flex items-center gap-4 rounded-2xl border p-4"
            style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)", opacity: d.available ? 1 : 0.65 }}>
            <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ background: d.available ? "var(--amber)" : "#3a3a3f" }}>PDF</div>
            <div className="min-w-0 flex-1">
              <div className="disp font-bold">{d.title}</div>
              <div className="text-xs" style={{ color: "var(--mute)" }}>{d.desc}</div>
            </div>
            {d.available ? (
              <a href={d.file} download className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Download</a>
            ) : (
              <span className="shrink-0 text-xs" style={{ color: "var(--mute)" }}>Coming soon</span>
            )}
          </motion.div>
        ))}
      </div>
      {ready.length > 1 && (
        <button onClick={all} className="mt-4 rounded-full px-6 py-3 font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>
          Download everything ({ready.length} files)
        </button>
      )}
    </div>
  );
}
