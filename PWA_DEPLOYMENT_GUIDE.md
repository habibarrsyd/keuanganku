# 📱 PWA Deployment Guide

Personal Finance Tracker sekarang adalah Progressive Web App yang bisa di-install di HP! 

## ✨ Fitur PWA

- ✅ Installable di Android & iOS
- ✅ Works offline (dengan service worker)
- ✅ Push notifications support
- ✅ Responsive design untuk semua ukuran layar
- ✅ Fast loading time dengan caching

## 🚀 Deployment ke Vercel

### 1. Setup Vercel Account
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login
```

### 2. Deploy ke Vercel
```bash
# Deploy dengan environment variables
vercel --prod --env DATABASE_URL=your_neon_database_url
```

Atau jika sudah login:
```bash
vercel
```

### 3. Set Environment Variables di Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `DATABASE_URL=postgresql://...`
5. Redeploy

## 📱 Install ke HP (Android)

### Chrome / Android Default Browser
1. Buka: `https://your-domain.vercel.app`
2. Tap menu (⋮) → "Install app" atau "Add to home screen"
3. Tap "Install"
4. Aplikasi akan muncul di home screen

### Cara Lain
1. Buka Settings → Apps
2. Tap "Chrome" → "Advanced" → "Install apps"
3. Cari aplikasi Anda

## 📱 Install ke HP (iOS 16+)

1. Buka Safari
2. Tap Share button → "Add to Home Screen"
3. Tap "Add"
4. Aplikasi akan muncul di home screen

## 🔧 Development

### Local Development
```bash
npm run dev
# Navigate to http://localhost:3000
```

### Build untuk Production
```bash
npm run build
npm start
```

### Generate Icons (jika perlu update)
```bash
npm run generate-icons
npm run generate-favicon
```

## 📋 Checklist Deployment

- [ ] DATABASE_URL sudah diset di Vercel
- [ ] manifest.json accessible di /manifest.json
- [ ] Icons ada di /public (icon-192x192.png, icon-512x512.png)
- [ ] Service worker registered
- [ ] HTTPS enabled (Vercel otomatis)
- [ ] Domain sudah dipilih (custom atau vercel.app)

## 🌐 Domain Custom (Optional)

1. Beli domain di: Namecheap, GoDaddy, atau registrar lain
2. Di Vercel Dashboard → Settings → Domains
3. Add custom domain
4. Follow DNS configuration instructions
5. Wait 24-48 jam untuk propagate

## 🔒 Security Headers

Sudah dikonfigurasi di vercel.json:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 🚨 Troubleshooting

### App tidak bisa di-install?
- Check: manifest.json valid (tidak ada error di DevTools)
- Check: Icons ada (icon-192x192.png, icon-512x512.png)
- Check: HTTPS enabled
- Clear cache browser & coba lagi

### Data tidak tersimpan offline?
- Service worker perlu di-register
- Check: Network tab di DevTools → offline mode
- Cache strategy: Online-first untuk API calls

### Database connection timeout?
- Check DATABASE_URL benar
- Check connection pool config di src/lib/db.ts
- Verify Neon database aktif

## 📊 Performance Tips

1. Minimize API calls
2. Use caching strategically
3. Lazy load components
4. Optimize images
5. Monitor Lighthouse scores

## 🎯 Next Steps

1. Deploy ke Vercel
2. Install ke HP
3. Test semua fitur offline
4. Share dengan teman/keluarga!

## 📞 Support

Jika ada issue:
- Check browser DevTools Console
- Check Network tab untuk API errors
- Check Vercel deployment logs
