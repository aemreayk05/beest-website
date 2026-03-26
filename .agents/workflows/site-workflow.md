---
description: Next.js 14, Spline ve Framer Motion ile "Swiss-Style" (Kirli Beyaz & Neon Mor) SEO uyumlu kreatif ajans sitesi kurulumu. Sticky & Horizontal scroll animasyonlarını içerir.
---

# Project Execution Plan: Clean Light Agency Site

I need you to execute this project step-by-step to ensure high quality.
**IMPORTANT:** Do not generate all code at once. Execute **Step 1**, then PAUSE and wait for my approval to proceed to the next step.

## Step 1: Foundation & Theme Configuration
1.  **Scaffold:** Initialize a new Next.js 14 app (App Router) with TypeScript and Tailwind CSS.
2.  **Install:** Add dependencies: `framer-motion`, `@splinetool/react-spline`, `@studio-freight/lenis`, `clsx`, `tailwind-merge`, `lucide-react`.
3.  **Config (CRITICAL):** Immediately update `tailwind.config.ts` to extend the theme with our strict palette defined in Rules:
    - `dirty-white`: '#F3F3F3'
    - `jet-black`: '#111111'
    - `neon-purple`: '#7F00FF'
    - `soft-purple-shadow`: '0 10px 40px -10px rgba(127, 0, 255, 0.2)'
4.  **Global:** Update `globals.css` to set the body background to `dirty-white` and text to `jet-black`.
5.  **Layout:** Create `components/SmoothScroll.tsx` (using Lenis) and wrap the `children` in `layout.tsx`.

## Step 2: Hero Section (Spline + SEO Overlay)
1.  Create `components/sections/Hero.tsx`.
2.  **Layering:**
    - **Background:** `<Spline />` component covering 100vh. (Use a placeholder URL initially).
    - **Foreground:** An HTML `<h1>` overlay centered on screen.
    - **SEO:** Ensure the text is selectable and readable by bots.
    - **Style:** Large, bold typography in `jet-black`.

## Step 3: Services Section (Sticky Scroll Reveal)
1.  Create `components/sections/Services.tsx` (Height: 300vh container).
2.  **Layout:** Use `position: sticky` logic to keep the content pinned while scrolling.
3.  **Animation:** Use `useScroll` from framer-motion.
    - As the user scrolls, cycle through 4 dummy services.
    - **Active Item:** Text becomes `Jet Black` (scale 1.1) + Left Border `Neon Purple`.
    - **Inactive Item:** Text becomes `Gray-400` (opacity 0.4).

## Step 4: Projects Section (Horizontal Flow)
1.  Create `components/sections/Projects.tsx` (Height: 400vh container).
2.  **Logic:** Transform vertical `scrollYProgress` to horizontal `translateX`.
3.  **Cards:** Create `components/ui/ProjectCard.tsx`.
    - Background: `White` (Pure white cards pop on dirty white bg).
    - **Mobile Constraint:** Use a media query to DISABLE the transform on mobile screens (<768px) and stack cards vertically.

## Step 5: Contact Section (Swiss Minimalist)
1.  Create `components/sections/Contact.tsx`.
2.  **Form Design:**
    - Inputs: Transparent background, `border-b` (bottom border) only.
    - **Interaction:** On focus, the bottom border animates to `neon-purple`.
    - **Accessibility:** Use semantic `<label>` tags.

## Step 6: Final Assembly
1.  Import and stack all sections in `app/page.tsx`.
2.  Verify no hydration errors occur.

**ACTION:** Start with **Step 1** only. Show me the file structure and `tailwind.config.ts` content when done.