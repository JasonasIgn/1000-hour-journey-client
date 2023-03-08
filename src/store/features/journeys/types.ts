export interface JourneyListItem {
  id: number;
  title: string;
  description: string;
  totalHours: number;
  createdAt: Date;
  updatedAt: Date;
  mediaUrl?: string;
  includeInDailyGoal: boolean;
}

export interface Activity {
  id: number;
  journeyId: number;
  name: string;
  updatedAt: Date;
  description: string | null;
  completed: boolean;
  mediaUrl?: string;
  includeInDailyGoal: boolean;
}

export interface Id {
  id: number;
}

export interface Log {
  id: number;
  journeyId: number;
  hoursSpent: number;
  description: string;
  significanceLevel: number;
  loggedOn: Date;
  mediaUrl?: string;
  updatedAt: Date;
  activities: Id[];
}

export interface LogExtended extends Log {
  number: number;
}

export interface Achievement {
  id: number;
  journeyId: number;
  loggedAtHour: number;
  description: string;
  loggedOnDate: Date;
  mediaUrl?: string;
  updatedAt: Date;
  journey?: Journey;
}

export interface Journey extends JourneyListItem {
  logs: Log[];
  achievements: Achievement[];
  activities: Activity[];
}

export interface UpdateJourneyEffectData {
  title?: string;
  description?: string;
  media?: FileList;
  finished?: boolean;
  includeInDailyGoal?: 0 | 1;
}
