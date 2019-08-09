import 'source-map-support/register';
import log from './lib/logger';
import { server } from './server/server';
import config from './lib/config';

(async () => {
  try {
    await config.load();
    process.title = process.env.PROC_TITLE || 'node';
    await server();
  }
  catch (error) {
    log.error('UNHANDLED_ERROR', 'An unhandled exception has caused the app to terminate', { error });
    process.exit(1);
  }
})();
