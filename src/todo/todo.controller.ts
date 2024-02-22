import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async findAll() {
        return this.todoService.findAll()
    }

    @Post()
    create(@Body() body) {
        const { title, content } = body;
        return this.todoService.create(title, content);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body('checked') checked: Boolean) {
        this.todoService.update(id, checked)
    }
    @Delete(':id')
    remove(@Param('id') id: number) {
        this.todoService.delete(id);
    }
}
