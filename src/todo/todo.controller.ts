import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { validate, validateApiKey } from 'src/lib/validate';
import { response } from 'src/helpers/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
        @InjectRepository(Todo)
        private todos: Repository<Todo>,
        private readonly todoService: TodoService
    ) { }

    @Get()
    async findAll(@Body('apiKey') apiKey: string) {
        const user = await validateApiKey(apiKey, this.users);
        if (user?.status == "error" || user.length == 0) {
            return user;
        }
        const todos = await this.todos.find({ where: { ownedBy: user[0]?.id } });
        return response('Todos', 'success', { todos: todos });
    }
    @Post()
    async create(
        @Body() body,
    ) {
        const { title, content, apiKey } = body;
        const validation = validate(
            {
                title,
                content,
                apiKey
            },
            {
                title: { required: true },
                content: { required: true },
                apiKey: { required: true }
            }
        )
        if (validation) {
            return response(validation, 'error');
        }
        const user = await validateApiKey(apiKey, this.users);
        if (user?.status == "error" || user.length == 0) {
            return user;
        }
        return this.todoService.create(title, content, user[0].id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('checked') checked: Boolean,
        @Body('apiKey') apiKey: string
    ) {
        const user = await validateApiKey(apiKey, this.users);
        if (user?.status == "error" || user.length == 0) {
            return user;
        }
        const todo = await this.todos.findOneBy({ id: id });
        if (todo?.ownedBy == user[0]?.id) {
            this.todoService.update(id, checked);
            return response('Todo updated', 'success');
        } else {
            return response('You are not authorized to update this todo', 'error');
        }
    }
    @Delete(':id')
    async delete(
        @Param('id') id: number,
        @Body('apiKey') apiKey: string
    ) {
        const user = await validateApiKey(apiKey, this.users);
        if (user?.status == "error" || user.length == 0) {
            return user;
        }
        const todo = await this.todos.findOneBy({ id: id });
        if (todo?.ownedBy == user[0]?.id) {
            this.todoService.delete(id);
            return response('Todo deleted', 'success');
        }
        else {
            return response('You are not authorized to delete this todo', 'error');
        }
    }
}
