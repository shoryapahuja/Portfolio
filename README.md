# Shorya Pahuja - Portfolio Website

A modern, polished personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Designed for an Electrical & Computer Engineering student seeking internships in ECE, software, and manufacturing.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Smooth Animations**: Framer Motion animations for engaging interactions
- **Responsive Design**: Mobile-first, works seamlessly on all devices
- **Accessible**: Proper ARIA labels, keyboard navigation, focus states
- **SEO Optimized**: Metadata, OpenGraph tags, semantic HTML
- **Performance**: Optimized images, fast loading, Lighthouse-friendly
- **Active Section Highlighting**: Navbar highlights current section on scroll
- **Contact Form**: Frontend validation with success messaging

## 📋 Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd Site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Editing Content

All content is stored in a single source of truth: `src/data/profile.ts`. Edit this file to update:

- Personal information (name, school, location, etc.)
- Hero section text
- About section paragraphs
- Experience entries
- Projects
- Skills
- Contact information (email, LinkedIn)
- Value cards

### Example: Updating Email

```typescript
// In src/data/profile.ts
email: "mailto:your.actual.email@example.com",
linkedin: "https://linkedin.com/in/your-actual-profile",
```

### Example: Adding a New Project

```typescript
// In src/data/profile.ts, add to the projects array:
{
  title: "Your Project Title",
  period: "Jan 2024 – May 2024",
  overview: "Brief description of the project",
  bullets: [
    "Key accomplishment 1",
    "Key accomplishment 2",
  ],
  tech: ["Technology 1", "Technology 2"],
  image: "/projects/your-project-image.jpg",
  achievement: "Optional achievement or award",
}
```

## 🖼️ Adding Project Images

1. **Add your images** to the `public/projects/` directory:
   - `3d-printer-enclosure.jpg` (or .png, .webp)
   - `sad-lamp-diffuser.jpg` (or .png, .webp)

2. **Update image paths** in `src/data/profile.ts` if your filenames differ:
   ```typescript
   image: "/projects/your-image-name.jpg",
   ```

3. **Image recommendations:**
   - Recommended size: 800x600px or 16:9 aspect ratio
   - Format: JPG, PNG, or WebP
   - Optimize images before adding (use tools like ImageOptim or Squoosh)

**Note**: If images are missing, the site will display a gradient placeholder with the project title.

## 📄 Adding Resume

1. **Replace the placeholder** at `public/resume.pdf` with your actual resume PDF
2. The "Download Resume" button will automatically link to it

## 🎨 Customization

### Colors & Theme

Colors are defined in `src/app/globals.css` using CSS variables:
- `--accent`: Primary accent color (blue by default)
- `--background`: Background color
- `--foreground`: Text color
- `--muted`: Muted background color
- `--border`: Border color

### Typography

The site uses Inter font (from Google Fonts). To change:
1. Update the import in `src/app/layout.tsx`
2. Modify font classes in Tailwind config if needed

### Animations

Animation timings and effects can be adjusted in component files:
- Hero: `src/components/Hero.tsx`
- Section reveals: All section components use Framer Motion's `useInView`

## 🏗️ Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build in the `.next` folder.

## 🚢 Deploying to Vercel

This site is optimized for Vercel deployment:

1. **Push your code** to GitHub, GitLab, or Bitbucket

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Deploy:**
   - Click "Deploy"
   - Your site will be live in minutes!

4. **Optional - Custom Domain:**
   - Add your domain in Vercel project settings
   - Update DNS records as instructed

## 🌐 Deploying to GitHub Pages (Static Export)

This repo can also deploy to **GitHub Pages** via **GitHub Actions**.

### One-time GitHub setup

1. Push this project to a GitHub repo (recommended branch name: `main`)
2. In your repo: **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**

### How it works

- On pushes to `main`, the workflow at `.github/workflows/pages.yml` runs.
- It builds a **static export** into the `out/` folder and deploys that to Pages.
- `next.config.mjs` automatically switches to static export mode on GitHub Actions and sets the correct `basePath` for your repository.

### Notes / limitations

- GitHub Pages is **static-only**. This portfolio is already static, so it’s a good fit.
- `next/image` optimization is disabled for GitHub Pages (required for static export).

### Environment Variables

No environment variables are required for basic deployment. If you add features like contact form backend or analytics, configure them in Vercel's project settings.

## 📱 Responsive Breakpoints

- Mobile: Default (< 768px)
- Tablet: `md:` prefix (≥ 768px)
- Desktop: `lg:` prefix (≥ 1024px)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📂 Project Structure

```
Site/
├── public/
│   ├── projects/          # Project images go here
│   └── resume.pdf         # Your resume PDF
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles and CSS variables
│   │   ├── layout.tsx     # Root layout with metadata
│   │   └── page.tsx       # Main page (single-page layout)
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── ThemeProvider.tsx
│   └── data/
│       └── profile.ts     # ⭐ Edit this file to update content
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🐛 Troubleshooting

### Images not loading
- Ensure images are in `public/projects/`
- Check file paths match those in `profile.ts`
- Verify image file extensions match (case-sensitive)

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next` then rebuild
- Check TypeScript errors: `npx tsc --noEmit`

### Theme toggle not working
- Clear browser localStorage and reload
- Check browser console for errors

## 📚 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Next/Image**: Optimized image component
- **Next/Link**: Client-side navigation

## 📄 License

Personal portfolio project - feel free to use as a template for your own portfolio!

## 👤 Author

**Shorya Pahuja**
- Electrical & Computer Engineering Student at Western University
- Expected Graduation: April 2028
- Location: Ontario, Canada

---

**Need help?** Check the Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
