interface IAppConfig {
  port: number;
  redis: IRedis;
  jwt: IJwtConfig;
}

interface IJwtConfig {
  privateKey: string;
  publicKey: string;
  ttl: number;
}
interface IRedis {
  port: number;
  host: string;
}

export { IAppConfig, IRedis, IJwtConfig };
