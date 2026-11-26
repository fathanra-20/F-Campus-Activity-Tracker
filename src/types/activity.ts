export type ActivityCategory =
  | 'Akademik'
  | 'Organisasi'
  | 'Seminar & Workshop'
  | 'Pengembangan Diri';

export type ActivityStatus = 'Terjadwal' | 'Selesai';

export interface Activity {
  id: number;
  title: string;
  category: ActivityCategory;
  date: string;
  time: string;
  location: string;
  status: ActivityStatus;
  description: string;
}

export type ActivityDraft = Omit<Activity, 'id' | 'status'>;
