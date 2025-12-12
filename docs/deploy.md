# Deployment Guide - LuxArch

This guide covers deployment options for the LuxArch portfolio application.

## Vercel Deployment (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub/GitLab/Bitbucket repository connected to Vercel

### Step-by-Step Deployment

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   
   In Vercel Dashboard → Settings → Environment Variables, add:

   **Supabase** (Required for database features):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

   **Image APIs** (Optional):
   ```
   UNSPLASH_ACCESS_KEY=your_unsplash_key
   PEXELS_API_KEY=your_pexels_key
   ```

   **Email Service** (Optional):
   ```
   EMAIL_API_KEY=your_email_api_key
   EMAIL_FROM=noreply@luxarch.com
   EMAIL_TO=contact@luxarch.com
   ```

   **Site Configuration**:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```
   Or push to your main branch for automatic deployment.

5. **Configure Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Vercel Configuration

The project includes optimal Vercel settings in `next.config.js`:
- Image optimization enabled
- Remote image patterns configured for Unsplash/Pexels/Supabase
- SWC minification enabled
- Compression enabled

### Additional Vercel Optimizations

**Edge Config** (Optional for faster reads):
```bash
vercel env pull .env.local
vercel edge-config create luxarch-config
```

**Analytics**:
- Enable Vercel Analytics in dashboard for performance monitoring
- Enable Web Vitals tracking

**Security Headers** (Optional - add to `next.config.js`):
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ];
}
```

## Netlify Deployment

### Prerequisites
- A Netlify account
- GitHub/GitLab repository

### Steps

1. **Create `netlify.toml`** in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"

   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Deploy**
   - Connect repository in Netlify dashboard
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables (same as Vercel)

3. **Install Next.js plugin**
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```

## Self-Hosted Deployment

### Docker Deployment

1. **Create `Dockerfile`**:
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   EXPOSE 3000
   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Update `next.config.js`**:
   ```javascript
   module.exports = {
     // ... existing config
     output: 'standalone',
   };
   ```

3. **Build and run**:
   ```bash
   docker build -t luxarch .
   docker run -p 3000:3000 luxarch
   ```

### Traditional Node.js Server

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "luxarch" -- start
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx reverse proxy**:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## Supabase Setup

1. **Create Supabase project** at [supabase.com](https://supabase.com)

2. **Run migrations**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login
   supabase login

   # Link project
   supabase link --project-ref your-project-ref

   # Push migrations
   supabase db push
   ```

3. **Get API keys** from Project Settings → API

4. **Configure Row Level Security** (already included in migration)

5. **Optional: Set up Storage** for user-uploaded images:
   ```sql
   -- Create storage bucket
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('project-images', 'project-images', true);
   ```

## Image Optimization

### Cloudinary Integration (Optional)

For better image performance, consider Cloudinary:

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Update `next.config.js`:
   ```javascript
   images: {
     loader: 'cloudinary',
     path: 'https://res.cloudinary.com/your-cloud-name/image/upload/',
   }
   ```

### Image CDN Configuration

For self-hosted deployments, configure CDN:
- CloudFlare Images
- AWS CloudFront
- Fastly

## Performance Monitoring

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
2. **Google Lighthouse** - Run audits regularly
3. **Sentry** - Error tracking
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

## Security Checklist

- [ ] Environment variables secured (not committed to Git)
- [ ] Supabase RLS policies enabled
- [ ] CORS configured properly
- [ ] Rate limiting on contact form
- [ ] Content Security Policy headers
- [ ] HTTPS/SSL certificate configured
- [ ] Database backup strategy in place

## Post-Deployment

1. **Test all functionality**:
   - Contact form submission
   - Project navigation
   - Image loading
   - Mobile responsiveness

2. **Performance audit**:
   ```bash
   npm install -g lighthouse
   lighthouse https://your-domain.com --view
   ```

3. **Set up monitoring**:
   - Uptime monitoring (UptimeRobot, Pingdom)
   - Error tracking (Sentry)
   - Analytics (Google Analytics, Plausible)

4. **Configure sitemap**:
   - Next.js automatically generates sitemap.xml
   - Submit to Google Search Console

## Troubleshooting

### Build Fails

- Check Node version (requires 18+)
- Verify all environment variables are set
- Check TypeScript errors: `npm run typecheck`
- Clear cache: `rm -rf .next node_modules && npm install`

### Images Not Loading

- Verify remote image domains in `next.config.js`
- Check API keys are valid
- Verify Supabase storage bucket permissions

### API Routes Not Working

- Ensure `app/api` directory structure is correct
- Check serverless function logs
- Verify Supabase connection

### Slow Performance

- Enable caching headers
- Optimize images (use WebP/AVIF)
- Enable compression
- Consider CDN for static assets

## Recommended Production Configuration

```javascript
// next.config.js - Production optimizations
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizeCss: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};
```

## Support

For deployment issues:
1. Check Vercel/Netlify logs
2. Review Next.js documentation
3. Check Supabase status page
4. Open an issue on GitHub

---

**Recommended**: Start with Vercel for easiest deployment, then migrate to self-hosted if needed.
