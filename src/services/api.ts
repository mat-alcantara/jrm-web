import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jrmcompensados.com',
});

export default api;
