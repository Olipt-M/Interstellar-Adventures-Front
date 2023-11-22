import { ofetch } from 'ofetch';
const api = ofetch.create({baseURL: 'http://127.0.0.1:8000/api'}); //serveur local de Laravel

export const getPlanets = async (page = 1, limit = 5) => {
  return api(`/planets/${page}/${limit}`, { method: 'GET' });
}

// export const getNbOfPlanets = async () => api(`/planets`, { method: 'GET' })
//   .then(response => response.length)

export const getPlanet = async (id) => {
  return api (`/planets/${id}`, { method: 'GET' });
}

export const getShips = async () => {
  return api(`/ships`, { method: 'GET' });
}

export const getClimates = async () => {
  return api(`/climates`, { method: 'GET' });
}

export const getJourneyTypes = async () => {
  return api(`/journey-types`, { method: 'GET' });
}

export const registerJourney = async (journey) => {
  return api(`/journeys`, { method: 'POST', body: journey });
}
// Récupère TOUS les VOYAGES
export const getJourneys = async () => {
  return api(`/journeys`, { method: 'GET' });
}
// Récupère les voyages en fonction de l'id de l'utilisateur :

export const getUserJourneys = async (id) => {
  return api(`/journeys/user/${id}`, { method: 'GET' });
}

export const signUp = async (credentials) => {
  return api(`/auth/register`, { method: 'POST', body: credentials });
}

export const signIn = async (credentials) => {
  return api(`/auth/login`, { method: 'POST', body: credentials });
}