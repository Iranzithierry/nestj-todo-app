import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private todos: Repository<Todo>
    ) { }

    create(title: string, content: string, ownedBy: number) {
        const todo = new Todo();
        todo.title = title;
        todo.content = content;
        todo.ownedBy = ownedBy;
        todo.createdAt = new Date();
        this.todos.save(todo);
    }
    async update(id: number, checked: Boolean) {
        const todo = await this.todos.findOneBy({ id: id });
        if(todo && checked) {
            todo.checkedAt = new Date();
            return this.todos.save(todo);
        }
        return null;
    }
    async delete(id: number) {
        await this.todos.delete(id);
      }
}
