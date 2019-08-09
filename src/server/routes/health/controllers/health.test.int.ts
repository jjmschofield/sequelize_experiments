import { createInsecureClient } from '../../../../lib/testing/helpers/axios.helper';
import { AxiosInstance } from 'axios';

// @ts-ignore
const baseUrl = `https://${global.__HOST__}:${global.__HTTPS_PORT__}`;

describe('src/server/routes/health/controllers/health.ts', () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = createInsecureClient();
  });

  it('should respond to requests with 200OK when successful', async () => {
    // Arrange
    const expectedStatusCode = 200;

    // Act
    const result = await axiosInstance.get(`${baseUrl}/health`);

    // Assert
    expect(result.status).toEqual(expectedStatusCode);
  });

  it('should return health information', async () => {
    // Arrange
    const expectedResponse = {
      status: 'UP',
      uptime: expect.any(Number),
      hostname: expect.any(String),
      nics: expect.any(Object),
      cpu: expect.objectContaining({
        cpus: expect.any(Array),
        loadavg: expect.any(Array),
      }),
      mem: expect.objectContaining({
        total: expect.any(Number),
        free: expect.any(Number),
      }),
    };

    // Act
    const result = await axiosInstance.get(`${baseUrl}/health`);

    // Assert
    expect(result.data).toMatchObject(expectedResponse);
  });
});
