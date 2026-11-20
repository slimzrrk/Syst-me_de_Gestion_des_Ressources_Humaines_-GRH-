import axios from 'axios';
import { getToken, clearSession } from './auth';

// Client HTTP unique : l'adresse de l'API se configure via REACT_APP_API_URL.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
});

// Ajoute le jeton de connexion à chaque requête.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Jeton expiré ou invalide : retour à la page de connexion.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config && error.config.url === '/login';
    if (error.response && error.response.status === 401 && !isLoginRequest) {
      clearSession();
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  },
);

// Message d'erreur lisible pour l'utilisateur.
export const errorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return "Impossible de contacter le serveur : vérifiez que l'API est démarrée.";
};

export const formatDate = (value) => (value ? new Date(value).toLocaleDateString('fr-FR') : '');

export default api;
