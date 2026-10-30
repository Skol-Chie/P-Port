import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Background from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Chat from "./components/Chat.jsx";
import Loader from "./components/Loader.jsx";
import SEO from "./components/SEO.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Feedback from "./pages/Feedback.jsx";

const PAGES = {
  about: About,
  projects: Projects,
  services: Services,
  contact: Contact,
  feedback: Feedback,
};

const VALID_PATHS = ["/", ...Object.keys(PAGES).map((page) => `/${page}`)];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ready, setReady] = useState(false);

  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const view = currentPath === "/" ? "home" : currentPath.slice(1);

  // Support old bookmarked hash URLs such as /#about.
  useEffect(() => {
    const oldHash = location.hash.slice(1);

    if (
      currentPath === "/" &&
      oldHash &&
      Object.prototype.hasOwnProperty.call(PAGES, oldHash)
    ) {
      navigate(`/${oldHash}`, { replace: true });
    }
  }, [currentPath, location.hash, navigate]);

  // Preserve the existing go("about") interface.
  const go = (page) => {
    if (page === "home") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (Object.prototype.hasOwnProperty.call(PAGES, page)) {
      navigate(`/${page}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll to the top when the route changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPath]);

  const isValidRoute = VALID_PATHS.includes(currentPath);

  return (
  <>
    <SEO />

    <div className="relative min-h-screen">
      <Background />

      <AnimatePresence>
        {!ready && (
          <Loader
            key="loader"
            onDone={() => setReady(true)}
          />
        )}
      </AnimatePresence>

      {ready && (
        <>
          {isValidRoute && view !== "home" && (
            <Navbar view={view} go={go} />
          )}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home go={go} />} />
              <Route path="/about" element={<About go={go} />} />
              <Route path="/projects" element={<Projects go={go} />} />
              <Route path="/services" element={<Services go={go} />} />
              <Route path="/contact" element={<Contact go={go} />} />
              <Route path="/feedback" element={<Feedback go={go} />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <Chat />
        </>
      )}
    </div>
  </>
);
}
