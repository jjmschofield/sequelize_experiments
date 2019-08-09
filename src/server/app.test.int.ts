import { AxiosInstance } from 'axios';
import { createInsecureClient } from '../lib/testing/helpers/axios.helper';


// @ts-ignore
const baseUrl = `https://${global.__HOST__}:${global.__HTTPS_PORT__}`;

describe('src/server/app.ts', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = createInsecureClient();
  });

  describe('given a request for an endpoint with a method that does not exist', () => {
    it('should respond with a method not allowed response', async () => {
      const expectedResponse = {
        statusCode: 405,
        error: 'Method Not Allowed',
        message: 'Method Not Allowed',
      };

      try {
        await axiosInstance.post(baseUrl);
        throw new Error('Request did not fail');
      }
      catch (error) {
        if(!error.response) throw error;
        expect(error.response.data).toEqual(expectedResponse);
      }
    });
  });

  describe('given a request for an endpoint which does not exist', () => {
    it('should respond with a not found response', async () => {
      const fakePath = '/i-do-not-exist';
      const expectedResponse = {
        error: 'Not Found',
        message: `Could not find ${fakePath}`,
        statusCode: 404,
      };

      try {
        await axiosInstance.post(`${baseUrl}${fakePath}`);
        throw new Error('Request did not fail');
      }
      catch (error) {
        if(!error.response) throw error;
        expect(error.response.data).toEqual(expectedResponse);
      }
    });
  });
});
