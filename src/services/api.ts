import axios from 'axios';

const apiConnection = axios.create({
  baseURL: 'https://api.jrmcompensados.com',
});

export default apiConnection;
