import { SOCIALS } from "../data/config";

export default function Socials({ big = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.url} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border transition-colors hover:bg-white/10 ${big ? "px-5 py-2.5 text-base" : "px-3 py-1.5 text-xs"}`}
            style={{ borderColor: s.color }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
