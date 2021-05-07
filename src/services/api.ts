import axios from 'axios';

const apiConnection = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333'
      : 'https://api.jrmcompensados.com',

  // baseURL: 'http://localhost:3333',
  // baseURL: 'https://api.jrmcompensados.com',
});

export default apiConnection;
