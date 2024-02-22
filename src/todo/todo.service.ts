import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>
    ) { }

    findAll() {
        return this.todoRepository.find();
    }

    create(title: string, content: string) {
        const todo = new Todo();
        todo.title = title;
        todo.content = content;
        todo.createdAt = new Date();
        this.todoRepository.save(todo);
    }
    async update(id: number, checked: Boolean) {
        const todo = await this.todoRepository.findOne({ where: { id: id } });
        if(todo && checked) {
            todo.checkedAt = new Date();
            return this.todoRepository.save(todo);
        }
        return null;
    }
    async delete(id: number) {
        await this.todoRepository.delete(id);
      }
}
