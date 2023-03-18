export const API_BASE = `http://${process.env.REACT_APP_API_BASE}:3333`;

export const apiUrls = {
  fetchJourneysList: `${API_BASE}/journeys`,
  createJourney: `${API_BASE}/journeys`,
  fetchJourney: `${API_BASE}/journeys/{journeyId}`,
  createLog: `${API_BASE}/journey/{journeyId}/logs`,
  updateLog: `${API_BASE}/journey/{journeyId}/logs/{logId}`,
  logAchievement: `${API_BASE}/journey/{journeyId}/achievements`,
  editAchievement: `${API_BASE}/journey/{journeyId}/achievements/{achievementId}`,
  deleteAchievement: `${API_BASE}/journey/{journeyId}/achievements/{achievementId}`,
  updateJourney: `${API_BASE}/journeys/{journeyId}`,
  logStatistics: `${API_BASE}/logs/statistics`,
  getLogs: `${API_BASE}/logs`,
  deleteLog: `${API_BASE}/journey/{journeyId}/logs/{logId}`,
  isLoggedIn: `${API_BASE}/amILoggedIn`,
  login: `${API_BASE}/login`,
  logout: `${API_BASE}/logout`,
  createActivity: `${API_BASE}/journey/{journeyId}/activities`,
  updateActivity: `${API_BASE}/journey/{journeyId}/activities/{activityId}`,
  deleteActivity: `${API_BASE}/journey/{journeyId}/activities/{activityId}`,
  fetchAchievements: `${API_BASE}/achievements`,
  fetchDailyGoal: `${API_BASE}/dailygoal`,
  fetchPoints: `${API_BASE}/points`,
};

export const routes = {
  login: "/login",
  journeys: "/journeys",
  journey: "/journeys/:journeyId",
  journeyActivities: "/journeys/:journeyId/activities",
  journeySettings: "/journeys/:journeyId/settings",
  statistics: "/statistics",
  statisticsLogs: "/statistics/logs",
  statisticsAchievements: "/statistics/achievements",
};
