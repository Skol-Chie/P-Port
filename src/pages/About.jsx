import { motion } from "framer-motion";
import { Shell, Card, IconDownload, IconMail } from "../components/ui.jsx";
import Downloads from "../components/Downloads.jsx";
import Socials from "../components/Socials.jsx";
import { ABOUT_PHOTO, INTERESTS, JOURNEY, CERTIFICATIONS, DOCUMENTS } from "../data/config";

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const NAV = [["story", "Story"], ["journey", "Journey"], ["beyond", "Beyond the code"], ["certs", "Certifications"], ["documents", "Documents"], ["connect", "Connect"]];

const Reveal = ({ children, className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className={className}>
    {children}
  </motion.div>
);

const H = ({ children }) => <h3 className="disp mb-6 text-2xl font-extrabold uppercase tracking-[0.1em] md:text-4xl">{children}</h3>;
const P = ({ children }) => <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#A0A0A5" }}>{children}</p>;

function PhotoFrame() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-10 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,107,0,.4), transparent 65%)" }} />
      <svg viewBox="0 0 320 90" className="absolute -bottom-8 -left-10 z-0 w-[85%]" aria-hidden="true">
        <motion.path d="M6 60 C 70 0, 120 100, 190 50 S 290 20, 314 34" fill="none" stroke="#FF6B00" strokeWidth="16" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1.2 }} />
      </svg>
      <motion.div
        initial={{ rotate: -7, y: 40, opacity: 0 }} animate={{ rotate: -2, y: 0, opacity: 1 }} whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
        className="relative z-10 p-3 pb-14 shadow-2xl" style={{ background: "var(--wall)" }}
      >
        <img src={ABOUT_PHOTO} alt="Portrait of Comfort Chidimma Emmanuel" className="aspect-square w-full object-cover" />
        <p className="disp absolute inset-x-0 bottom-3 text-center text-sm font-bold" style={{ color: "#ffffff" }}>Comfort Chidimma Emmanuel</p>
      </motion.div>
      <motion.svg viewBox="0 0 80 80" className="absolute -right-5 -top-6 z-20 h-24 w-24" animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 18 }} aria-hidden="true">
        <circle cx="40" cy="40" r="35" fill="#0B0B0C" stroke="#C85A17" strokeWidth="3" strokeDasharray="2 5" />
        <circle cx="40" cy="40" r="26" fill="none" stroke="#C85A17" strokeWidth="2" />
        <path transform="translate(22 28)" d="M0 12 Q9 0 18 8 Q27 0 36 12 Q18 26 0 12Z" fill="#FF6B00" />
      </motion.svg>
    </div>
  );
}

export default function About({ go }) {
  const certs = CERTIFICATIONS.filter((c) => !c.placeholder).length;
  return (
    <Shell>
      {/* HERO */}
      <section id="story" className="grid items-center gap-14 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2 text-xs">
            {["Lagos, Nigeria", "IT at Anchor University", "Frontend & UX"].map((c) => (
              <span key={c} className="rounded-full border px-3 py-1" style={{ borderColor: "var(--line)" }}>{c}</span>
            ))}
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--mute)" }}>Frontend developer · UX · IT student</p>
          <h2 className="serif text-6xl leading-[1.02] md:text-8xl">Hi, I’m <em style={{ color: "var(--amber)" }}>Comfort.</em></h2>
          <p className="disp mt-5 text-2xl font-bold md:text-3xl">Building with purpose. <span style={{ color: "var(--violet)" }}>Learning with intention.</span></p>
          <div className="mt-6 space-y-4">
            <P>Hi, I’m Comfort Chidimma Emmanuel, an Information Technology student at Anchor University, Lagos, Nigeria, with a growing interest in frontend development, user experience, and building digital solutions that solve real problems.</P>
            <P>I enjoy the process of turning ideas into something people can actually use — from thinking through how a product should work to designing its interface and bringing it to life with code. For me, technology is more than writing lines of code; it’s about understanding people, identifying problems, and creating thoughtful solutions.</P>
            <P>I’m currently developing my skills in web development, exploring better ways to build responsive and intuitive interfaces, and learning how to approach software development with a balance of creativity, functionality, and usability.</P>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={(DOCUMENTS.find((d) => d.available) || {}).file} download className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-[#0B0B0C]" style={{ background: "var(--amber)" }}><IconDownload /> Download CV</a>
            <button onClick={() => go("contact")} className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold hover:bg-white/10" style={{ borderColor: "var(--line)" }}><IconMail /> Contact me</button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {NAV.map(([id, l]) => (
              <button key={id} onClick={() => jump(id)} className="rounded-full border px-4 py-1.5 text-sm hover:bg-white/10" style={{ borderColor: "var(--violet)" }}>{l}</button>
            ))}
          </div>
        </div>
        <PhotoFrame />
      </section>

      {/* INTERESTS: windowpane check */}
      <Reveal className="mt-28">
        <H>What I’m interested in</H>
        <div className="grid gap-px overflow-hidden rounded-2xl md:grid-cols-2" style={{ background: "rgba(255,107,0,.35)" }}>
          {INTERESTS.map(([t, d]) => (
            <motion.div key={t} whileHover={{ backgroundColor: "rgba(255,107,0,.1)" }} className="p-7" style={{ background: "#161618" }}>
              <h4 className="disp mb-2 text-xl font-bold">{t}</h4>
              <p style={{ color: "var(--mute)" }}>{d}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* JOURNEY */}
      <section id="journey" className="mt-28 scroll-mt-24">
        <H>My journey</H>
        <ol className="relative ml-3 border-l-2 pl-8" style={{ borderColor: "var(--violet)" }}>
          {JOURNEY.map((j, i) => (
            <motion.li key={j.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.62rem] top-1.5 h-4 w-4 rounded-full border-2" style={{ background: i === JOURNEY.length - 1 ? "var(--amber)" : "#0B0B0C", borderColor: "var(--amber)" }} />
              {j.when && <div className="mb-1 text-xs" style={{ color: "var(--violet)" }}>{j.when}</div>}
              <h4 className="disp text-2xl font-bold">{j.title}</h4>
              <p className="mt-2 max-w-2xl" style={{ color: "#A0A0A5" }}>{j.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* BEYOND THE CODE */}
      <Reveal className="mt-28">
        <section id="beyond" className="scroll-mt-24">
          <H>Beyond the code</H>
          <div className="grid items-center gap-8 rounded-3xl border p-6 md:grid-cols-[auto_1fr] md:p-10" style={{ borderColor: "var(--line)", background: "rgba(23,23,26,.82)" }}>
            <motion.div whileHover={{ rotate: -6, scale: 1.05 }} className="disp mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-full px-5 text-center text-[#0B0B0C]" style={{ background: "var(--amber)" }}>
              <span className="text-xs">Commandant</span>
              <span className="my-1 text-lg font-extrabold leading-tight">Nigerian Red Cross Society</span>
              <span className="text-xs">Anchor University Detachment</span>
            </motion.div>
            <div className="space-y-4" style={{ color: "#A0A0A5" }}>
              <p>My interests extend beyond technology. Leadership, organization, communication, and community service have shaped the way I approach responsibilities and work with people.</p>
              <p>As Commandant of the Nigerian Red Cross Society, Anchor University Detachment, I’ve been involved in coordinating activities, supporting recruitment and outreach initiatives, and working with team members toward shared objectives.</p>
              <p>These experiences have taught me that successful projects require more than technical ability. They also require planning, accountability, adaptability, and the willingness to listen and learn from others.</p>
              <p>I bring that same mindset into technology: understand the problem, work with purpose, stay open to feedback, and keep improving.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* BUILDING TOWARD */}
      <Reveal className="mt-28">
        <H>What I’m building toward</H>
        <div className="space-y-4">
          <P>I’m working toward becoming a well-rounded technology professional with a strong foundation in frontend development, user-centered design, and software problem-solving.</P>
          <P>I’m interested in opportunities where I can contribute to meaningful projects, collaborate with experienced people, learn from real-world challenges, and grow into a developer who builds products with both users and purpose in mind.</P>
          <P>I’m not trying to know everything today. I’m focused on becoming better at what I do, one project and one lesson at a time.</P>
        </div>
        <div className="disp mt-12 space-y-1 text-4xl font-extrabold leading-tight md:text-7xl">
          {[["Still learning.", "#ffffff"], ["Still building.", "#FF8A3D"], ["Always growing.", "#FF6B00"]].map(([t, c], i) => (
            <motion.div key={t} initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.25, duration: 0.6 }} style={{ color: c }}>{t}</motion.div>
          ))}
        </div>
      </Reveal>

      {/* CERTIFICATIONS */}
      <section id="certs" className="mt-28 scroll-mt-24">
        <H>Certifications{certs > 0 && <span className="ml-3 text-lg font-medium" style={{ color: "var(--violet)" }}>{certs} earned</span>}</H>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Card key={i} color={c.placeholder ? "#3a3a3f" : "#C85A17"} className={c.placeholder ? "border-dashed" : ""}>
              <h4 className="disp font-bold">{c.title}</h4>
              <p className="text-sm" style={{ color: "var(--mute)" }}>{c.issuer} · {c.year}</p>
              {c.file && <a href={c.file} download className="mt-3 inline-block text-sm underline" style={{ color: "var(--violet)" }}>Download certificate</a>}
            </Card>
          ))}
        </div>
      </section>

      {/* DOCUMENTS */}
      <section id="documents" className="mt-28 scroll-mt-24">
        <H>Download center</H>
        <p className="mb-6 max-w-2xl" style={{ color: "var(--mute)" }}>Everything a recruiter, lecturer or collaborator may need, in one place.</p>
        <Downloads />
      </section>

      {/* CONNECT */}
      <Reveal className="mt-28">
        <section id="connect" className="scroll-mt-24 rounded-3xl p-8 md:p-12" style={{ background: "var(--amber)", color: "#0B0B0C" }}>
          <h3 className="disp text-3xl font-extrabold md:text-6xl">Let’s build something meaningful.</h3>
          <p className="mt-4 max-w-2xl text-lg">If you’re working on an interesting idea, looking for a collaborative team member, or have an opportunity to connect, I’d love to hear from you.</p>
          <div className="mt-6 [&_a]:!border-[#0B0B0C] [&_a]:text-[#0B0B0C] [&_a:hover]:bg-black/10"><Socials big /></div>
        </section>
      </Reveal>
    </Shell>
  );
}
