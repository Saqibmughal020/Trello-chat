export const setToken = (accessToken: any) =>
  localStorage.setItem('accessToken', accessToken);
export const getToken = () => localStorage.getItem('accessToken');
export const getLanguage = () => localStorage.getItem('language');
