import { useState } from "react";
import { motion } from "framer-motion";
import { NAME, ROLE, SECTIONS } from "../data/config";
import Wheel from "../components/Wheel.jsx";
import Avatar from "../components/Avatar.jsx";
import Socials from "../components/Socials.jsx";

export default function Home({ go }) {
  const [picked, setPicked] = useState(null);
  const pick = (i) => { setPicked(i); setTimeout(() => go(SECTIONS[i].id), 600); };

  return (
    <motion.div className="relative flex min-h-screen flex-col" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <header className="relative z-10 flex items-start justify-between gap-4 p-5 md:p-8">
        <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="serif max-w-[60%] text-xl font-semibold leading-tight md:max-w-none md:text-4xl">
          {NAME}
          <span className="mt-1 block text-xs font-medium md:text-sm" style={{ color: "var(--mute)" }}>{ROLE}</span>
          <span className="mt-3 flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em]" style={{ borderColor: "var(--line)", color: "var(--soft)" }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--amber)" }} />Open to opportunities</span>
        </motion.h1>
        <div className="p-3"><Avatar /></div>
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center pb-24">
        <Wheel onPick={pick} picked={picked} />
      </main>
      <div className="absolute bottom-5 left-5 z-10 hidden max-w-[55%] sm:block"><Socials /></div>
    </motion.div>
  );
}
