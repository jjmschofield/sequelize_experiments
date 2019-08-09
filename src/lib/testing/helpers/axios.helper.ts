import axios, { AxiosInstance } from 'axios';
import https from 'https';

export const createInsecureClient = (): AxiosInstance =>
  axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
