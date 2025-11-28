# Vercel Deployment Guide

This guide will help you deploy the AI时代汝瓷英语 website to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier available)
2. [Git](https://git-scm.com/) installed on your computer
3. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variable:
     - **Name**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key (from https://platform.openai.com/api-keys)
     - **Environment**: Production, Preview, Development (select all)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   ```
   Enter your OpenAI API key when prompted.

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Configuration Details

### vercel.json

The `vercel.json` file contains the following configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hkg1"],
  "env": {
    "OPENAI_API_KEY": "@openai_api_key"
  }
}
```

**Key settings:**
- **framework**: Automatically detected as Next.js
- **regions**: `hkg1` (Hong Kong) for better performance in Asia
- **env**: Environment variables configuration

### Environment Variables

The following environment variables need to be configured in Vercel:

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for the AI assistant feature | Yes (for AI assistant) |

**To add environment variables in Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Click "Add New"
4. Enter the variable name and value
5. Select which environments to apply (Production, Preview, Development)

## Build Configuration

### Next.js Configuration

The project uses Next.js 15 with the following features:
- **App Router**: Modern routing system
- **Server Components**: Default for better performance
- **Static Generation**: Pre-rendered pages for fast loading
- **API Routes**: Backend endpoints for AI assistant

### Build Output

- **Static Pages**: Homepage, course listings, vocabulary, practice
- **Dynamic Routes**: `/course/[slug]` for individual chapters
- **API Routes**: `/api/assistant` for AI features

## Performance Optimization

Vercel automatically provides:
- ✅ **Global CDN**: Fast content delivery worldwide
- ✅ **Edge Functions**: Low-latency API responses
- ✅ **Image Optimization**: Automatic image optimization
- ✅ **Automatic HTTPS**: SSL certificates included
- ✅ **Compression**: Gzip and Brotli compression

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Click "Add Domain"
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (usually 24-48 hours)

## Continuous Deployment

Once connected to Git:
- **Automatic Deployments**: Every push to `main` branch triggers a production deployment
- **Preview Deployments**: Pull requests get unique preview URLs
- **Instant Rollbacks**: Easy rollback to previous deployments

## Monitoring and Analytics

Vercel provides built-in analytics:
- **Web Vitals**: Core Web Vitals monitoring
- **Traffic**: Page views and unique visitors
- **Performance**: Load times and response times

Access analytics in your Vercel dashboard under "Analytics".

## Troubleshooting

### Build Fails

**Issue**: Build fails with module errors
**Solution**: 
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Issue**: API features not working in production
**Solution**: 
- Verify environment variables are set in Vercel dashboard
- Redeploy the project after adding variables
- Check variable names match exactly (case-sensitive)

### 404 Errors on Dynamic Routes

**Issue**: `/course/[slug]` returns 404
**Solution**:
- Ensure markdown files exist in `content/chapters/`
- Check `generateStaticParams()` is implemented correctly
- Verify file names match the slug format

### Slow Build Times

**Issue**: Build takes too long
**Solution**:
- Vercel free tier has 6000 build minutes/month
- Optimize images and reduce bundle size
- Consider upgrading to Pro plan for faster builds

## Deployment Checklist

Before deploying, ensure:

- [ ] All dependencies are listed in `package.json`
- [ ] Environment variables are documented
- [ ] `.gitignore` excludes sensitive files
- [ ] Build succeeds locally (`npm run build`)
- [ ] Content files are in the correct directory
- [ ] API keys are not committed to Git
- [ ] README is up to date

## Post-Deployment

After successful deployment:

1. **Test all features**:
   - Homepage loads correctly
   - Course pages display content
   - AI assistant works (if API key configured)
   - Navigation works smoothly

2. **Monitor performance**:
   - Check Vercel Analytics
   - Review Core Web Vitals
   - Test on different devices

3. **Share your site**:
   - Your site is live at `https://your-project.vercel.app`
   - Share the URL with users
   - Consider custom domain for branding

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions

## Cost Estimation

**Free Tier Includes**:
- Unlimited deployments
- 100 GB bandwidth/month
- 6000 build minutes/month
- Automatic HTTPS
- Preview deployments

**Pro Tier** ($20/month):
- 1 TB bandwidth
- Faster builds
- Advanced analytics
- Team collaboration

For this project, the **free tier is sufficient** for development and moderate traffic.

---

**Ready to deploy?** Follow the steps above and your site will be live in minutes! 🚀
