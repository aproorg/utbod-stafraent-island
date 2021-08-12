import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: jest.fn(() => ({
            findAll: () => [],
          })),
        },
      ],
    }).compile();

    userController = user.get<UserController>(UserController);
    userService = user.get<UserService>(UserService);
  });

  describe('root', () => {
    it('should return users', async () => {
      const users: User[] = [
        {
          id: '1',
          firstName: 'Jón',
          lastName: 'Jónsson',
          isActive: true,
        },
      ] as User[];
      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(() => Promise.resolve(users));
      const result = await userController.getUsers();
      expect(result).toEqual(users);
    });
  });
});
