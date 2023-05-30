import { InternalAxiosRequestConfig } from 'axios';

export interface OfflineRequest {
  id: number;
  apiRequest: InternalAxiosRequestConfig<any>;
}
