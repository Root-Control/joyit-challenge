import { IAppConfig } from './configuration.interface';

export default (): IAppConfig => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  redis: {
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
  },
});
