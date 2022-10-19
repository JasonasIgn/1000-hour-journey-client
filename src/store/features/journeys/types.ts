export interface JourneyListItem {
  id: number;
  title: string;
  description: string;
  totalHours: number;
  createdAt: Date;
  updatedAt: Date;
  mediaUrl?: string;
}

export interface Tag {
  id: number;
  journeyId: number;
  name: string;
  updatedAt: Date;
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
  tags: Tag[];
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
}

export interface Journey extends JourneyListItem {
  logs: Log[];
  achievements: Achievement[];
  tags: Tag[];
}
