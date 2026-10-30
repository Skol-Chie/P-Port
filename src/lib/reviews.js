// Reviews data layer.
// - With Supabase keys in .env  -> reviews are public, shared and permanent.
// - Without keys               -> demo mode: saved only in this browser.
const URL_ = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const MODE = URL_ && KEY ? "cloud" : "local";

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const LS = "portfolio_reviews_v1";

const fromRow = (r) => ({ id: r.id, name: r.name, role: r.role || "", rating: r.rating, message: r.message, createdAt: r.created_at });
const localList = () => { try { return JSON.parse(localStorage.getItem(LS) || "[]"); } catch (e) { return []; } };

async function list() {
  if (MODE === "local") return localList();
  const r = await fetch(`${URL_}/rest/v1/reviews?select=*&order=created_at.desc&limit=500`, { headers });
  if (!r.ok) throw new Error("load failed");
  return (await r.json()).map(fromRow);
}

const listeners = new Set();
let current = [];
let timer = null;

async function refresh() {
  try { current = await list(); } catch (e) { /* keep what we have */ }
  listeners.forEach((l) => l(current));
}

export function subscribeReviews(cb) {
  listeners.add(cb);
  cb(current.length ? current : null);
  refresh();
  if (!timer) timer = setInterval(refresh, 30000);
  return () => {
    listeners.delete(cb);
    if (!listeners.size) { clearInterval(timer); timer = null; }
  };
}

export async function addReview(v) {
  if (MODE === "local") {
    const item = { id: "l" + Date.now(), ...v, createdAt: new Date().toISOString() };
    localStorage.setItem(LS, JSON.stringify([item, ...localList()]));
  } else {
    const r = await fetch(`${URL_}/rest/v1/reviews`, { method: "POST", headers: { ...headers, Prefer: "return=minimal" }, body: JSON.stringify(v) });
    if (!r.ok) throw new Error("save failed");
  }
  await refresh();
}

// Visitors can never delete. You delete from the Supabase dashboard (see REVIEWS-SETUP.md).
export async function canDelete() { return false; }
export async function removeReview() { throw new Error("not allowed"); }
