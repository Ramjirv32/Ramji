# 🚀 Admin Dashboard Setup Instructions

## ✅ Backend Setup (Already Running)

Your backend is running at: `http://localhost:9000`

**Admin Credentials:**
- Email: `ramjib2311@gmail.com`
- Password: `Vikas@23112005`

---

## 🔧 Frontend Setup (MUST DO NOW)

### Step 1: Stop Your Next.js Server
Press `Ctrl + C` in the terminal where Next.js is running

### Step 2: Verify Environment Variables
Check that `/n/.env` contains:
```
NEXT_PUBLIC_API_URL=http://localhost:9000
```

### Step 3: Restart Next.js Server
```bash
cd /home/ramji/Desktop/projects/ramjiport/Ramji/n
npm run dev
```

OR if using pnpm:
```bash
cd /home/ramji/Desktop/projects/ramjiport/Ramji/n
pnpm dev
```

---

## 🎯 Why This Fixes The Error

The error you're seeing:
```
GET https://ramji-etht.vercel.app/api/admin/projects 404 (Not Found)
```

This happens because:
1. Next.js only reads `.env` files when the server **starts**
2. You added `NEXT_PUBLIC_API_URL` but didn't restart the server
3. Without restart, it's using the old/cached Vercel URL

After restart, it will use: `http://localhost:9000` ✅

---

## 📍 Files Using API_URL

All these components are already configured to use `NEXT_PUBLIC_API_URL`:

✅ `app/components/AdminDashboard.tsx`
✅ `app/components/AdminLogin.tsx`  
✅ `app/components/Navbar.tsx`

They all have:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
```

---

## 🧪 Test After Restart

1. Go to: `http://localhost:3000/admin`
2. Login with admin credentials
3. Dashboard should load projects from `localhost:9000` ✅

---

## 📦 What's Already Done

✅ Backend server running on port 9000
✅ Admin routes created (`/api/admin/projects`, `/api/admin/contacts`, etc.)
✅ Frontend components using environment variable
✅ `.env` file updated with correct API URL
✅ Admin authentication with login modal
✅ CRUD operations ready

**Just restart your Next.js dev server and it will work!** 🎉
