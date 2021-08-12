import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './user.model';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: User })
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
