import { AxiosInstance } from 'axios';

import { createInsecureClient } from '../../../../lib/testing/helpers/axios.helper';
import { STATUS_CODES } from '../../../../lib/koa';

// @ts-ignore
const baseUrl = `https://${global.__HOST__}:${global.__HTTPS_PORT__}`;

describe('src/server/routes/error/controllers/error.ts', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = createInsecureClient();
  });

  describe('unexpectedCtrl', () => {
    it('should return a 500 error code', async () => {
      const expectedResponse = STATUS_CODES.INTERNAL_SERVER_ERROR;

      try {
        await axiosInstance.get(`${baseUrl}/error/unexpected`);
        throw new Error('Request did not fail');
      }
      catch (error) {
        if(!error.response) throw error;
        expect(error.response.status).toEqual(expectedResponse);
      }
    });

    it('should obscure any internal error message', async () => {
      const expectedResponse = {
        error: 'Internal Server Error',
        message: 'An internal server error occurred',
        statusCode: 500,
      };

      try {
        await axiosInstance.get(`${baseUrl}/error/unexpected`);
        throw new Error('Request did not fail');
      }
      catch (error) {
        if(!error.response) throw error;
        expect(error.response.data).toEqual(expectedResponse);
      }
    });
  });

  describe('expectedCtrl', () => {
    it('should return a 504 error code', async () => {
      const expectedResponse = STATUS_CODES.BAD_GATEWAY;

      try {
        await axiosInstance.get(`${baseUrl}/error/expected`);
        throw new Error('Request did not fail');
      }
      catch (error) {
        if(!error.response) throw error;
        expect(error.response.status).toEqual(expectedResponse);
      }
    });

    it('should obscure any internal error message', async () => {
      const expectedResponse = {
        error: 'Bad Gateway',
        message: 'Some expected message',
        statusCode: 502,
      };

      try {
        await axiosInstance.get(`${baseUrl}/error/expected`);
        throw new Error('Request did not fail');
      }
      catch (error) {
        if(!error.response) throw error;
        expect(error.response.data).toEqual(expectedResponse);
      }
    });
  });
});
