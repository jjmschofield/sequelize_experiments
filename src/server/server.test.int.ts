import axios from 'axios';
import { createInsecureClient } from '../lib/testing/helpers/axios.helper';

// @ts-ignore
const host = global.__HOST__;
// @ts-ignore
const httpPort = global.__HTTP_PORT__;
// @ts-ignore
const httpsPort = global.__HTTPS_PORT__;

describe('src/lib/index.ts', () => {
  it('should be listening on the http port', async () => {
    // Arrange
    const expectedStatusCode = 200;

    // Act
    const result = await axios.get(`http://${host}:${httpPort}`);

    // Assert
    expect(result.status).toEqual(expectedStatusCode);
  });

  it('should be listening on the https port', async () => {
    // Arrange
    const expectedStatusCode = 200;
    const axiosInstance = createInsecureClient();

    // Act
    const result = await axiosInstance.get(`https://${host}:${httpsPort}`);

    // Assert
    expect(result.status).toEqual(expectedStatusCode);
  });
});
