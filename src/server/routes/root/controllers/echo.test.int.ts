import { createInsecureClient } from '../../../../lib/testing/helpers/axios.helper';
import { AxiosInstance } from 'axios';

// @ts-ignore
const baseUrl = `https://${global.__HOST__}:${global.__HTTPS_PORT__}`;

describe('src/server/routes/root/controllers/echo.ts', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = createInsecureClient();
  });

  it('should respond to requests with 200OK when successful', async () => {
    // Arrange
    const expectedStatusCode = 200;

    // Act
    const result = await axiosInstance.get(`${baseUrl}/echo`);

    // Assert
    expect(result.status).toEqual(expectedStatusCode);
  });

  describe('given a valid message', () => {
    it('should return the message', async () => {
      // Arrange
      const expectedMessage = 'Some message';
      const expectedResponse = {
        message: expectedMessage,
      };

      // Act
      const result = await axiosInstance.get(`${baseUrl}/echo?message=${expectedMessage}`);

      // Assert
      expect(result.data).toEqual(expectedResponse);
    });
  });
});
