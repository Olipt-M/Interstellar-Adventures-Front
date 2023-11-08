import { ofetch } from 'ofetch';
const api = ofetch.create({baseURL: 'http://127.0.0.1:8000/api'}); //serveur local de Laravel

export const getPlanets = async () => {
  return api(`/planets`, { method: 'GET' });
}

export const getClimates = async () => {
  return api(`/climates`, { method: 'GET' });
}