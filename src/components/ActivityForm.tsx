import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ActivityCategory, ActivityDraft } from '../types/activity';

interface ActivityFormProps {
  onAddActivity: (activity: ActivityDraft) => void;
}

const CATEGORIES: ActivityCategory[] = [
  'Akademik',
  'Organisasi',
  'Seminar & Workshop',
  'Pengembangan Diri',
];

const EMPTY_DRAFT: ActivityDraft = {
  title: '',
  category: 'Akademik',
  date: '',
  time: '',
  location: '',
  description: '',
};

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isValidTime(value: string): boolean {
  return /^(?:[01]\d|2[0-3]):[0-5]\d - (?:[01]\d|2[0-3]):[0-5]\d WIB$/.test(value);
}

export default function ActivityForm({ onAddActivity }: ActivityFormProps) {
  const [draft, setDraft] = useState<ActivityDraft>(EMPTY_DRAFT);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const activity = {
      ...draft,
      title: draft.title.trim(),
      time: draft.time.trim(),
      location: draft.location.trim(),
      description: draft.description.trim(),
    };

    if (activity.title.length < 3) {
      setError('Nama kegiatan minimal 3 karakter.');
      return;
    }
    if (!isValidDate(activity.date)) {
      setError('Pilih tanggal kegiatan yang valid.');
      return;
    }
    if (!isValidTime(activity.time)) {
      setError('Gunakan format waktu, misalnya 09:00 - 11:30 WIB.');
      return;
    }
    if (activity.location.length < 3) {
      setError('Lokasi atau platform minimal 3 karakter.');
      return;
    }
    if (activity.description.length < 10) {
      setError('Deskripsi kegiatan minimal 10 karakter.');
      return;
    }

    onAddActivity(activity);
    setDraft(EMPTY_DRAFT);
    setError('');
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit} noValidate>
      <div className="activity-form-grid">
        <div className="field">
          <label htmlFor="activity-title">Nama Kegiatan</label>
          <input
            id="activity-title"
            type="text"
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            placeholder="Contoh: Praktikum Jaringan Komputer"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="activity-category">Kategori</label>
          <select
            id="activity-category"
            value={draft.category}
            onChange={(event) =>
              setDraft({ ...draft, category: event.target.value as ActivityCategory })
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
          <label htmlFor="activity-date">Tanggal</label>
          <input
            id="activity-date"
            type="date"
            value={draft.date}
            onChange={(event) => setDraft({ ...draft, date: event.target.value })}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="activity-time">Waktu</label>
          <input
            id="activity-time"
            type="text"
            value={draft.time}
            onChange={(event) => setDraft({ ...draft, time: event.target.value })}
            placeholder="09:00 - 11:30 WIB"
            required
          />
        </div>
        <div className="field activity-field-full">
          <label htmlFor="activity-location">Lokasi atau Platform</label>
          <input
            id="activity-location"
            type="text"
            value={draft.location}
            onChange={(event) => setDraft({ ...draft, location: event.target.value })}
            placeholder="Ruang kelas atau platform online"
            required
          />
        </div>
        <div className="field activity-field-full">
          <label htmlFor="activity-description">Deskripsi</label>
          <textarea
            id="activity-description"
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            placeholder="Catatan singkat tentang kegiatan"
            rows={3}
            required
          />
        </div>
      </div>
      {error && (
        <p className="activity-form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Tambah Kegiatan
        </button>
      </div>
    </form>
  );
}
