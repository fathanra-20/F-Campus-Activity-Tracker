# Tugas Pertemuan 7 — Aplikasi Daftar Kegiatan Mahasiswa

**Nama aplikasi:** Campus & Daily Activity Tracker  
**Teknologi:** React, Vite, TypeScript  
**Mahasiswa:** Fathan Rafif Athaya — `1247050044`, S1 Teknik Informatika, Semester 5, UIN Sunan Gunung Djati Bandung

## Tujuan

Aplikasi ini membantu mahasiswa mencatat kegiatan akademik, organisasi, seminar dan workshop, serta pengembangan diri. Data dapat ditambah, dicari, difilter, diubah statusnya, dihapus, dan tersimpan di `localStorage`.

## Model kegiatan

`Activity` memiliki `id`, `title`, `category`, `date` (`YYYY-MM-DD`), `time`, `location`, `status`, dan `description`. Kategori yang tersedia adalah Akademik, Organisasi, Seminar & Workshop, dan Pengembangan Diri. Status kegiatan adalah Terjadwal atau Selesai.

Seed berisi contoh kegiatan mahasiswa Teknik Informatika Semester 5. Kegiatan baru selalu tervalidasi sebelum dimasukkan; pencarian mencakup nama dan lokasi, dan hasil dapat disaring berdasarkan kategori serta status.

## Komponen

- `Navbar.tsx`: tautan ke daftar, form, dokumentasi, dokumentasi React, dan Profil Tugas 2.
- `StudentHeaderCard.tsx`: identitas mahasiswa dan ringkasan total, terjadwal, serta selesai.
- `ActivityForm.tsx`: controlled form dengan validasi untuk membuat kegiatan.
- `ActivityFilterBar.tsx`: pencarian, filter kategori/status, dan toggle dokumentasi.
- `ActivityList.tsx` dan `ActivityItem.tsx`: list kegiatan, empty state, detail, ubah status, dan hapus.
- `ReactDocsCard.tsx`: ringkasan components, props, `useState`, event handling, conditional rendering, dan list rendering.
- `Footer.tsx`: kontak LinkedIn, email, dan GitHub.

`App.tsx` mengelola data serta callback melalui props. Komponen menggunakan state React dan daftar dirender menggunakan `map()` dengan key unik.
