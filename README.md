# Portfolio Raihan Maulana

Web portfolio Muhammad Raihan Maulana (Analyst: Fullstack dan IT Audit & Advisory). Dua bahasa, Indonesia (`/id`) dan Inggris (`/en`).

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, token desain di `tokens.css`
- Komponen gaya shadcn yang dikustom: `components/ui/dialog.tsx` (Radix Dialog) dan `components/ui/command.tsx` (cmdk)

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Alamat `/` dialihkan ke `/id` atau `/en` sesuai bahasa browser (`proxy.ts`).

## Mengubah konten

- `content/site.ts`: profil, proyek, pengalaman, keahlian, sertifikasi. Semua isinya bersumber dari CV dan PDF portfolio.
- `content/dictionary.ts`: teks antarmuka per bahasa.
- `public/images/projects/`: tangkapan layar proyek, dua file per proyek (`<slug>-1.webp`, `<slug>-2.webp`).

## Desain

Dibangun dengan skill Hallmark: genre modern-minimal, macrostructure Portfolio Grid, tema Cobalt, nav N13 (command palette, `Ctrl+K` atau `⌘K`), footer Ft2. Warna dan font hanya lewat token di `tokens.css`.
