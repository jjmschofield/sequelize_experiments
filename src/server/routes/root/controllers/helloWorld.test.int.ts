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
    const result = await axiosInstance.get(`${baseUrl}`);

    // Assert
    expect(result.status).toEqual(expectedStatusCode);
  });

  it('should return hello world', async () => {
    // Arrange
    const expectedMessage = 'Hello World!';
    const expectedResponse = {
      message: expectedMessage,
    };

    // Act
    const result = await axiosInstance.get(`${baseUrl}`);

    // Assert
    expect(result.data).toEqual(expectedResponse);
  });
});
