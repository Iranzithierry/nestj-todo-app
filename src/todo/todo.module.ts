import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TypeOrmModule.forFeature([User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
