import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.entity';
import { UserService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
