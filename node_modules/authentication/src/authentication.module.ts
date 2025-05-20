import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import {UsersModule} from "./users/users.module";


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://usamaconversions:12345@cluster0.of8yhdt.mongodb.net/monorepo'),
    UsersModule,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
