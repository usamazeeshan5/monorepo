import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './users/user.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'register' })
  async register(createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @MessagePattern({ cmd: 'list-users' })
  async listUsers() {
    return this.userService.findAll();
  }
}
