import type { Locale } from "@/lib/i18n";

const id = {
  meta: {
    title: "Raihan Maulana · Analyst, Fullstack dan IT Audit & Advisory",
    description:
      "Portfolio Muhammad Raihan Maulana: analyst dengan pengalaman IT audit dan advisory di perbankan serta pengembangan sistem dengan SAP ABAP dan Laravel.",
  },
  nav: {
    work: "Karya",
    experience: "Pengalaman",
    skills: "Keahlian",
    contact: "Kontak",
    search: "Cari proyek atau bagian",
    searchShort: "Cari",
    email: "Email",
    language: "Bahasa",
    skip: "Langsung ke konten",
  },
  intro: {
    sendEmail: "Kirim email",
    now: "Saat ini",
    based: "Lokasi",
    studied: "Pendidikan",
    portraitAlt: "Foto Muhammad Raihan Maulana",
  },
  stats: {
    projects: "proyek web",
    roles: "peran kerja",
    certifications: "sertifikasi",
    gpa: "IPK, lulus Cum Laude",
    decimal: ",",
  },
  work: {
    title: "Karya terpilih",
    tagline:
      "14 proyek web, dari sistem tiket multi-vendor sampai peminjaman ruangan kampus.",
    all: "Semua",
    filterLabel: "Saring proyek berdasarkan teknologi",
    view: "Lihat detail",
    showAll: "Tampilkan semua proyek",
    showLess: "Tampilkan lebih sedikit",
    live: "Live",
    openDemo: "Buka demo",
    otherVersion: "Versi lain",
    close: "Tutup",
    whatIDid: "Yang dikerjakan",
    screenshot: "Tangkapan layar",
  },
  twoSides: {
    title: "Dua sisi, satu sistem.",
    lede: "Saya pernah membangun sistem dan pernah mengauditnya. Karena itu saya membaca keduanya sekaligus: bagaimana sistem dibuat, dan apa yang dibutuhkan supaya sistem itu aman, terkendali, dan patuh regulasi.",
    node: "Analyst",
  },
  experience: {
    title: "Pengalaman kerja",
    photo: "Foto",
    pending: "menyusul",
  },
  skills: {
    title: "Keahlian dan kredensial",
    education: "Pendidikan",
    certifications: "Sertifikasi",
    languages: "Bahasa",
    organizations: "Organisasi",
  },
  contact: {
    title: "Mari bicara soal peran analyst di tim Anda.",
    body: "Cara tercepat menghubungi saya adalah lewat email atau LinkedIn.",
    copy: "Salin email",
    copied: "Tersalin",
    linkedin: "Buka LinkedIn",
  },
  palette: {
    placeholder: "Ketik untuk mencari…",
    empty: "Tidak ada hasil.",
    sections: "Bagian",
    projects: "Proyek",
    contact: "Kontak",
    language: "Bahasa",
    switchTo: "Ganti ke English",
    navigate: "pilih",
    open: "buka",
    close: "tutup",
    title: "Pencarian",
  },
  footer: {
    built: "Dibangun dengan Next.js dan Tailwind",
  },
};

export type Dictionary = typeof id;

const en: Dictionary = {
  meta: {
    title: "Raihan Maulana · Analyst, Fullstack and IT Audit & Advisory",
    description:
      "Portfolio of Muhammad Raihan Maulana: an analyst with IT audit and advisory experience in banking and systems development in SAP ABAP and Laravel.",
  },
  nav: {
    work: "Work",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
    search: "Search projects or sections",
    searchShort: "Search",
    email: "Email",
    language: "Language",
    skip: "Skip to content",
  },
  intro: {
    sendEmail: "Send email",
    now: "Now",
    based: "Based in",
    studied: "Education",
    portraitAlt: "Photo of Muhammad Raihan Maulana",
  },
  stats: {
    projects: "web projects",
    roles: "roles held",
    certifications: "certifications",
    gpa: "GPA, graduated Cum Laude",
    decimal: ".",
  },
  work: {
    title: "Selected work",
    tagline:
      "14 web projects, from a multi-vendor ticketing system to campus room booking.",
    all: "All",
    filterLabel: "Filter projects by technology",
    view: "View details",
    showAll: "Show all projects",
    showLess: "Show fewer",
    live: "Live",
    openDemo: "Open demo",
    otherVersion: "Other version",
    close: "Close",
    whatIDid: "What I did",
    screenshot: "Screenshot",
  },
  twoSides: {
    title: "Two sides, one system.",
    lede: "I have built systems and I have audited them. So I read both at once: how a system is made, and what it takes for that system to be secure, controlled and compliant.",
    node: "Analyst",
  },
  experience: {
    title: "Work experience",
    photo: "Photo",
    pending: "coming soon",
  },
  skills: {
    title: "Skills and credentials",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
    organizations: "Organisations",
  },
  contact: {
    title: "Let's talk about an analyst role on your team.",
    body: "The fastest way to reach me is by email or LinkedIn.",
    copy: "Copy email",
    copied: "Copied",
    linkedin: "Open LinkedIn",
  },
  palette: {
    placeholder: "Type to search…",
    empty: "No results.",
    sections: "Sections",
    projects: "Projects",
    contact: "Contact",
    language: "Language",
    switchTo: "Ganti ke Bahasa Indonesia",
    navigate: "select",
    open: "open",
    close: "close",
    title: "Search",
  },
  footer: {
    built: "Built with Next.js and Tailwind",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { id, en };
