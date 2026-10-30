import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Page } from "../components/ui.jsx";
import { loadGithub } from "../lib/github";
import { GITHUB_USER, FEATURED, HIDE_REPOS } from "../data/config";

const LANG = { JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#a78bfa", Python: "#3572A5", Java: "#b07219", "C++": "#f34b7d", C: "#888888", PHP: "#8892be", Dart: "#00b4ab", Kotlin: "#A97BFF", Shell: "#89e051" };
const color = (l) => LANG[l] || "#FF8A3D";
const pretty = (n) => { const s = n.replace(/[-_]+/g, " "); return s.charAt(0).toUpperCase() + s.slice(1); };
const ago = (t) => {
  const s = (Date.now() - new Date(t).getTime()) / 1000;
  const u = [[31536000, "year"], [2592000, "month"], [86400, "day"], [3600, "hour"]];
  for (const [d, n] of u) if (s >= d) { const v = Math.floor(s / d); return `${v} ${n}${v > 1 ? "s" : ""} ago`; }
  return "recently";
};
const Stat = ({ icon, v }) => <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--mute)" }}>{icon} {v}</span>;

function Skeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => <motion.div key={i} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.1 }} className="h-40 rounded-2xl" style={{ background: "rgba(255,107,0,.12)" }} />)}
    </div>
  );
}

function Repo({ r, i, featured }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 12) * 0.05 }} whileHover={{ y: -5 }}
      className="relative flex flex-col rounded-2xl border p-5 backdrop-blur" style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)", borderTop: `3px solid ${color(r.language)}` }}>
      {featured && <span className="absolute right-4 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Featured</span>}
      <h3 className="disp pr-16 text-lg font-bold leading-snug">{pretty(r.name)}</h3>
      <p className="mt-2 flex-1 text-sm" style={{ color: r.description ? "#A0A0A5" : "var(--mute)" }}>{r.description || "No description yet."}</p>
      {r.topics && r.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">{r.topics.slice(0, 4).map((t) => <span key={t} className="rounded-full px-2 py-0.5 text-[11px]" style={{ background: "rgba(255,107,0,.15)", color: "var(--violet)" }}>{t}</span>)}</div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
        {r.language && <span className="inline-flex items-center gap-1.5 text-xs"><span className="h-2.5 w-2.5 rounded-full" style={{ background: color(r.language) }} />{r.language}</span>}
        <Stat icon="★" v={r.stargazers_count} />
        <Stat icon="⑂" v={r.forks_count} />
        <span className="ml-auto text-xs" style={{ color: "var(--mute)" }}>Updated {ago(r.pushed_at || r.updated_at)}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="rounded-full border px-4 py-1.5 text-sm hover:bg-white/10" style={{ borderColor: "var(--violet)" }}>View code</a>
        {r.homepage && <a href={r.homepage.startsWith("http") ? r.homepage : "https://" + r.homepage} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-1.5 text-sm font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Live demo</a>}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [lang, setLang] = useState("All");
  const [q, setQ] = useState("");
  const [forks, setForks] = useState(false);
  const [sort, setSort] = useState("updated");

  useEffect(() => { loadGithub(GITHUB_USER).then(setData).catch((e) => setErr(e.message)); }, []);

  const repos = useMemo(() => (data ? data.repos.filter((r) => !HIDE_REPOS.includes(r.name) && (forks || !r.fork) && !r.archived) : []), [data, forks]);
  const langs = useMemo(() => ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))], [repos]);
  const shown = useMemo(() => {
    const f = repos.filter((r) => (lang === "All" || r.language === lang) && (r.name + " " + (r.description || "")).toLowerCase().includes(q.toLowerCase()));
    const by = sort === "stars" ? (a, b) => b.stargazers_count - a.stargazers_count : (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at);
    return f.sort((a, b) => (FEATURED.includes(b.name) - FEATURED.includes(a.name)) || by(a, b));
  }, [repos, lang, q, sort]);

  const p = data && data.profile;
  const chip = (on) => ({ borderColor: on ? "var(--amber)" : "var(--line)", background: on ? "rgba(255,107,0,.14)" : "transparent" });

  return (
    <Page title="Projects">
      <p className="-mt-4 mb-8 max-w-2xl text-lg" style={{ color: "#A0A0A5" }}>Real code, pulled live from my GitHub. Whenever I push something new, it shows up here.</p>

      {p && (
        <div className="mb-8 flex flex-wrap items-center gap-5 rounded-3xl border p-5" style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)" }}>
          <img src={p.avatar_url} alt="GitHub profile" className="h-20 w-20 rounded-full border-2 object-cover" style={{ borderColor: "var(--violet)" }} />
          <div className="min-w-0 flex-1">
            <div className="disp text-xl font-extrabold">{p.name || p.login} <span className="text-sm font-normal" style={{ color: "var(--mute)" }}>@{p.login}</span></div>
            {p.bio && <p className="text-sm" style={{ color: "#A0A0A5" }}>{p.bio}</p>}
            <div className="mt-1 text-xs" style={{ color: "var(--mute)" }}>{p.public_repos} public repositories</div>
          </div>
          <a href={p.html_url} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Follow on GitHub</a>
        </div>
      )}

      {data && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <input className="field !w-auto !py-1.5" placeholder="Search projects" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search projects" />
          {langs.map((l) => <button key={l} onClick={() => setLang(l)} className="rounded-full border px-3 py-1" style={chip(lang === l)}>{l}</button>)}
          <button onClick={() => setForks(!forks)} className="rounded-full border px-3 py-1" style={chip(forks)}>{forks ? "Hiding nothing" : "Forks hidden"}</button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort projects" className="ml-auto rounded-full border bg-transparent px-3 py-1" style={{ borderColor: "var(--line)" }}>
            <option value="updated" style={{ color: "#000" }}>Recently updated</option><option value="stars" style={{ color: "#000" }}>Most starred</option>
          </select>
        </div>
      )}

      {!data && !err && <Skeleton />}
      {err && (
        <div className="rounded-3xl border border-dashed p-10 text-center" style={{ borderColor: "var(--line)" }}>
          <p className="disp text-xl font-bold">{err === "rate" ? "GitHub is limiting requests right now." : "Couldn’t load my projects."}</p>
          <p className="mt-2" style={{ color: "var(--mute)" }}>You can still browse everything directly on GitHub.</p>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full px-6 py-2.5 font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}>Open github.com/{GITHUB_USER}</a>
        </div>
      )}
      {data && !shown.length && <p style={{ color: "var(--mute)" }}>No projects match. Try another filter.</p>}
      {data && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shown.map((r, i) => <Repo key={r.id} r={r} i={i} featured={FEATURED.includes(r.name)} />)}</div>}
    </Page>
  );
}
