// Session utilisateur conservée dans le navigateur (jeton JWT + nom d'utilisateur).
const TOKEN_KEY = 'grh_token';
const USER_KEY = 'grh_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUsername = () => localStorage.getItem(USER_KEY);
export const isAuthenticated = () => Boolean(getToken());

export const saveSession = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
