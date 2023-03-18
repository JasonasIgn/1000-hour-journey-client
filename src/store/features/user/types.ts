export interface Reward {
  hoursToLogForReward: number;
  hoursLoggedForReward: number;
  pointsForReward: number;
}

export interface FetchPointsResponse extends Reward {
  points: number;
}
