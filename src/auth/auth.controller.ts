import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() body: Record<string, any>) {
        const { username, password } = body;
        return this.authService.signIn(username, password);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    create(@Body() body: Record<string, any>) {
        const { username, password } = body;
        return this.authService.signUp(username, password);
    }


}