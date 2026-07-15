# Sarvatah Website — GitHub Pages Deploy

Ye folder plain static site hai (koi build step nahi chahiye) — seedha
GitHub Pages pe upload karke live ho jayega.

## 1. GitHub pe upload

```bash
git init
git add .
git commit -m "Sarvatah website"
git branch -M main
git remote add origin https://github.com/<username>/sarvatah.git
git push -u origin main
```

(GitHub website se bhi "Add file → Upload files" karke sab kuch drag-drop
kar sakte ho — koi terminal zaroori nahi.)

## 2. GitHub Pages on karo

Repo → **Settings → Pages** → Source: `Deploy from a branch` →
Branch: `main`, folder: `/ (root)` → Save.

Kuch minute mein site `https://<username>.github.io/sarvatah/` pe live
ho jayegi.

## 3. Custom domain (GoDaddy) connect karo

⚠️ Is site ke saare pages (`canonical`, `sitemap.xml`, `robots.txt`) SEO
ke liye **`www.sarvatah.in`** ko primary domain maante hain — isliye
`www` hi primary rakhna, `www.sarvatah.in` (apex) nahi. `CNAME` file is
folder mein already `www.sarvatah.in` ke saath hai.

GoDaddy account → **My Products → DNS → Manage** → apne domain
(`www.sarvatah.in`) ke DNS records edit karo:

**Root/apex domain ke liye — 4 A records** (existing A record hata ke ye
4 add karo — apex ko sirf `www` par redirect karne ke liye zaroori hai):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**`www` ke liye — CNAME record:**
```
Type: CNAME
Name: www
Value: <username>.github.io
```

GitHub Pages settings mein custom domain field mein `www.sarvatah.in`
hi daalna (CNAME file se auto-fill ho jayega) — isse GitHub apex
(`www.sarvatah.in`) ko automatically `www.sarvatah.in` par redirect kar
dega.

DNS propagate hone mein 15 min–24 ghante lag sakte hain. Uske baad
GitHub Pages settings mein "Enforce HTTPS" checkbox on kar dena
(certificate ban jaye uske baad).

## 4. Backend URL set karo

`config.js` file kholo aur `API_BASE` ko apne deployed backend URL se
replace karo (backend deploy ke liye `sarvatah-backend/README.md` dekho):

```js
var API_BASE = 'https://sarvatah-api.onrender.com';
```

Isके bina contact form, newsletter, enrollment, aur admin dashboard kaam
nahi karenge — sirf normal pages (home, courses, about, etc.) load
honge.
