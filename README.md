# Portfolio — Abdirahman Mire

Personal portfolio site for **Abdirahman Mire**, implemented from the Figma export (React + Tailwind CSS v4).

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript  
- [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`  
- [Lucide React](https://lucide.dev/) for icons  
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) (loaded in `index.html`)

## Prerequisites

- Node.js 20+ recommended  

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Netlify

The repo includes `netlify.toml`: build runs `npm run build` and **publishes the `dist` folder**. That is required for Vite; if Netlify publishes the repository root instead, the browser loads `/src/main.tsx` and fails (wrong MIME type / not a built bundle).

In the Netlify UI, confirm **Build command** is `npm run build` and **Publish directory** is `dist` (or leave them blank so `netlify.toml` is used). Commit `netlify.toml`, push, and trigger a new deploy.

## Customize

- Replace the brand logo: `public/logo.png`.  
- Update contact details and social links in `src/components/Contact.tsx`.  
- Edit project copy and images in `src/components/Projects.tsx` and `src/components/AllProjects.tsx`.  

## License

Unless otherwise noted, content and code in this repository are provided by Abdirahman Mire. Add a `LICENSE` file when you decide how you want others to use the work.
