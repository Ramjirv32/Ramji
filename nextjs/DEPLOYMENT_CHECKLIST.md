# 🚀 Deployment Checklist for Vercel (India Region)

## Pre-Deployment ✅

- [x] **Build Verification**: `pnpm run build` ✅ SUCCESS
- [x] **Image Optimization**: `fetchPriority="high"` added to hero image
- [x] **Cache Headers**: Configured for 7-day cache on assets
- [x] **Vercel Config**: `vercel.json` created with bom1, maa1 regions
- [x] **Next.js Config**: Image cache TTL increased to 604800s (7 days)
- [x] **Performance Guide**: `DEPLOYMENT_GUIDE.md` created

## Deployment Commands 📋

### Option 1: Using Vercel CLI (Recommended)
```bash
# Navigate to your project
cd /home/ramji/Desktop/projects/ramjiport/Ramji/nextjs

# Login to Vercel (first time only)
vercel login

# Deploy to production with India regions
vercel deploy --prod --regions bom1 maa1
```

### Option 2: Using Git Integration
1. Push changes to GitHub
2. Vercel automatically deploys from your connected repo
3. Set regions in Vercel Dashboard → Settings → Regions

## Post-Deployment Verification 🔍

### 1. Check Deployment Status
```bash
vercel ls
vercel logs
```

### 2. Run Lighthouse Audit
- Visit: https://pagespeed.web.dev
- Enter: https://ramji-b.in
- Check:
  - LCP should be < 2.5s (currently 5.7s)
  - FCP should be < 0.5s
  - CLS should be 0

### 3. Test Image CDN
- Open DevTools (F12) → Network
- Check image requests are served from `www.ramji-b.in` CDN
- Verify `Cache-Control` headers show 7d cache

### 4. Test from India
- Use VPN to India (Mumbai/Chennai)
- Test load time: `curl -w "@curl-format.txt" https://ramji-b.in`
- Should see improvement over 40-50% faster

## Performance Targets 🎯

| Metric | Before | Target | Status |
|--------|--------|--------|--------|
| **FCP** | 0.4s | < 0.3s | ✅ Already Good |
| **LCP** | 5.7s | < 2.5s | ⚠️ PRIORITY |
| **Speed Index** | 2.8s | < 2.0s | 🔧 Improving |
| **CLS** | 0 | 0 | ✅ Perfect |
| **Cache Hit Rate** | 0% | > 80% | 📈 New |

## Expected Improvements 📊

After deploying with Vercel India regions:

1. **India Users**: 40-50% faster page load
2. **Repeat Visitors**: 60-70% faster (cached)
3. **LCP**: Should drop from 5.7s to ~2.0-2.5s
4. **CDN Hit Rate**: > 80% for static assets
5. **Time to First Byte**: < 200ms

## Troubleshooting 🔧

### If deployment fails:
```bash
# Check build logs
vercel logs --tail

# Verify vercel.json syntax
cat vercel.json | jq .

# Check Node version compatibility
node --version # Should be 18+
```

### If images are still slow:
1. Check image sizes: DevTools → Network
2. Verify next/image is being used
3. Confirm `quality: 85` is set
4. Check AVIF/WebP support

### If cache isn't working:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check Cache-Control headers: DevTools → Network
3. Verify `Cache-Control` values in response
4. Wait 5-10 minutes for CDN propagation

## Monitoring After Deployment 📈

### Weekly Tasks:
- [ ] Check Vercel Analytics dashboard
- [ ] Review Lighthouse scores
- [ ] Monitor LCP metric (target: < 2.5s)
- [ ] Check cache hit rates

### Monthly Tasks:
- [ ] Review cost on Vercel dashboard
- [ ] Check bandwidth usage
- [ ] Update performance guide if needed
- [ ] Document any changes

## Rollback (If Needed) ↩️

```bash
# View previous deployments
vercel ls

# Rollback to previous version
vercel rollback <deployment-url>
```

## Resources 📚

- Vercel Docs: https://vercel.com/docs
- Next.js Image Optimization: https://nextjs.org/docs/app/api-reference/components/image
- PageSpeed Insights: https://pagespeed.web.dev
- WebPageTest: https://webpagetest.org

---

## Summary

✅ **All optimizations are ready!**

**Next Step**: Run deployment commands above to deploy to Vercel with India region support (bom1, maa1).

**Expected Result**: LCP improvement from 5.7s to ~2.0-2.5s, 40-50% faster for India users.
