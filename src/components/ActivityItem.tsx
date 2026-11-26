import { useState } from 'react';
import type { Activity } from '../types/activity';

interface ActivityItemProps {
  activity: Activity;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

const DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export default function ActivityItem({
  activity,
  onToggleStatus,
  onDelete,
}: ActivityItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isComplete = activity.status === 'Selesai';

  return (
    <article className="activity-item">
      <div className="activity-item-heading">
        <div>
          <span className="eyebrow">{activity.category}</span>
          <h3>{activity.title}</h3>
        </div>
        <span className={`badge ${isComplete ? 'badge-solid' : 'badge-outline'}`}>
          {activity.status}
        </span>
      </div>
      <dl className="activity-meta">
        <div>
          <dt>Tanggal</dt>
          <dd>
            <time dateTime={activity.date}>
              {DATE_FORMATTER.format(new Date(`${activity.date}T00:00:00Z`))}
            </time>
          </dd>
        </div>
        <div>
          <dt>Waktu</dt>
          <dd>{activity.time}</dd>
        </div>
        <div>
          <dt>Lokasi</dt>
          <dd>{activity.location}</dd>
        </div>
      </dl>
      {showDetails && <p className="activity-description">{activity.description}</p>}
      <div className="activity-actions">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          aria-expanded={showDetails}
          onClick={() => setShowDetails((visible) => !visible)}
        >
          {showDetails ? 'Sembunyikan Detail' : 'Lihat Detail'}
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => onToggleStatus(activity.id)}
        >
          Tandai {isComplete ? 'Terjadwal' : 'Selesai'}
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => onDelete(activity.id)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
