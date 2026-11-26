interface ActivityStats {
  total: number;
  scheduled: number;
  completed: number;
}

interface StudentHeaderCardProps {
  name: string;
  nim: string;
  prodi: string;
  stats: ActivityStats;
}

export default function StudentHeaderCard({
  name,
  nim,
  prodi,
  stats,
}: StudentHeaderCardProps) {
  return (
    <section
      id="profile"
      className="card"
      aria-labelledby="activity-profile-heading"
    >
      <div className="card-header">
        <div>
          <span className="eyebrow">
            Campus &amp; Daily Activity Tracker
          </span>
          <h1 id="activity-profile-heading">Aplikasi Daftar Kegiatan Mahasiswa</h1>
        </div>
        <span className="badge badge-outline">Semester 5</span>
      </div>

      <p className="lede">
        Catat agenda kampus dan kegiatan sehari-hari dalam satu daftar yang mudah
        dicari, disaring, dan diperbarui.
      </p>

      <dl className="identity-grid">
        <div>
          <dt>Nama</dt>
          <dd>{name}</dd>
        </div>
        <div>
          <dt>NIM</dt>
          <dd>{nim}</dd>
        </div>
        <div>
          <dt>Program Studi</dt>
          <dd>{prodi}</dd>
        </div>
        <div>
          <dt>Universitas</dt>
          <dd>UIN Sunan Gunung Djati Bandung</dd>
        </div>
      </dl>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Kegiatan</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.scheduled}</span>
          <span className="stat-label">Terjadwal</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Selesai</span>
        </div>
      </div>
    </section>
  );
}
