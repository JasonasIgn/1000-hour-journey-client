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
  journeyId: number;
  hoursSpent: number;
  description: string;
  significanceLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Journey extends JourneyListItem {
  logs: Log[];
}
