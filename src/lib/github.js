// Loads your public GitHub profile and repositories live (no key needed).
// Results are cached for 10 minutes per visitor to stay within GitHub's free rate limit.
const TTL = 10 * 60 * 1000;

export async function loadGithub(user) {
  const key = "gh_" + user;
  try {
    const c = JSON.parse(sessionStorage.getItem(key) || "null");
    if (c && Date.now() - c.t < TTL) return c.d;
  } catch (e) {}
  const [p, r] = await Promise.all([
    fetch(`https://api.github.com/users/${user}`),
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`),
  ]);
  if (!p.ok || !r.ok) throw new Error(p.status === 403 || r.status === 403 ? "rate" : "fail");
  const d = { profile: await p.json(), repos: await r.json() };
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch (e) {}
  return d;
}
