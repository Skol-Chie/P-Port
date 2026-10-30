import { motion } from "framer-motion";
import { Shell } from "../components/ui.jsx";
import { SERVICES } from "../data/config";

const Bar = ({ w, hot }) => <div className="h-2 rounded-full" style={{ width: w, background: hot ? "var(--amber)" : "rgba(255,255,255,.18)" }} />;
const Dot = ({ hot }) => <span className="h-2 w-2 rounded-full" style={{ background: hot ? "var(--amber)" : "rgba(255,255,255,.25)" }} />;

const Sheet = ({ cls, rot = 0, d = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: rot * 2 }} whileInView={{ opacity: 1, y: 0, rotate: rot }} viewport={{ once: true, margin: "-60px" }}
    transition={{ delay: d, type: "spring", stiffness: 90, damping: 14 }} whileHover={{ y: -6, rotate: 0 }}
    className={`absolute rounded-2xl border p-3 shadow-2xl ${cls}`} style={{ borderColor: "var(--line)", background: "#17171a" }}>
    {children}
  </motion.div>
);

const Pill = ({ children }) => <span className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>{children}</span>;

const VISUALS = {
  code: (
    <>
      <Sheet cls="left-0 top-6 h-40 w-64" rot={-3}>
        <div className="mb-3 flex gap-1.5"><Dot hot /><Dot /><Dot /></div>
        <div className="space-y-2"><Bar w="80%" hot /><Bar w="55%" /><Bar w="70%" /><Bar w="40%" hot /></div>
      </Sheet>
      <Sheet cls="right-2 top-0 flex h-20 w-20 items-center justify-center" rot={5} d={0.1}><span className="disp text-2xl font-extrabold" style={{ color: "var(--amber)" }}>&lt;/&gt;</span></Sheet>
      <Sheet cls="bottom-2 right-6" rot={-2} d={0.2}><Pill>Deploy</Pill></Sheet>
    </>
  ),
  design: (
    <>
      <Sheet cls="left-2 top-4 h-44 w-52" rot={-4}>
        <div className="mb-2 h-20 rounded-xl" style={{ background: "linear-gradient(135deg,#ff6b00,#c85a17)" }} />
        <div className="space-y-2"><Bar w="85%" /><Bar w="50%" /></div>
      </Sheet>
      <Sheet cls="right-0 top-2 flex gap-2 px-4 py-4" rot={4} d={0.1}>
        {["#ff6b00", "#c85a17", "#ffa24a", "#ffffff"].map((c) => <span key={c} className="h-8 w-8 rounded-full" style={{ background: c }} />)}
      </Sheet>
      <Sheet cls="bottom-0 right-10" rot={-2} d={0.2}><span className="text-xs" style={{ color: "var(--soft)" }}>User flow · 4 screens</span></Sheet>
    </>
  ),
  team: (
    <>
      <Sheet cls="left-0 top-4 w-60 space-y-2" rot={-3}>
        <div className="w-4/5 rounded-xl rounded-bl-none px-3 py-2 text-xs" style={{ background: "rgba(255,255,255,.08)" }}>Can we simplify this screen?</div>
        <div className="ml-auto w-3/4 rounded-xl rounded-br-none px-3 py-2 text-xs font-medium text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Yes. Pushing an update.</div>
      </Sheet>
      <Sheet cls="right-2 top-0 flex px-4 py-3" rot={4} d={0.1}>
        {["C", "A", "T"].map((c, i) => <span key={c} className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold first:ml-0" style={{ background: i === 0 ? "var(--amber)" : "#2a2a2e", borderColor: "#17171a", color: i === 0 ? "#0B0B0C" : "#fff" }}>{c}</span>)}
      </Sheet>
      <Sheet cls="bottom-2 right-8" rot={-2} d={0.2}><Pill>Reviewed ✓</Pill></Sheet>
    </>
  ),
  community: (
    <>
      <Sheet cls="left-0 top-4 h-40 w-56" rot={-3}>
        <div className="grid grid-cols-7 gap-1.5">{Array.from({ length: 21 }).map((_, i) => <span key={i} className="h-5 rounded-md" style={{ background: [3, 9, 15].includes(i) ? "var(--amber)" : "rgba(255,255,255,.1)" }} />)}</div>
      </Sheet>
      <Sheet cls="right-0 top-2 w-44 space-y-2" rot={4} d={0.1}>
        {["Outreach", "Recruitment", "Planning"].map((t) => <div key={t} className="flex items-center gap-2 text-xs"><span style={{ color: "var(--amber)" }}>✓</span>{t}</div>)}
      </Sheet>
      <Sheet cls="bottom-0 right-10" rot={-2} d={0.2}><Pill>Commandant</Pill></Sheet>
    </>
  ),
};

export default function Services({ go }) {
  return (
    <Shell>
      <div className="grid gap-12 md:grid-cols-[15rem_1fr]">
        <aside className="self-start md:sticky md:top-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)" }}>
            <span className="mb-4 block h-2 w-2 rounded-full" style={{ background: "var(--amber)" }} />
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: "var(--mute)" }}>Services</div>
            <h2 className="disp text-2xl font-bold leading-snug">Carefully built interfaces make your work truly shine.</h2>
            <button onClick={() => go("contact")} className="mt-6 rounded-full border px-5 py-2 text-sm font-semibold hover:bg-white/10" style={{ borderColor: "var(--ink)" }}>Let’s talk</button>
          </motion.div>
        </aside>

        <div className="space-y-24">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="grid items-center gap-10 md:grid-cols-2">
              <div className={`relative h-60 w-full max-w-md ${i % 2 ? "md:order-2" : ""}`}>{VISUALS[s.kind]}</div>
              <div className={i % 2 ? "md:order-1" : ""}>
                <h3 className="disp text-2xl font-bold leading-tight md:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--soft)" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
