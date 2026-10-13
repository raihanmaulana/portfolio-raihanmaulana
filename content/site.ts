import type { L10n, Locale } from "@/lib/i18n";

// Every fact in this file comes from the CV and the portfolio PDF.
// Add nothing here that is not in one of those two documents.

export const profile = {
  name: "Muhammad Raihan Maulana",
  shortName: "Raihan Maulana",
  email: "raihanmaulana09@gmail.com",
  linkedin: "https://www.linkedin.com/in/raihanmaulana/",
  linkedinLabel: "linkedin.com/in/raihanmaulana",
  portrait: "/images/raihan-maulana.jpg",
  location: "Banten, Indonesia",
  role: {
    id: "Analyst · Fullstack dan IT Audit & Advisory",
    en: "Analyst · Fullstack and IT Audit & Advisory",
  },
  headline: {
    id: "Analyst yang membangun sistem dan mengauditnya.",
    en: "An analyst who builds systems and audits them.",
  },
  lede: {
    id: "Saya Muhammad Raihan Maulana. Saya bekerja di dua sisi teknologi: IT audit dan advisory (tata kelola TI, risiko teknologi, dan kepatuhan regulasi di industri perbankan) serta pengembangan perangkat lunak dengan SAP ABAP, Laravel, dan MySQL.",
    en: "I'm Muhammad Raihan Maulana. I work on both sides of technology: IT audit and advisory (IT governance, technology risk and regulatory compliance in banking) and software development with SAP ABAP, Laravel and MySQL.",
  },
  current: {
    id: "Assistant Manager, SAP FPSL Specialist di PT Bank Rakyat Indonesia",
    en: "Assistant Manager, SAP FPSL Specialist at PT Bank Rakyat Indonesia",
  },
  degree: {
    id: "Teknik Komputer, Universitas Diponegoro",
    en: "Computer Engineering, Universitas Diponegoro",
  },
} satisfies Record<string, string | L10n>;

export const filterIds = [
  "laravel",
  "php",
  "java-vue",
  "react-next",
  "python",
] as const;

export type FilterId = (typeof filterIds)[number];

export const filterLabels: Record<FilterId, string> = {
  laravel: "Laravel",
  php: "PHP",
  "java-vue": "Java & Vue.js",
  "react-next": "React & Next.js",
  python: "Python",
};

type ProjectSource = {
  slug: string;
  title: string;
  context?: L10n;
  summary: L10n;
  points: L10n<string[]>;
  stack: string[];
  filters: FilterId[];
};

const projectSources: ProjectSource[] = [
  {
    slug: "ticketing-app",
    title: "Ticketing App",
    context: { id: "Tim 6 orang", en: "Team of 6" },
    summary: {
      id: "Aplikasi tiket yang membantu customer service dan departemen lain mengelola tiket masalah dari pelanggan, dan bisa dipakai oleh berbagai vendor dan perusahaan.",
      en: "A ticketing app that helps customer service and other departments manage issue tickets from customers, and works across multiple vendors and companies.",
    },
    points: {
      id: [
        "Menangani fitur OCR yang membaca teks dari gambar dengan regex.",
        "Mengoptimalkan query SQL di sisi backend.",
        "Membangun sistem vendor berjenjang: vendor bisa membuat vendor turunan di bawah hierarkinya sendiri.",
        "Tim mengirim notifikasi ke Telegram dan web, serta hak akses berbasis peran pengguna.",
      ],
      en: [
        "Handled the OCR feature that reads text from images using regex.",
        "Optimised SQL queries on the backend.",
        "Built a hierarchical vendor system: vendors can create child vendors under their own hierarchy.",
        "The team shipped Telegram and web notifications, and role-based access rights.",
      ],
    },
    stack: ["Laravel", "React.js", "MySQL"],
    filters: ["laravel", "react-next"],
  },
  {
    slug: "peminjaman-ruangan",
    title: "Peminjaman Ruangan Teknik Industri UNDIP",
    context: { id: "Dikerjakan mandiri", en: "Built independently" },
    summary: {
      id: "Sistem peminjaman ruangan berbasis web untuk Teknik Industri Universitas Diponegoro, dipakai oleh staf dan mahasiswa.",
      en: "A web-based room booking system for Industrial Engineering at Universitas Diponegoro, used by staff and students.",
    },
    points: {
      id: [
        "Persetujuan berjenjang supaya setiap pengajuan terstruktur dan bisa dipertanggungjawabkan.",
        "Ekspor PDF untuk surat izin peminjaman.",
        "Integrasi FullCalendar.js yang disesuaikan untuk ketersediaan ruangan yang dinamis.",
      ],
      en: [
        "Tiered approval so every request is structured and accountable.",
        "PDF export for room rental permission letters.",
        "A customised FullCalendar.js integration for dynamic room availability.",
      ],
    },
    stack: ["Laravel 11", "Bootstrap", "Tailwind", "FullCalendar.js"],
    filters: ["laravel"],
  },
  {
    slug: "drive-it",
    title: "Drive-IT, Smart Delivery Website",
    summary: {
      id: "Memimpin dan mengerjakan upgrade platform dari Laravel 5.8 ke Laravel 10.",
      en: "Led and carried out the platform upgrade from Laravel 5.8 to Laravel 10.",
    },
    points: {
      id: [
        "Menilai codebase yang ada dan menandai bagian yang perlu disesuaikan.",
        "Memigrasikan dependensi, mengoptimalkan struktur database, dan mengganti fitur yang sudah deprecated.",
        "Menguji dan memperbaiki masalah selama transisi untuk menekan downtime.",
      ],
      en: [
        "Assessed the existing codebase and flagged the areas that needed changes.",
        "Migrated dependencies, optimised the database structure and replaced deprecated features.",
        "Tested and troubleshot through the transition to keep downtime low.",
      ],
    },
    stack: ["Laravel 10"],
    filters: ["laravel"],
  },
  {
    slug: "ap-system",
    title: "AP System (Attendance and Payroll)",
    context: {
      id: "Tim 4 orang · PT Simian Technologies",
      en: "Team of 4 · PT Simian Technologies",
    },
    summary: {
      id: "Website manajemen karyawan dan penggajian untuk PT Simian Technologies.",
      en: "An employee management and payroll website for PT Simian Technologies.",
    },
    points: {
      id: [
        "Mengembangkan 6 fitur manajemen karyawan dan penggajian.",
        "Membangun 2 sistem backend API dengan Java dalam tiga bulan.",
        "Membuat frontend interaktif dengan Vue.js, sedikitnya 15 komponen.",
        "Pengujian dan debugging dengan cakupan minimal 90%.",
      ],
      en: [
        "Developed 6 employee management and payroll features.",
        "Built 2 backend API systems in Java within three months.",
        "Built an interactive Vue.js frontend of at least 15 components.",
        "Testing and debugging with at least 90% coverage.",
      ],
    },
    stack: ["Java", "Vue.js"],
    filters: ["java-vue"],
  },
  {
    slug: "sistem-kepegawaian",
    title: "Sistem Informasi Kepegawaian",
    summary: {
      id: "Website sistem informasi kepegawaian dengan fitur kenaikan pangkat, data pribadi pegawai, dan manajemen cuti.",
      en: "An employee information system website covering promotions, personal data and leave management.",
    },
    points: {
      id: [
        "Halaman kenaikan pangkat: input data, riwayat, dan laporan.",
        "Modul data pribadi yang bisa dilihat dan diubah oleh pegawai dan HR.",
        "Manajemen cuti: pengajuan, sisa cuti, serta persetujuan oleh atasan dan HR.",
      ],
      en: [
        "A promotions page: record entry, history and reports.",
        "A personal data module that employees and HR can view and edit.",
        "Leave management: requests, remaining balance, and approval by managers and HR.",
      ],
    },
    stack: [],
    filters: [],
  },
  {
    slug: "petshop",
    title: "Radhyian Pet and Care (Petshop)",
    summary: {
      id: "Website operasional petshop: stok produk, booking layanan, data pelanggan, dan transaksi.",
      en: "An operations website for a pet shop: product stock, service bookings, customer data and transactions.",
    },
    points: {
      id: [
        "Manajemen inventaris produk dengan kategori dan laporan stok.",
        "Booking dan penjadwalan layanan seperti grooming, vaksinasi, dan pemeriksaan.",
        "Database pelanggan beserta data hewan peliharaannya.",
        "Modul penjualan dan transaksi dengan riwayat, status pembayaran, dan invoice.",
        "Dashboard admin: produk terlaris, transaksi terbaru, dan ringkasan janji temu.",
      ],
      en: [
        "Product inventory management with categories and stock reports.",
        "Booking and scheduling for services such as grooming, vaccination and check-ups.",
        "A customer database that includes their pets' details.",
        "A sales and transactions module with history, payment status and invoices.",
        "An admin dashboard: top-selling products, recent transactions and appointment summaries.",
      ],
    },
    stack: [],
    filters: [],
  },
  {
    slug: "academify",
    title: "Academify, School Website",
    context: {
      id: "Dikerjakan mandiri · Projects.co.id",
      en: "Built independently · Projects.co.id",
    },
    summary: {
      id: "Sistem manajemen pendidikan berbasis web untuk merapikan proses administrasi sekolah.",
      en: "A web-based education management system that streamlines school administration.",
    },
    points: {
      id: [
        "Soft delete untuk menjaga integritas data, dengan tampilan data yang mengikuti status hapus.",
        "Menyesuaikan skrip migrasi database untuk proses hapus yang baru.",
        "Modul guru, siswa, mata pelajaran, dan tugas dengan kontrol akses yang konsisten.",
        "Selesai dalam 2 hari dan mendapat rating bintang 5 dari klien.",
      ],
      en: [
        "Soft delete to preserve data integrity, with data visibility that follows delete status.",
        "Adapted the database migration scripts for the new delete process.",
        "Teacher, student, subject and assignment modules with consistent access control.",
        "Completed in 2 days and rated 5 stars by the client.",
      ],
    },
    stack: ["Laravel", "PHP", "MySQL"],
    filters: ["laravel"],
  },
  {
    slug: "web-kasir",
    title: "Web Kasir Febrygrosir",
    context: { id: "Dikerjakan mandiri", en: "Built independently" },
    summary: {
      id: "Aplikasi kasir berbasis web untuk membantu pengelolaan toko ritel.",
      en: "A web-based cashier application for retail store management.",
    },
    points: {
      id: [
        "Pelacakan stok real-time, laporan penjualan, dan autentikasi pengguna untuk staf.",
        "Integrasi pemrosesan pembayaran.",
        "Modul laporan untuk menganalisis kinerja penjualan.",
        "Dokumentasi pelatihan untuk pengguna akhir.",
      ],
      en: [
        "Real-time inventory tracking, sales reporting and user authentication for staff.",
        "Payment processing integration.",
        "A reporting module for analysing sales performance.",
        "Training documentation for end users.",
      ],
    },
    stack: ["Laravel", "JavaScript", "MySQL"],
    filters: ["laravel"],
  },
  {
    slug: "perpustakaan-pamekasan",
    title: "Website Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan",
    summary: {
      id: "Pengembangan fitur dan perbaikan bug pada website Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan yang berbasis SLiMS.",
      en: "Feature development and bug fixing on the SLiMS-based website of the Pamekasan Regency Library and Archival Service Office.",
    },
    points: {
      id: [
        "Merancang dan membuat fitur kartu anggota.",
        "Memperbaiki bug pada fitur unggah foto KTP.",
        "Membangun modul pendaftaran anggota dengan validasi data.",
        "Pengujian dan debugging sistem.",
      ],
      en: [
        "Designed and built the membership card feature.",
        "Fixed bugs in the KTP photo upload feature.",
        "Built the member registration module with data validation.",
        "System testing and debugging.",
      ],
    },
    stack: ["SLiMS", "PHP"],
    filters: ["php"],
  },
  {
    slug: "sikpb",
    title: "SIKPB",
    context: {
      id: "Tim 3 orang · SMA Negeri 1 Tunjungan Blora",
      en: "Team of 3 · SMA Negeri 1 Tunjungan Blora",
    },
    summary: {
      id: "Website sistem manajemen perpustakaan untuk SMA Negeri 1 Tunjungan Blora.",
      en: "A library management system website for SMA Negeri 1 Tunjungan Blora.",
    },
    points: {
      id: [
        "Mengembangkan 7 fitur sistem manajemen perpustakaan.",
        "Membangun 1 sistem backend API dengan Laravel dalam dua bulan.",
        "Membuat frontend dengan Bootstrap, sedikitnya 15 komponen.",
        "Pengujian dan debugging dengan cakupan minimal 90%.",
      ],
      en: [
        "Developed 7 library management features.",
        "Built 1 backend API system in Laravel within two months.",
        "Built a Bootstrap frontend of at least 15 components.",
        "Testing and debugging with at least 90% coverage.",
      ],
    },
    stack: ["Laravel", "Bootstrap"],
    filters: ["laravel"],
  },
  {
    slug: "sistem-informasi-ktp",
    title: "Sistem Informasi KTP",
    summary: {
      id: "Aplikasi pengelolaan data KTP dengan operasi tambah, lihat, ubah, dan hapus.",
      en: "A KTP (identity card) data management application with create, read, update and delete operations.",
    },
    points: {
      id: [
        "Autentikasi dengan JWT.",
        "Respons API dalam format JSON.",
        "Antarmuka responsif dengan AJAX.",
      ],
      en: [
        "Authentication with JWT.",
        "API responses in JSON.",
        "A responsive interface using AJAX.",
      ],
    },
    stack: ["Laravel", "JavaScript (Axios)", "JWT"],
    filters: ["laravel"],
  },
  {
    slug: "jual-beli",
    title: "Website Penjualan dan Pembelian",
    summary: {
      id: "Platform jual beli berbasis web yang dibangun dengan PHP native.",
      en: "A web-based buying and selling platform built in native PHP.",
    },
    points: {
      id: [
        "Registrasi pengguna, daftar produk, dan payment gateway.",
        "Filter pencarian dan kategorisasi produk.",
        "Menangani keamanan, optimasi interaksi database, dan tampilan mobile.",
        "Selesai dalam 3 hari.",
      ],
      en: [
        "User registration, product listings and a payment gateway.",
        "Search filters and product categorisation.",
        "Handled security, database interaction tuning and mobile responsiveness.",
        "Completed in 3 days.",
      ],
    },
    stack: ["PHP"],
    filters: ["php"],
  },
  {
    slug: "web-scraping",
    title: "Web Scraping with Python",
    context: { id: "Proyek pribadi", en: "Personal project" },
    summary: {
      id: "Scraper Python untuk mengotomatiskan pengumpulan data dari halaman web, termasuk halaman dinamis.",
      en: "A Python scraper that automates data collection from web pages, including dynamic ones.",
    },
    points: {
      id: [
        "Mengotomatiskan 70% proses pengumpulan data.",
        "Akurasi data naik 50% dengan BeautifulSoup dan Scrapy.",
        "3x lebih cepat dengan asyncio dan request paralel.",
        "Bisa disesuaikan untuk pelacakan harga, agregasi berita, dan analisis media sosial.",
      ],
      en: [
        "Automated 70% of the data collection process.",
        "Data accuracy up 50% using BeautifulSoup and Scrapy.",
        "3x faster with asyncio and parallel requests.",
        "Adaptable to price tracking, news aggregation and social media analysis.",
      ],
    },
    stack: ["Python", "BeautifulSoup", "Scrapy", "Pandas", "Selenium"],
    filters: ["python"],
  },
  {
    slug: "portfolio-nextjs",
    title: "Personal Portfolio Web",
    context: { id: "Proyek pribadi", en: "Personal project" },
    summary: {
      id: "Website portfolio berbasis Next.js untuk menampilkan proyek dan keahlian kepada calon klien atau perusahaan.",
      en: "A Next.js portfolio website that presents projects and skills to potential clients or employers.",
    },
    points: {
      id: [
        "Dynamic routing untuk navigasi antarbagian.",
        "SSR dan SSG untuk performa dan SEO.",
        "Komponen interaktif: carousel gambar, modal, dan menu dropdown.",
        "Desain responsif untuk desktop, tablet, dan ponsel.",
        "Form dengan validasi bawaan dan pengiriman data.",
      ],
      en: [
        "Dynamic routing for navigation between sections.",
        "SSR and SSG for performance and SEO.",
        "Interactive components: image carousels, modals and dropdown menus.",
        "Responsive design for desktop, tablet and phone.",
        "Forms with built-in validation and data submission.",
      ],
    },
    stack: ["Next.js", "React"],
    filters: ["react-next"],
  },
];

type ExperienceSource = {
  company: string;
  place: string;
  role: L10n;
  period: L10n;
  points: L10n<string[]>;
};

const experienceSources: ExperienceSource[] = [
  {
    company: "PT Bank Rakyat Indonesia",
    place: "Jakarta Selatan",
    role: {
      id: "Assistant Manager, SAP FPSL Specialist",
      en: "Assistant Manager, SAP FPSL Specialist",
    },
    period: { id: "Mei 2026 – sekarang", en: "May 2026 – present" },
    points: {
      id: [
        "Menganalisis dan mengoptimalkan proses keuangan SAP untuk meningkatkan akurasi data dan efisiensi pelaporan.",
        "Mengembangkan solusi SAP ABAP yang mendukung pelaporan keuangan dan proses bisnis.",
        "Melakukan rekonsiliasi data, pengujian, dan troubleshooting agar keluaran sistem keuangan andal.",
        "Bekerja sama dengan pemangku kepentingan Finance, TI, dan bisnis.",
      ],
      en: [
        "Analyse and optimise SAP financial processes to improve data accuracy and reporting efficiency.",
        "Develop SAP ABAP solutions that support financial reporting and business processes.",
        "Perform data reconciliation, testing and troubleshooting to keep financial system outputs reliable.",
        "Work with Finance, IT and business stakeholders.",
      ],
    },
  },
  {
    company: "PT CIMB Niaga Tbk",
    place: "Tangerang Selatan",
    role: { id: "IT Audit & Advisory", en: "IT Audit & Advisory" },
    period: { id: "Jul 2025 – Mei 2026", en: "Jul 2025 – May 2026" },
    points: {
      id: [
        "Melakukan audit TI pada keamanan siber, aplikasi enterprise, dan operasional TI untuk menilai risiko teknologi, kontrol internal, dan kepatuhan terhadap regulasi perbankan Indonesia.",
        "Mendukung proyek TI dari sisi tata kelola, dokumentasi proyek, dan kepatuhan regulasi, termasuk persiapan persetujuan regulator.",
        "Menyiapkan dokumentasi audit, penilaian risiko, laporan evaluasi, dan presentasi eksekutif untuk pengambilan keputusan manajemen.",
      ],
      en: [
        "Conducted IT audits across cybersecurity, enterprise applications and IT operations to evaluate technology risk, internal controls and compliance with Indonesian banking regulations.",
        "Supported IT projects on governance, project documentation and regulatory compliance, including preparation for regulatory approvals.",
        "Prepared audit documentation, risk assessments, evaluation reports and executive presentations for management decisions.",
      ],
    },
  },
  {
    company: "PT United Tractors Pandu Engineering (Astra Group)",
    place: "Cikarang",
    role: { id: "SAP ABAP Developer", en: "SAP ABAP Developer" },
    period: { id: "Feb 2025 – Jul 2025", en: "Feb 2025 – Jul 2025" },
    points: {
      id: [
        "Mengembangkan sistem backend SAP dengan ABAP dan meningkatkan performa query database sebesar 30%.",
        "Menyesuaikan modul dan laporan SAP untuk otomasi alur kerja.",
        "Menerjemahkan kebutuhan bisnis menjadi solusi teknis ABAP bersama tim bisnis dan fungsional.",
      ],
      en: [
        "Developed SAP backend systems in ABAP and improved database query performance by 30%.",
        "Customised SAP modules and reports for workflow automation.",
        "Translated business requirements into technical ABAP solutions with business and functional teams.",
      ],
    },
  },
  {
    company: "PT Awan Networks Indonesia",
    place: "Semarang",
    role: { id: "Backend Developer", en: "Backend Developer" },
    period: { id: "Jun 2024 – Jan 2025", en: "Jun 2024 – Jan 2025" },
    points: {
      id: [
        "Membangun sistem backend dengan Laravel dan MySQL untuk aplikasi produksi.",
        "Menjalankan pengujian otomatis dan manual dengan cakupan 95%+, mengurangi bug sebesar 80%.",
        "Mengoptimalkan query database dan performa aplikasi.",
      ],
      en: [
        "Built backend systems with Laravel and MySQL for production applications.",
        "Ran automated and manual testing at 95%+ coverage, reducing bugs by 80%.",
        "Optimised database queries and application performance.",
      ],
    },
  },
  {
    company: "Universitas Diponegoro",
    place: "Semarang",
    role: {
      id: "Koordinator Asisten Praktikum Sistem Basis Data",
      en: "Coordinator of Database Systems Practicum Assistants",
    },
    period: { id: "Sep 2023 – Des 2023", en: "Sep 2023 – Dec 2023" },
    points: {
      id: [
        "Memimpin dan mengoordinasikan 12 asisten laboratorium.",
        "Menyampaikan modul DBMS dan MySQL kepada 160+ mahasiswa.",
        "Menilai 35 proyek tim dengan fokus pada normalisasi database dan efisiensi query.",
      ],
      en: [
        "Led and coordinated 12 laboratory assistants.",
        "Delivered DBMS and MySQL modules to 160+ students.",
        "Reviewed 35 team projects, focusing on database normalisation and query efficiency.",
      ],
    },
  },
  {
    company: "PT Simian Technologies",
    place: "Jakarta Pusat",
    role: {
      id: "Fullstack Developer (Magang)",
      en: "Fullstack Developer (Intern)",
    },
    period: { id: "Jan 2023 – Apr 2023", en: "Jan 2023 – Apr 2023" },
    points: {
      id: [
        "Mengembangkan 6 fitur inti sistem manajemen karyawan dan penggajian dalam tim 4 developer.",
        "Dibangun dengan Java dan Vue.js; 2 sistem siap produksi selesai dalam tiga bulan.",
      ],
      en: [
        "Developed 6 core features for employee management and payroll systems in a team of 4 developers.",
        "Built with Java and Vue.js; 2 production-ready systems completed in three months.",
      ],
    },
  },
];

const skillGroups: { title: L10n; items: string[] }[] = [
  {
    title: { id: "Audit dan advisory", en: "Audit and advisory" },
    items: [
      "IT Audit",
      "IT Advisory",
      "Technology Risk",
      "Risk Management",
      "IT Governance",
    ],
  },
  {
    title: { id: "Pengembangan sistem", en: "Systems development" },
    items: [
      "SAP ABAP",
      "SAP FPSL",
      "ERP Application",
      "PHP",
      "Laravel",
      "MySQL",
      "JavaScript",
      "RESTful API",
      "System Integration",
      "Microsoft Excel",
    ],
  },
];

const education = {
  school: "Universitas Diponegoro",
  period: { id: "Sep 2020 – Mar 2024", en: "Sep 2020 – Mar 2024" },
  degree: {
    id: "Sarjana Teknik Komputer · IPK 3,70/4,00",
    en: "Bachelor of Computer Engineering · GPA 3.70/4.00",
  },
  points: {
    id: [
      "Lulus dengan pujian (Cum Laude).",
      "Fokus pada rekayasa perangkat lunak, sistem basis data, dan sistem informasi.",
    ],
    en: [
      "Graduated with honours (Cum Laude).",
      "Focused on software engineering, database systems and information systems.",
    ],
  },
} satisfies Record<string, string | L10n | L10n<string[]>>;

const certifications: { name: string; issuer?: string }[] = [
  {
    name: "Audit, Risk & Compliance",
    issuer: "Business Learning Solutions (BLS)",
  },
  {
    name: "System Administration and IT Infrastructure Services",
    issuer: "Google",
  },
  { name: "Business Analysis & Process Management", issuer: "Google" },
  { name: "Oracle Database Programming with SQL" },
  { name: "TOEFL ITP", issuer: "ETS" },
  { name: "CCNAv7: Introduction to Networks" },
];

const languages: L10n<string[]> = {
  id: ["Bahasa Indonesia (penutur asli)", "Bahasa Inggris (fasih)"],
  en: ["Indonesian (native)", "English (fluent)"],
};

const organizations: { name: string; role: L10n; period: L10n }[] = [
  {
    name: "HIMASKOM, Universitas Diponegoro",
    role: { id: "Kepala Divisi Seni", en: "Head of Arts Division" },
    period: { id: "Agu 2021 – Mar 2023", en: "Aug 2021 – Mar 2023" },
  },
  {
    name: "BEM FEB, Universitas Diponegoro",
    role: {
      id: "Juri lomba poster dan video iklan bisnis, EcoArt & Ecopreneur",
      en: "Judge, poster and business ad video, EcoArt & Ecopreneur competitions",
    },
    period: { id: "Mei 2023 – Mei 2024", en: "May 2023 – May 2024" },
  },
];

export type Project = {
  slug: string;
  title: string;
  context?: string;
  summary: string;
  points: string[];
  stack: string[];
  filters: FilterId[];
  images: [string, string];
};

export function getContent(locale: Locale) {
  const projects: Project[] = projectSources.map((p) => ({
    slug: p.slug,
    title: p.title,
    context: p.context?.[locale],
    summary: p.summary[locale],
    points: p.points[locale],
    stack: p.stack,
    filters: p.filters,
    images: [
      `/images/projects/${p.slug}-1.webp`,
      `/images/projects/${p.slug}-2.webp`,
    ],
  }));

  return {
    profile: {
      ...profile,
      role: profile.role[locale],
      headline: profile.headline[locale],
      lede: profile.lede[locale],
      current: profile.current[locale],
      degree: profile.degree[locale],
    },
    projects,
    experience: experienceSources.map((e) => ({
      company: e.company,
      place: e.place,
      role: e.role[locale],
      period: e.period[locale],
      points: e.points[locale],
    })),
    skillGroups: skillGroups.map((g) => ({
      title: g.title[locale],
      items: g.items,
    })),
    education: {
      school: education.school,
      period: education.period[locale],
      degree: education.degree[locale],
      points: education.points[locale],
    },
    certifications,
    languages: languages[locale],
    organizations: organizations.map((o) => ({
      name: o.name,
      role: o.role[locale],
      period: o.period[locale],
    })),
  };
}

export type Content = ReturnType<typeof getContent>;
