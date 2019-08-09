// tslint:disable-next-line:ter-arrow-body-style
export const createConsoleMock = () => {
  return {
    errorSpy: jest.spyOn(global.console, 'error').mockImplementation(),
    warnSpy: jest.spyOn(global.console, 'warn').mockImplementation(),
    logSpy: jest.spyOn(global.console, 'log').mockImplementation(),
    debugSpy: jest.spyOn(global.console, 'debug').mockImplementation(),
  };
};
