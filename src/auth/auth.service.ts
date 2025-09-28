import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from './utils/hashpassword';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import bcrypt from 'node_modules/bcryptjs';
import { LoginDto } from './dto/login.dto';
import { access } from 'fs';
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signup(signupdto: SignupDto): Promise<User | null> {
        console.log(signupdto.password)
        const user = await this.userService.findByEmail(signupdto.email)
        if (user) {
            throw ('This email already in use')
        }
        const hashedPassword = await hashPassword(signupdto.password)
        return this.userService.registerUser({ ...signupdto, password: hashedPassword });
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}
