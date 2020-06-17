import axios from 'axios';
import { URN_SERVER } from '../constants/config';

const axiosInstance = axios.create({
  baseURL: URN_SERVER,
});

export default axiosInstance;
