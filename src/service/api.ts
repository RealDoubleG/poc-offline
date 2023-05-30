import axios, { AxiosRequestHeaders } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { insertOfflineRequest } from 'database/offlineApiRequests';

const checkInternetConnectivity = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected ?? false;
};

const instance = axios.create({
  baseURL: 'http://10.107.130.76:3000',
  timeout: 5000
});

instance.interceptors.request.use(
  async (config) => {
    const isConnected = await checkInternetConnectivity();

    if (config.method !== 'get' && isConnected) {
      insertOfflineRequest({ apiRequest: config });

      return Promise.resolve({
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {} as AxiosRequestHeaders,
        config
      });
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
