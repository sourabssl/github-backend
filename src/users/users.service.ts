import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [];
    private idCounter = 1;

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    create(createUserDto: CreateUserDto) {
        const newUser = { id: this.idCounter++, ...createUserDto };

        if (!newUser.name || !newUser.email) {
            throw new BadRequestException('Name and email are required');
        }

        if (this.users.find((user) => user.email === newUser.email)) {
            throw new BadRequestException('Email already exists');
        }

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (this.users.find((user) => user.email === updateUserDto.email && user.id !== id)) {
            throw new BadRequestException('Email already exists');
        }

        const updatedUser = { ...this.users[userIndex], ...updateUserDto };
        this.users[userIndex] = updatedUser;

        return updatedUser;
    }

    remove(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        this.users.splice(userIndex, 1);

        return { deleted: true };
    }
}
