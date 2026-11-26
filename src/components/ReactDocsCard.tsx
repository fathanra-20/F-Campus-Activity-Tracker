const COMPONENT_DOCS = [
  {
    term: 'App.tsx — pemilik state',
    description:
      'Komponen induk menyimpan activities, search, category, status, dan showDocs. Data kegiatan ditambah, dihapus, dicari, difilter, dan diubah statusnya sebelum diteruskan ke komponen anak melalui props.',
  },
  {
    term: 'Navbar.tsx — navigasi',
    description:
      'Header putih rounded-bottom dengan tautan ke daftar, form, dokumentasi React, dan Profil Tugas 2. State lokal isOpen (useState) membuka atau menutup menu pada layar kecil.',
  },
  {
    term: 'StudentHeaderCard.tsx — identitas & statistik',
    description:
      'Menerima props name, nim, prodi, dan stats. Statistik total kegiatan, terjadwal, serta selesai dihitung dari data di App.',
  },
  {
    term: 'ActivityForm.tsx — controlled form',
    description:
      'Controlled inputs menyimpan nama, kategori, tanggal, waktu, lokasi, dan deskripsi. Validasi dijalankan saat onSubmit sebelum memanggil callback onAddActivity.',
  },
  {
    term: 'ActivityFilterBar.tsx — pencarian & filter',
    description:
      'Pencarian berdasarkan nama atau lokasi, filter kategori dan status, serta toggle panel dokumentasi React.',
  },
  {
    term: 'ActivityList.tsx — wadah daftar',
    description:
      'Merender setiap kegiatan menggunakan map() dan key id yang unik. Conditional rendering menampilkan empty state saat daftar atau hasil filter kosong.',
  },
  {
    term: 'ActivityItem.tsx — satu kartu kegiatan',
    description:
      'Menampilkan jadwal, lokasi, badge status, dan detail yang dapat dibuka. Tombol aksi mengubah status atau menghapus kegiatan.',
  },
  {
    term: 'ReactDocsCard.tsx — dokumentasi',
    description:
      'Kartu penjelasan konsep React yang sedang Anda baca. Komponen ini hanya dirender ketika state showDocs bernilai true, contoh nyata conditional rendering dengan operator &&.',
  },
  {
    term: 'Footer.tsx — kontak',
    description:
      'Footer rounded-top berisi tautan LinkedIn, Email, dan GitHub yang ikonnya diimpor langsung dari folder assets/social menggunakan modul ES.',
  },
];

const CONCEPT_DOCS = [
  {
    term: 'Props (alur data satu arah)',
    description:
      'App mengirim data kegiatan dan callback (onAddActivity, onDelete, onToggleStatus) ke komponen anak melalui props.',
  },
  {
    term: 'State (useState)',
    description:
      'State di App mengelola kegiatan, kata kunci, kategori, status, dan visibilitas dokumentasi. Navbar, ActivityForm, dan ActivityItem juga memiliki state lokal.',
  },
  {
    term: 'Event handling',
    description:
      'onSubmit menangani penambahan kegiatan; onChange mengelola input form dan filter; onClick menangani status, hapus, detail, dan dokumentasi.',
  },
  {
    term: 'Conditional rendering',
    description:
      'Empty state muncul saat tidak ada hasil, detail dan dokumentasi dapat ditampilkan/disembunyikan, dan badge status menggunakan gaya monokrom.',
  },
  {
    term: 'List rendering (map + key)',
    description:
      'ActivityList memetakan array kegiatan dengan activities.map() dan memberikan key={activity.id} yang stabil.',
  },
];

export default function ReactDocsCard() {
  return (
    <section id="docs" className="card" aria-labelledby="docs-heading">
      <div className="card-header">
        <div>
          <span className="eyebrow">Dokumentasi Teknis</span>
          <h2 id="docs-heading">Konsep React yang Diterapkan</h2>
        </div>
        <span className="badge badge-ghost">8 komponen + App</span>
      </div>

      <div className="docs-panel">
        <p>
          Aplikasi ini dibangun dengan React 19 dan Vite menggunakan pendekatan
          component-based UI. Antarmuka dipecah menjadi delapan komponen
          fungsional di dalam <code>src/components/</code>, dengan{' '}
          <code>App.tsx</code> sebagai pemilik state dan sumber data tunggal.
          Setiap komponen menerima data dan callback melalui props, lalu
          merender ulang secara otomatis ketika state berubah.
        </p>
      </div>

      <h3 className="docs-heading">Tanggung Jawab Setiap Komponen</h3>
      <dl className="docs-grid">
        {COMPONENT_DOCS.map((item) => (
          <div className="docs-item" key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      </dl>

      <h3 className="docs-heading">Penerapan Konsep Inti</h3>
      <dl className="docs-grid">
        {CONCEPT_DOCS.map((item) => (
          <div className="docs-item" key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      </dl>

      <p className="completion-note">
        Data kegiatan juga disimpan ke <code>localStorage</code> dengan kunci{' '}
        <code>paw7.activities.v1</code>, sehingga daftar tetap tersedia setelah
        halaman dimuat ulang. Proses pembacaan dibungkus <code>try/catch</code>{' '}
        agar aplikasi tetap berjalan bila penyimpanan lokal tidak tersedia.
      </p>
    </section>
  );
}
