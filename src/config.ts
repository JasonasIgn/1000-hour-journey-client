export const API_BASE = "http://localhost:3333";

export const apiUrls = {
  fetchJourneysList: `${API_BASE}/journeys`,
  createJourney: `${API_BASE}/journeys`,
  fetchJourney: `${API_BASE}/journeys/{id}`,
  createLog: `${API_BASE}/journey/{id}/logs`,
  logAchievement: `${API_BASE}/journey/{id}/achievements`,
};
