import { useEffect, useMemo, useState } from 'react';
import ActivityFilterBar from './components/ActivityFilterBar';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ReactDocsCard from './components/ReactDocsCard';
import StudentHeaderCard from './components/StudentHeaderCard';
import { INITIAL_ACTIVITIES } from './data/initialActivities';
import type {
  Activity,
  ActivityCategory,
  ActivityDraft,
  ActivityStatus,
} from './types/activity';

const STORAGE_KEY = 'paw7.activities.v1';

function isActivity(value: unknown): value is Activity {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string' &&
    (candidate.category === 'Akademik' ||
      candidate.category === 'Organisasi' ||
      candidate.category === 'Seminar & Workshop' ||
      candidate.category === 'Pengembangan Diri') &&
    typeof candidate.date === 'string' &&
    typeof candidate.time === 'string' &&
    typeof candidate.location === 'string' &&
    (candidate.status === 'Terjadwal' || candidate.status === 'Selesai') &&
    typeof candidate.description === 'string'
  );
}

function loadActivities(): Activity[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return INITIAL_ACTIVITIES;
    const parsed: unknown = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every(isActivity)) return parsed;
    console.error('Data kegiatan di localStorage tidak valid; menggunakan data awal.');
  } catch (error) {
    console.error('Gagal membaca data kegiatan dari localStorage.', error);
  }
  return INITIAL_ACTIVITIES;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>(loadActivities);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ActivityCategory | 'Semua'>('Semua');
  const [status, setStatus] = useState<ActivityStatus | 'Semua'>('Semua');
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Gagal menyimpan data kegiatan ke localStorage.', error);
    }
  }, [activities]);

  const stats = useMemo(
    () => ({
      total: activities.length,
      scheduled: activities.filter((activity) => activity.status === 'Terjadwal').length,
      completed: activities.filter((activity) => activity.status === 'Selesai').length,
    }),
    [activities],
  );

  const filteredActivities = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase('id');
    return activities.filter((activity) => {
      const matchesSearch =
        keyword.length === 0 ||
        activity.title.toLocaleLowerCase('id').includes(keyword) ||
        activity.location.toLocaleLowerCase('id').includes(keyword);
      return (
        matchesSearch &&
        (category === 'Semua' || activity.category === category) &&
        (status === 'Semua' || activity.status === status)
      );
    });
  }, [activities, category, search, status]);

  function handleAddActivity(draft: ActivityDraft) {
    setActivities((current) => {
      const nextId = current.reduce((highest, activity) => Math.max(highest, activity.id), 0) + 1;
      return [{ ...draft, id: nextId, status: 'Terjadwal' }, ...current];
    });
  }

  function handleToggleStatus(id: number) {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              status: activity.status === 'Terjadwal' ? 'Selesai' : 'Terjadwal',
            }
          : activity,
      ),
    );
  }

  function handleDeleteActivity(id: number) {
    setActivities((current) => current.filter((activity) => activity.id !== id));
  }

  function handleShowDocs() {
    setShowDocs(true);
    window.requestAnimationFrame(() => {
      document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const emptyMessage =
    activities.length === 0
      ? 'Belum ada kegiatan tersimpan. Tambahkan kegiatan pertama melalui formulir di atas.'
      : 'Tidak ada kegiatan yang cocok dengan kata kunci atau filter yang dipilih.';

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Loncat ke konten utama
      </a>
      <Navbar onShowDocs={handleShowDocs} />
      <main id="main-content" className="main-content">
        <StudentHeaderCard
          name="Fathan Rafif Athaya"
          nim="1247050044"
          prodi="S1 Teknik Informatika"
          stats={stats}
        />

        <section id="activity-form" className="card" aria-labelledby="activity-form-heading">
          <div className="card-header">
            <div>
              <span className="eyebrow">Form Kegiatan</span>
              <h2 id="activity-form-heading">Tambah Kegiatan</h2>
            </div>
          </div>
          <p>Catat kegiatan akademik, organisasi, seminar, atau pengembangan diri.</p>
          <ActivityForm onAddActivity={handleAddActivity} />
        </section>

        <section id="activities" className="card" aria-labelledby="activities-heading">
          <div className="card-header">
            <div>
              <span className="eyebrow">Rencana Mahasiswa</span>
              <h2 id="activities-heading">Daftar Kegiatan</h2>
            </div>
            <span className="badge badge-outline">
              {filteredActivities.length} dari {activities.length}
            </span>
          </div>
          <ActivityFilterBar
            search={search}
            category={category}
            status={status}
            showDocs={showDocs}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onStatusChange={setStatus}
            onToggleDocs={() => setShowDocs((visible) => !visible)}
          />
          <ActivityList
            activities={filteredActivities}
            emptyMessage={emptyMessage}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteActivity}
          />
        </section>

        {showDocs && <ReactDocsCard />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
