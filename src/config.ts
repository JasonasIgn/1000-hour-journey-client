export const API_BASE = "http://localhost:3333";

export const apiUrls = {
  fetchJourneysList: `${API_BASE}/journeys`,
  createJourney: `${API_BASE}/journeys`,
  fetchJourney: `${API_BASE}/journeys/{journeyId}`,
  createLog: `${API_BASE}/journey/{journeyId}/logs`,
  updateLog: `${API_BASE}/journey/{journeyId}/logs/{logId}`,
  logAchievement: `${API_BASE}/journey/{journeyId}/achievements`,
  updateJourney: `${API_BASE}/journeys/{journeyId}`,
  logStatistics: `${API_BASE}/logs/statistics`,
  getLogs: `${API_BASE}/logs`,
  isLoggedIn: `${API_BASE}/amILoggedIn`,
  login: `${API_BASE}/login`,
  logout: `${API_BASE}/logout`,
};
