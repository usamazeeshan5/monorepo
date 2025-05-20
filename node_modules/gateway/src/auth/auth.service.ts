import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 8877 },
    });
  }

  register(createUserDto: CreateUserDto) {
    return this.client.send({ cmd: 'register' }, createUserDto).toPromise();
  }

  listUsers() {
    return this.client.send({ cmd: 'list-users' }, {}).toPromise();
  }
}
