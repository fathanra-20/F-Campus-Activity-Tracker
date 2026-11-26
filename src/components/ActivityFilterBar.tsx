import type { ActivityCategory, ActivityStatus } from '../types/activity';

interface ActivityFilterBarProps {
  search: string;
  category: ActivityCategory | 'Semua';
  status: ActivityStatus | 'Semua';
  showDocs: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ActivityCategory | 'Semua') => void;
  onStatusChange: (value: ActivityStatus | 'Semua') => void;
  onToggleDocs: () => void;
}

const CATEGORIES: Array<ActivityCategory | 'Semua'> = [
  'Semua',
  'Akademik',
  'Organisasi',
  'Seminar & Workshop',
  'Pengembangan Diri',
];

const STATUSES: Array<ActivityStatus | 'Semua'> = ['Semua', 'Terjadwal', 'Selesai'];

export default function ActivityFilterBar({
  search,
  category,
  status,
  showDocs,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onToggleDocs,
}: ActivityFilterBarProps) {
  return (
    <div className="activity-filter-bar">
      <div className="activity-filter-controls">
        <div className="field">
          <label htmlFor="activity-search">Cari Kegiatan</label>
          <input
            id="activity-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Nama atau lokasi kegiatan"
          />
        </div>
        <div className="field">
          <label htmlFor="activity-category-filter">Kategori</label>
          <select
            id="activity-category-filter"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value as ActivityCategory | 'Semua')
            }
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="activity-status-filter">Status</label>
          <select
            id="activity-status-filter"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as ActivityStatus | 'Semua')
            }
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-outline"
          aria-expanded={showDocs}
          aria-controls="docs"
          onClick={onToggleDocs}
        >
          {showDocs ? 'Sembunyikan Dokumentasi' : 'Tampilkan Dokumentasi'}
        </button>
      </div>
    </div>
  );
}
