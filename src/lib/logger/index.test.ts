import { createConsoleMock } from '../testing/mocks/console.mock';

import underTest from './index';

describe('src/lib/index.ts', () => {
  let consoleMocks : any;

  beforeEach(() => {
    consoleMocks = createConsoleMock();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should log a given error message with a prefix', () => {
    // Arrange
    const fakeMessage = 'some message';
    const fakeCode = 'SOME_CODE';
    const expectedMessage = `[ERROR][${fakeCode}] ${fakeMessage}`;

    // Act
    underTest.error(fakeCode,fakeMessage, {});

    // Assert
    expect(consoleMocks.errorSpy).toHaveBeenCalledWith(expectedMessage, {});
  });

  it('should log a given warning message with a prefix', () => {
    // Arrange
    const fakeMessage = 'some message';
    const fakeCode = 'SOME_CODE';
    const expectedMessage = `[WARN][${fakeCode}] ${fakeMessage}`;

    // Act
    underTest.warn(fakeCode,fakeMessage,{});

    // Assert
    expect(consoleMocks.warnSpy).toHaveBeenCalledWith(expectedMessage, {});
  });

  it('should log a given info message with a prefix', () => {
    // Arrange
    const fakeMessage = 'some message';
    const fakeCode = 'SOME_CODE';
    const expectedMessage = `[INFO][${fakeCode}] ${fakeMessage}`;

    // Act
    underTest.info(fakeCode,fakeMessage,{});

    // Assert
    expect(consoleMocks.logSpy).toHaveBeenCalledWith(expectedMessage, {});
  });

  it('should log a given verbose message with a prefix', () => {
    // Arrange
    const fakeMessage = 'some message';
    const fakeCode = 'SOME_CODE';
    const expectedMessage = `[VERBOSE][${fakeCode}] ${fakeMessage}`;

    // Act
    underTest.verbose(fakeCode,fakeMessage,{});

    // Assert
    expect(consoleMocks.logSpy).toHaveBeenCalledWith(expectedMessage, {});
  });

  it('should log a given debug message with a prefix', () => {
    // Arrange
    const fakeMessage = 'some message';
    const fakeCode = 'SOME_CODE';
    const expectedMessage = `[DEBUG][${fakeCode}] ${fakeMessage}`;

    // Act
    underTest.debug(fakeCode,fakeMessage,{});

    // Assert
    expect(consoleMocks.debugSpy).toHaveBeenCalledWith(expectedMessage, {});
  });

  it('should log a given silly message with a prefix', () => {
    // Arrange
    const fakeMessage = 'some message';
    const fakeCode = 'SOME_CODE';
    const expectedMessage = `[SILLY][${fakeCode}] ${fakeMessage}`;

    // Act
    underTest.silly(fakeCode,fakeMessage,{});

    // Assert
    expect(consoleMocks.debugSpy).toHaveBeenCalledWith(expectedMessage, {});
  });
});
