interface IAppConfig {
  port: number;
  redis: IRedis;
}

interface IRedis {
  port: number;
  host: string;
}

export { IAppConfig, IRedis };
