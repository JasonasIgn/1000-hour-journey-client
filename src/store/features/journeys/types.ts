export interface JourneyListItem {
  id: number;
  title: string;
  description: string;
  totalHours: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Log {
  id: number;
  journey_id: number;
  hours_spent: number;
  description: string;
  significance_level: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Journey extends JourneyListItem {
  logs: Log[];
}
