
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://chidimma-three.vercel.app";

const PAGE_META = {
  "/": {
    title: "Emmanuel Comfort Chidimma | Frontend Developer",
    description:
      "Meet Emmanuel Comfort Chidimma, a Frontend Developer, Certified Software Developer and Information Technology student. Explore projects, skills and professional experience.",
  },
  "/about": {
    title: "About Emmanuel Comfort Chidimma | Developer",
    description:
      "Learn about Emmanuel Comfort Chidimma, his software development journey, education, certification, interests and experience.",
  },
  "/projects": {
    title: "Projects | Emmanuel Comfort Chidimma",
    description:
      "Explore software development projects by Emmanuel Comfort Chidimma, including frontend applications, collaborative projects and practical technology solutions.",
  },
  "/services": {
    title: "Services | Emmanuel Comfort Chidimma",
    description:
      "Explore frontend development, responsive web design, UI/UX thinking and collaborative technology services by Emmanuel Comfort Chidimma.",
  },
  "/contact": {
    title: "Contact Emmanuel Comfort Chidimma | Developer",
    description:
      "Get in touch with Emmanuel Comfort Chidimma for frontend development opportunities, collaborations and technology projects.",
  },
  "/feedback": {
    title: "Feedback | Emmanuel Comfort Chidimma",
    description:
      "Share feedback about Emmanuel Comfort Chidimma's portfolio and projects.",
  },
};

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/+$/, "") || "/";
    const meta = PAGE_META[pathname] || PAGE_META["/"];

    const canonicalUrl = `${SITE_URL}${pathname}`;

    document.title = meta.title;

    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;
  }, [location.pathname]);

  return null;
}
