import { useState } from "react";
import { motion } from "framer-motion";
import { Shell, IconMail } from "../components/ui.jsx";
import SocialIcons from "../components/SocialIcons.jsx";
import { EMAIL, ABOUT_PHOTO } from "../data/config";

export default function Contact() {
  const EMPTY = { name: "", email: "", msg: "", _honey: "" };
  const [f, setF] = useState(EMPTY);
  const [st, setSt] = useState({ busy: false, ok: "", err: "" });

  const send = async () => {
    if (f._honey) return; // spam trap
    if (!f.name.trim() || !f.email.trim() || !f.msg.trim()) return setSt({ busy: false, ok: "", err: "Please fill in your name, e-mail and message." });
    setSt({ busy: true, ok: "", err: "" });
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: f.name, email: f.email, message: f.msg, _subject: `Portfolio message from ${f.name}`, _replyto: f.email, _template: "table", _captcha: "false" }),
      });
      const j = await r.json();
      if (!r.ok || String(j.success) === "false") throw new Error("send failed");
      setF(EMPTY);
      setSt({ busy: false, ok: "Message sent! I’ll reply to your e-mail soon.", err: "" });
    } catch (e) {
      // fallback: open the visitor's e-mail app, addressed to me
      const body = `${f.msg}\n\nFrom: ${f.name} (${f.email})`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello from " + f.name)}&body=${encodeURIComponent(body)}`;
      setSt({ busy: false, ok: "Opening your e-mail app to send this message…", err: "" });
    }
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <Shell>
      <div className="grid items-start gap-10 md:grid-cols-[5fr_6fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute -inset-8 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,107,0,.35), transparent 65%)" }} />
          <img src={ABOUT_PHOTO} alt="Portrait of Comfort" className="relative aspect-[4/5] w-full rounded-3xl object-cover" style={{ objectPosition: "62% 35%" }} />
        </motion.div>

        <div>
          <h2 className="disp text-5xl font-extrabold leading-none md:text-7xl">Contact Me</h2>
          <div className="mt-8 grid gap-10 border-l-2 border-t-2 p-6 md:grid-cols-[1.4fr_1fr] md:p-10" style={{ borderColor: "rgba(255,255,255,.85)" }}>
            <div className="space-y-3">
              <input className="line-field" placeholder="Full Name" value={f.name} onChange={set("name")} aria-label="Full name" />
              <input className="line-field" type="email" placeholder="E-mail" value={f.email} onChange={set("email")} aria-label="Your e-mail" />
              <textarea className="line-field" rows="2" placeholder="Message" value={f.msg} onChange={set("msg")} aria-label="Message" />
              <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f._honey} onChange={set("_honey")} style={{ position: "absolute", left: "-9999px", opacity: 0 }} />
              <button onClick={send} disabled={st.busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-[#0B0B0C] disabled:opacity-60" style={{ background: "var(--amber)" }}>
                <IconMail /> {st.busy ? "Sending…" : "Send message"}
              </button>
              <div aria-live="polite" className="min-h-[1.25rem] text-sm">
                {st.err && <span style={{ color: "#ff8a80" }}>{st.err}</span>}
                {st.ok && <span style={{ color: "#6ee7a8" }}>{st.ok}</span>}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="text-xl font-semibold">Contact</div>
                <a href={`mailto:${EMAIL}`} className="break-all text-sm underline-offset-4 hover:underline" style={{ color: "var(--soft)" }}>{EMAIL}</a>
              </div>
              <div>
                <div className="text-xl font-semibold">Based in</div>
                <div className="text-sm" style={{ color: "var(--soft)" }}>Lagos, Nigeria</div>
              </div>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
