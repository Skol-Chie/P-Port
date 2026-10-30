import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHOTOS } from "../data/config";

export default function Avatar({ small }) {
  const [photos, setPhotos] = useState(PHOTOS);
  const [i, setI] = useState(0);
  const file = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % photos.length), 3000);
    return () => clearInterval(t);
  }, [photos.length]);

  const onUpload = (e) => {
    const files = [...e.target.files].slice(0, 4);
    Promise.all(
      files.map((f) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); }))
    ).then((urls) => { if (urls.length) { setPhotos(urls); setI(0); } });
  };

  const size = small ? "h-16 w-16" : "h-24 w-24 md:h-28 md:w-28";

  return (
    <button onClick={() => file.current.click()} title="Click to preview your own photos" aria-label="Profile pictures" className={`relative ${size} shrink-0 rounded-full`}>
      <motion.span className="absolute -inset-2 rounded-full border-2 border-dashed" style={{ borderColor: "var(--violet)" }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 8 }} />
      <motion.span className="absolute -inset-3.5 rounded-full border" style={{ borderColor: "var(--amber)", borderTopColor: "transparent", borderLeftColor: "transparent" }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, ease: "linear", duration: 12 }} />
      <span className="absolute inset-0 overflow-hidden rounded-full" style={{ background: "#17171a" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={i}
            src={photos[i]}
            alt="Portrait of Comfort"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, rotate: -40, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.7 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
      </span>
      <input ref={file} type="file" accept="image/*" multiple hidden onChange={onUpload} />
    </button>
  );
}
