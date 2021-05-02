import axios from 'axios';

const apiConnection = axios.create({
  baseURL: 'https://api.jrmcompensados.com',
  // baseURL: 'http://localhost:3333',
});

export default apiConnection;
