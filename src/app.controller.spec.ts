import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { LoginPayloadDto } from './modules/authentication/dto/login-payload.dto';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('AppController', () => {
  let appController: AppController;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            createAccessToken: jest
              .fn()
              .mockImplementation(({ userId }) =>
                Promise.resolve(`token-for-${userId}`),
              ),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
    (uuidv4 as jest.Mock).mockReturnValue('test-uuid');
  });

  it('should return a LoginPayloadDto with a token', async () => {
    const result = await appController.getJwtToken();
    expect(result).toBeInstanceOf(LoginPayloadDto);
    expect(result.token).toEqual('token-for-test-uuid');
    expect(authenticationService.createAccessToken).toHaveBeenCalledWith({
      userId: 'test-uuid',
    });
  });
});
