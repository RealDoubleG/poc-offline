import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.107.130.59:3000',
  timeout: 5000
});

export default instance;
