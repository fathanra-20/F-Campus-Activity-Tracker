import type { Activity } from '../types/activity';
import ActivityItem from './ActivityItem';

interface ActivityListProps {
  activities: Activity[];
  emptyMessage: string;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ActivityList({
  activities,
  emptyMessage,
  onToggleStatus,
  onDelete,
}: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="empty-state activity-empty-state">
        <h3>Tidak ada kegiatan ditemukan</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
