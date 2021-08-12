import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
