import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { comparePassword } from 'src/lib/auth';
import { validate } from 'src/lib/validate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { response } from 'src/helpers/data';

@Injectable()
@Dependencies(UserService)
export class AuthService {
    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
        private userService: UserService
    ) { }

    async signIn(username: string, password: string) {
        const userData = {
            username: username,
            password: password
        }
        const validationRules = {
            username: { required: true },
            password: { required: true }
        };
        const errors = validate(userData, validationRules);
        if (errors) {
            return response(errors, "error");
        }
        const user = await this.users.findOneBy({ username: username });
        if (await
            comparePassword(
                password,
                user?.password ?? '')) {
            return response(
                'Login successful',
                'success',
                { apiKey: user.apiKey })
        }
        else {
            throw new UnauthorizedException();
        }

    }
    async signUp(username: string, password: string) {
        const userData = {
            username: username,
            password: password
        }
        const validationRules = {
            username: { required: true, max: 20, min: 6 },
            password: { required: true, max: 20, min: 6 }
        };
        const errors = validate(userData, validationRules);
        if (errors) {
            return response(errors, "error");
        }
        const user = await this.users.findOneBy({ username: username });
        if (user) {
            return response("Username already exists", "error");
        }
        try {
            const user = await this.userService.create(username, password);
            return response(`${user.username} created successfully`, "success");
        } catch (error) {
            return response("Something went wrong", "error");
        }
    }

}


