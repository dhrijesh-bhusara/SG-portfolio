# SG Architects - Luxury Architecture Portfolio

A production-ready, ultra-minimalist architecture portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## 🎨 Design Philosophy

Create a fully functional, high-end architecture portfolio website with all necessary pages and interactions. The design style must be ultra-minimalist, modern, and premium — similar to luxury interior architecture studios.

### STRUCTURE & LAYOUT

– A fixed dark minimal top navbar with a geometric logo on the left and clean thin-font menu items on the right (Home, Projects, Services, About, Contacts).
– A full-screen hero section with a premium luxury interior background image (automatically fetch high-quality images from Pinterest or available free sources) and apply a subtle dark gradient overlay for readability.
– Typography must use elegant, thin, architectural fonts with generous spacing.
– Use a neutral, luxurious palette: matte black, charcoal grey, soft beige, off-white.
– Layout should feel spacious, calm, and extremely refined with strict grid alignment.

### ANIMATIONS & INTERACTIONS (MANDATORY)

– Smooth fade-in and slide-up animations for text and sections.
– Hover animations on project thumbnails:
  • subtle zoom-in on images
  • title reveal with a clean overlay
– Navbar links should have minimal underline or opacity hover transitions.
– Buttons should have micro-interactions with soft scaling or color shifts.
– Lazy-load images for performance and smooth entrance.

### PROJECTS SECTION

– A clean grid showcasing architectural projects.
– Each card uses auto-fetched high-quality project images from Pinterest or free libraries.
– Hover effect reveals project name, category, and a "View Project" CTA.
– Clicking opens a detailed project page with:
  • high-resolution images
  • floor plans (if available)
  • short description
  • materials used
  • design approach.

### SERVICES SECTION

– Clean, minimal cards describing services like Interior Design, Architecture, Concept Planning, 3D Visualization, Renovation.
– Add elegant icons with hover glow or fade animations.

### ABOUT SECTION

– A hero image of the studio or workspace (AI should fetch).
– Minimal biography text with architectural tone.
– Subtle fade-in stagger animations for text blocks.

### CONTACT SECTION

– Clean form with name, email, message fields.
– Add location map with grayscale UI.
– Minimal success message animation.

### GENERAL REQUIREMENTS

– Every section must be responsive and functional.
– Use smooth scroll, soft easing transitions, and consistent spacing.
– All images must be sourced automatically from Pinterest or available royalty-free libraries.
– Maintain extremely clean, modern, luxury architectural aesthetics.
– Deliver a polished, production-ready website with consistent design language.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- A Supabase account (optional, falls back to mock data)
- Unsplash or Pexels API keys (optional, falls back to curated images)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd luxarch

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env file with your API keys (all optional)
# See Environment Variables section below

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Supabase (Required for database features)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Image APIs (Optional - falls back to curated list)
```
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
PEXELS_API_KEY=your_pexels_api_key
```

### Email Service (Optional - for contact form notifications)
```
EMAIL_API_KEY=your_email_service_api_key
EMAIL_FROM=noreply@luxarch.com
EMAIL_TO=contact@luxarch.com
```

### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://luxarch.com
```

**Note:** All environment variables are optional. The application degrades gracefully:
- Without Supabase: Uses mock data and logs contact submissions to console
- Without image API keys: Uses curated fallback images from Unsplash
- Without email API: Contact submissions are stored in database only (if configured)

## 🏗️ Project Structure

```
luxarch/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with Navbar & Footer
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles & Tailwind
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Project detail page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # Contact form API
│   ├── components/             # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageWrapper.tsx
│   │   └── Animations.tsx
│   ├── lib/                    # Utilities
│   │   ├── types.ts
│   │   ├── supabaseClient.ts
│   │   ├── imageFetcher.ts
│   │   └── seo.ts
│   ├── design/                 # Design tokens
│   │   └── tokens.ts
│   └── data/                   # Sample/mock data
│       ├── sampleProjects.ts
│       └── marketingCopy.ts
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── data/
│   └── seed-projects.json
├── docs/
│   ├── deploy.md
│   └── copilot_prompts.txt
├── .github/
│   └── workflows/
│       └── ci.yml
└── [config files]
```

## 🎨 Design Tokens

Design tokens are centralized in `src/design/tokens.ts` and extended in `tailwind.config.js`:

- **Colors**: Neutral luxury palette (black, charcoal, beige, off-white, accent gold)
- **Typography**: Cormorant Garamond (display) + Inter (body)
- **Spacing**: Consistent vertical rhythm
- **Animations**: Framer Motion variants in `Animations.tsx`

## 🖼️ Image Fetching

Images are automatically fetched from:
1. **Unsplash** (if `UNSPLASH_ACCESS_KEY` provided)
2. **Pexels** (if `PEXELS_API_KEY` provided)
3. **Curated fallback list** (no API key required)

**Pinterest Note**: Pinterest scraping is against their Terms of Service and is NOT implemented. For Pinterest images, manually download and store them in your project or CDN.

Image fetching includes:
- 5-minute in-memory cache
- Lazy loading with blur placeholders
- Intersection observer for entrance animations
- `next/image` optimization

## 🗄️ Database Schema

Run the Supabase migration to set up tables:

```bash
# Using Supabase CLI
supabase db reset
supabase db push
```

Tables created:
- `projects` - Portfolio projects with images and metadata
- `contacts` - Contact form submissions
- `images_cache` - Optional caching for fetched images

See `supabase/migrations/001_initial_schema.sql` for full schema.

## ✅ Testing

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
```

Tests use Vitest + React Testing Library. Example test included in `src/components/ProjectsGrid.test.tsx`.

## 🚢 Deployment

See [docs/deploy.md](docs/deploy.md) for detailed deployment instructions for:
- Vercel (recommended)
- Netlify
- Self-hosted options

### Quick Vercel Deploy

```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard.

## 📝 Development Workflow

See [docs/copilot_prompts.txt](docs/copilot_prompts.txt) for:
- 20 high-impact Copilot prompts
- Conventional commit message templates
- PR template

## 🔒 Accessibility

- Semantic HTML
- ARIA attributes
- Keyboard navigation (arrow keys in carousel)
- Focus visible states
- Alt text for all images
- Color contrast compliance

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ for luxury architecture studios.
