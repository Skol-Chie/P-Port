import { useEffect, useRef, useState } from "react";
import { VIDEO_SRC } from "../data/config";

function CodeRain() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    const glyphs = "{}[]()<>=/;:+*#$01const let fn => async await return import".split("");
    const size = 16;
    let w, h, cols, drops, raf, last = 0;
    const resize = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      cols = Math.ceil(w / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    addEventListener("resize", resize);
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 60) return;
      last = t;
      x.fillStyle = "rgba(11,11,12,.16)"; x.fillRect(0, 0, w, h);
      x.font = size + "px monospace";
      for (let i = 0; i < cols; i++) {
        x.fillStyle = Math.random() > 0.96 ? "#FF6B00" : "#C85A17";
        x.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, drops[i] * size);
        if (drops[i] * size > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="h-full w-full" />;
}

export default function Background() {
  const [videoOk, setVideoOk] = useState(true);
  return (
    <div className="pointer-events-none fixed inset-0" aria-hidden="true">
      {videoOk ? (
        <video src={VIDEO_SRC} autoPlay loop muted playsInline onError={() => setVideoOk(false)} className="h-full w-full object-cover" />
      ) : (
        <CodeRain />
      )}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 45% at 85% 8%, rgba(255,107,0,.28), transparent 70%), radial-gradient(45% 40% at 8% 95%, rgba(200,90,23,.2), transparent 70%), radial-gradient(ellipse at center, rgba(11,11,12,.72) 0%, rgba(11,11,12,.95) 80%)" }} />
    </div>
  );
}
