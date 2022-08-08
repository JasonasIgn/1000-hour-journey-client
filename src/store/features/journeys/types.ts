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
  loggedOn: Date;
  createdAt: Date;
  updatedAt: Date;
  mediaUrl?: string;
}

export interface LogExtended extends Log {
  number: number;
}

export interface Journey extends JourneyListItem {
  logs: Log[];
}
