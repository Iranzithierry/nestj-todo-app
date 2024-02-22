import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { hashPassword } from 'src/lib/auth';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private users: Repository<User>
    ) { }

    async create(username: string, password: string) {
        const user = new User();
        user.username = username;
        user.password = await hashPassword(password);
        user.apiKey = randomBytes(16).toString('hex').toUpperCase();
        user.createdAt = new Date();
        this.users.save(user);
        return user;
    }
}

