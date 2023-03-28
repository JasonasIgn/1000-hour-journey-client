export interface UserAchievementProgress {
  id: number;
  progress: number;
  achievement: UserAchievement;
  meta: {
    currentLevel: {
      progress: UserAchievementLevelProgress;
      level: UserAchievementLevel;
    };
  };
}

export interface UserAchievement {
  id: number;
  title: string;
  mediaUrl: string;
}

export interface UserAchievementLevelProgress {
  id: number;
  completed: boolean;
  rewardClaimed: boolean;
}

export interface UserAchievementLevel {
  id: number;
  description: string;
  progressRequired: number;
  level: number;
  rewardPoints: number;
}
