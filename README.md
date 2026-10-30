# Emmanuel Comfort Chidimma | Portfolio

React + Tailwind CSS + Framer Motion, built with Vite.

## Run it
1. Install Node.js (v18 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:
   npm install
   npm run dev
3. Open the address it prints (usually http://localhost:5173)

To publish: `npm run build` creates a `dist/` folder you can upload to Netlify, Vercel or GitHub Pages.

## Folder guide
- index.html               page shell (HTML)
- src/styles/index.css     all custom CSS (Tailwind + theme colours)
- src/data/config.js       YOUR name, email, photos, projects, services, team
- src/components/          Wheel, Avatar, Navbar, Chat, Background (JavaScript/JSX)
- src/pages/               Home, About, Projects, Services, Contact, Feedback
- public/images/           your profile pictures
- public/videos/           background.mp4 (looping background video)

## Make it yours
- Photos: copy 3-4 pictures into public/images/ and list them in PHOTOS (src/data/config.js)
- Video: save a video as public/videos/background.mp4 (code-rain animation shows if it's missing)
- Email, projects, services, team: edit src/data/config.js

## New in this version
- Intro loader that spells S - K - O - L, then splits open (src/components/Loader.jsx)
- Theme taken from the dress and mural: navy windowpane check, pink lines, mural red
- About page: story, interests, journey timeline, Red Cross leadership, certifications, download center, social links
- Fill in: SOCIALS, CERTIFICATIONS, DOCUMENTS and JOURNEY in src/data/config.js

## Projects come from GitHub
The Projects page loads github.com/Skol-Chie live. To make a project look great, on GitHub add a one-line description, a few topics, and your live site link in the repo's "About" box. To pin favorites, add their repo names to FEATURED in src/data/config.js.

## Contact form
Messages go to skolemmie@gmail.com through FormSubmit (free, no account). The FIRST time anyone sends a message from your live site, FormSubmit emails you an activation link. Click it once and every message after that arrives in your inbox. If sending ever fails, the form falls back to opening the visitor's e-mail app addressed to you.
