import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Chat from "./components/Chat.jsx";
import Loader from "./components/Loader.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Feedback from "./pages/Feedback.jsx";

const PAGES = { about: About, projects: Projects, services: Services, contact: Contact, feedback: Feedback };

export default function App() {
  const initial = window.location.hash.slice(1);
  const [view, setView] = useState(initial in PAGES ? initial : "home");
  const [ready, setReady] = useState(false);

  const go = (v) => {
    setView(v);
    try { history.replaceState(null, "", v === "home" ? "#" : "#" + v); } catch (e) {}
    window.scrollTo(0, 0);
  };

  const Current = PAGES[view];

  return (
    <div className="relative min-h-screen">
      <Background />
      <AnimatePresence>{!ready && <Loader key="loader" onDone={() => setReady(true)} />}</AnimatePresence>
      {ready && (
        <>
          <AnimatePresence>{view !== "home" && <Navbar key="nav" view={view} go={go} />}</AnimatePresence>
          <AnimatePresence mode="wait">
            {view === "home" ? <Home key="home" go={go} /> : <Current key={view} go={go} />}
          </AnimatePresence>
          <Chat />
        </>
      )}
    </div>
  );
}
