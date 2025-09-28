import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepo.findOne({ where: { email: email } })
        return user;
    }

    async registerUser(signupdto: SignupDto): Promise<User | null> {
        const user = this.userRepo.create(signupdto);
        return this.userRepo.save(user);
    }

    async getAllUsers() {
        return this.userRepo.find();
    }
}
