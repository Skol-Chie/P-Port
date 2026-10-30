import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Page } from "../components/ui.jsx";
import { subscribeReviews, addReview, removeReview, canDelete, MODE } from "../lib/reviews";

const tilt = (id) => { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) % 97; return ((h % 5) - 2) * 0.9; };

const ago = (t) => {
  const s = (Date.now() - new Date(t).getTime()) / 1000;
  if (s < 60) return "just now";
  const u = [[60, "minute"], [3600, "hour"], [86400, "day"], [2592000, "month"], [31536000, "year"]];
  let div = 1, name = "second";
  for (const [d, n] of u) { if (s >= d) { div = d; name = n; } }
  const v = Math.floor(s / div);
  return `${v} ${name}${v > 1 ? "s" : ""} ago`;
};

const STAR = "M12 2l3 7 7 .6-5.3 4.7 1.7 7.2L12 17.8 5.6 21.5l1.7-7.2L2 9.6 9 9z";
const Star = ({ on, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d={STAR} fill={on ? "#FF6B00" : "none"} stroke="#FF6B00" strokeWidth="1.6" strokeLinejoin="round" /></svg>
);
const Stars = ({ value, size }) => (
  <span className="inline-flex gap-0.5" role="img" aria-label={`${Math.round(value * 10) / 10} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => <Star key={n} on={value >= n - 0.25} size={size} />)}
  </span>
);

function RatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const labels = ["", "Needs work", "Okay", "Good", "Great", "Outstanding"];
  return (
    <div>
      <div className="flex gap-1" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button key={n} type="button" role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? "s" : ""}`}
            whileHover={{ scale: 1.25, rotate: 8 }} whileTap={{ scale: 0.9 }} onMouseEnter={() => setHover(n)} onClick={() => onChange(n)}>
            <Star on={(hover || value) >= n} size={34} />
          </motion.button>
        ))}
      </div>
      <div className="mt-1 h-5 text-sm" style={{ color: "var(--violet)" }}>{labels[hover || value]}</div>
    </div>
  );
}

function Note({ r, owner, onDelete }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8, y: 40, rotate: 0 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: tilt(r.id) }}
      exit={{ opacity: 0, scale: 0.8 }} whileHover={{ rotate: 0, y: -6 }} transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="relative mb-7 break-inside-avoid p-5 pt-7 shadow-xl" style={{ background: "var(--wall)", color: "#ffffff" }}>
      <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2" style={{ background: "rgba(255,107,0,.9)" }} aria-hidden="true" />
      <span className="disp absolute right-4 top-2 text-6xl leading-none" style={{ color: "#FF6B00" }} aria-hidden="true">”</span>
      <Stars value={r.rating} />
      <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed">{r.message}</p>
      <div className="mt-4 flex items-end justify-between gap-3 border-t pt-3" style={{ borderColor: "rgba(255,255,255,.15)" }}>
        <div className="min-w-0">
          <div className="disp truncate font-bold">{r.name}</div>
          {r.role && <div className="truncate text-xs opacity-70">{r.role}</div>}
        </div>
        <div className="shrink-0 text-xs opacity-60">{ago(r.createdAt)}</div>
      </div>
      {owner && <button onClick={() => onDelete(r)} aria-label="Delete review" className="absolute bottom-2 left-2 rounded-full px-2 text-xs text-[#0B0B0C]" style={{ background: "#161618" }}>Delete</button>}
    </motion.article>
  );
}

const EMPTY = { name: "", role: "", rating: 0, message: "", site: "" };

export default function Feedback() {
  const [reviews, setReviews] = useState(null);
  const [owner, setOwner] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [f, setF] = useState(EMPTY);
  const [st, setSt] = useState({ busy: false, ok: "", err: "" });

  useEffect(() => { const un = subscribeReviews(setReviews); canDelete().then(setOwner); return un; }, []);

  const list = reviews || [];
  const avg = list.length ? list.reduce((a, r) => a + r.rating, 0) / list.length : 0;
  const shown = list
    .filter((r) => (filter === "all" ? true : filter === "5" ? r.rating === 5 : r.rating >= 4))
    .sort((a, b) => sort === "high" ? b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt) : sort === "old" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));

  const submit = async () => {
    if (f.site) return; // honeypot: bots fill this hidden field
    const name = f.name.trim(), message = f.message.trim();
    if (!name) return setSt({ busy: false, ok: "", err: "Please add your name." });
    if (!f.rating) return setSt({ busy: false, ok: "", err: "Please choose a star rating." });
    if (message.length < 10) return setSt({ busy: false, ok: "", err: "Please write at least 10 characters." });
    try { if (Date.now() - Number(localStorage.getItem("rv_last") || 0) < 30000) return setSt({ busy: false, ok: "", err: "Please wait a few seconds before posting again." }); } catch (e) {}
    setSt({ busy: true, ok: "", err: "" });
    try {
      await addReview({ name: name.slice(0, 40), role: f.role.trim().slice(0, 60), rating: f.rating, message: message.slice(0, 500) });
      try { localStorage.setItem("rv_last", String(Date.now())); } catch (e) {}
      setF(EMPTY); setSt({ busy: false, ok: "Thank you! Your review is now on the wall.", err: "" });
    } catch (e) {
      setSt({ busy: false, ok: "", err: "Couldn’t post your review. Check your connection and try again." });
    }
  };

  const del = async (r) => {
    if (!window.confirm(`Delete the review by ${r.name}?`)) return;
    try { await removeReview(r.id); } catch (e) { window.alert("Couldn’t delete that review."); }
  };

  const chip = (active) => ({ borderColor: active ? "var(--amber)" : "var(--line)", background: active ? "rgba(255,107,0,.14)" : "transparent" });

  return (
    <Page title="Feedback & Reviews">
      <p className="-mt-4 mb-8 max-w-2xl text-lg" style={{ color: "#A0A0A5" }}>Kind words, honest notes and ideas from people I’ve worked with or learned alongside. Leave yours: it stays on the wall.</p>

      {MODE === "local" && <div className="mb-6 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--amber)", background: "rgba(255,107,0,.1)" }}>Demo mode: reviews are saved only in this browser. Follow REVIEWS-SETUP.md to make them public and permanent.</div>}

      <div className="grid gap-10 lg:grid-cols-[22rem_1fr]">
        {/* FORM */}
        <div className="self-start rounded-3xl border p-6 lg:sticky lg:top-24" style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)" }}>
          <h3 className="disp mb-4 text-2xl font-extrabold">Leave a review</h3>
          <div className="space-y-3">
            <input className="field" placeholder="Your name" maxLength={40} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-label="Your name" />
            <input className="field" placeholder="Who you are (optional): lecturer, teammate…" maxLength={60} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} aria-label="Your role" />
            <RatingInput value={f.rating} onChange={(n) => setF({ ...f, rating: n })} />
            <textarea className="field" rows="5" maxLength={500} placeholder="What was it like working with me, or what did you think of this portfolio?" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-label="Your review" />
            <div className="text-right text-xs" style={{ color: "var(--mute)" }}>{f.message.length}/500</div>
            <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.site} onChange={(e) => setF({ ...f, site: e.target.value })} style={{ position: "absolute", left: "-9999px", opacity: 0 }} />
            <button onClick={submit} disabled={st.busy} className="w-full rounded-full py-3 font-semibold text-[#0B0B0C] disabled:opacity-60" style={{ background: "var(--amber)" }}>{st.busy ? "Posting…" : "Post my review"}</button>
            <div aria-live="polite" className="min-h-[1.25rem] text-sm">
              {st.err && <span style={{ color: "#ff8a80" }}>{st.err}</span>}
              {st.ok && <span style={{ color: "#6ee7a8" }}>{st.ok}</span>}
            </div>
          </div>
        </div>

        {/* WALL */}
        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="disp text-6xl font-extrabold leading-none">{list.length ? avg.toFixed(1) : "–"}</div>
              <div>
                <Stars value={avg} size={22} />
                <div className="mt-1 text-sm" style={{ color: "var(--mute)" }}>{list.length} review{list.length === 1 ? "" : "s"} on the wall</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {[["all", "All"], ["4", "4★ & up"], ["5", "5★"]].map(([k, l]) => <button key={k} onClick={() => setFilter(k)} className="rounded-full border px-3 py-1" style={chip(filter === k)}>{l}</button>)}
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort reviews" className="rounded-full border bg-transparent px-3 py-1" style={{ borderColor: "var(--line)" }}>
                <option value="new" style={{ color: "#000" }}>Newest</option><option value="old" style={{ color: "#000" }}>Oldest</option><option value="high" style={{ color: "#000" }}>Highest rated</option>
              </select>
            </div>
          </div>

          {reviews === null ? (
            <p style={{ color: "var(--mute)" }}>Loading the wall…</p>
          ) : !shown.length ? (
            <div className="rounded-3xl border border-dashed p-12 text-center" style={{ borderColor: "var(--line)" }}>
              <svg viewBox="0 0 80 80" className="mx-auto mb-4 h-20 w-20" aria-hidden="true"><circle cx="40" cy="40" r="35" fill="none" stroke="#C85A17" strokeWidth="3" strokeDasharray="2 5" /><path transform="translate(22 28)" d="M0 12 Q9 0 18 8 Q27 0 36 12 Q18 26 0 12Z" fill="#FF6B00" /></svg>
              <p className="disp text-xl font-bold">{list.length ? "No reviews match this filter." : "The wall is empty. Be the first to leave a review."}</p>
            </div>
          ) : (
            <div className="columns-1 gap-7 md:columns-2">
              <AnimatePresence>{shown.map((r) => <Note key={r.id} r={r} owner={owner} onDelete={del} />)}</AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
