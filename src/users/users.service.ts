import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createUserDto: CreateUserDto) {
        const { email, name, password } = createUserDto;

        const userAlreadyExists = await this.prismaService.user.findFirst({
            where: { email },
        });

        if (userAlreadyExists) {
            throw new BadRequestException('USER ALREADY EXITS');
        }

        const hashedPassword = await hash(password, 12);

        const user = await this.prismaService.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                categories: {
                    createMany: {
                        data: [
                            {
                                name: 'Salário',
                                icon: 'salary',
                                type: 'INCOME',
                            },
                            {
                                name: 'Freelance',
                                icon: 'freelance',
                                type: 'INCOME',
                            },
                            {
                                name: 'Outro',
                                icon: 'other',
                                type: 'INCOME',
                            },
                            {
                                name: 'Casa',
                                icon: 'home',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Alimentação',
                                icon: 'food',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Educação',
                                icon: 'education',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Lazer',
                                icon: 'fun',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Mercado',
                                icon: 'grocery',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Roupas',
                                icon: 'clothes',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Transporte',
                                icon: 'transport',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Viagem',
                                icon: 'travel',
                                type: 'EXPENSE',
                            },
                            {
                                name: 'Outro',
                                icon: 'other',
                                type: 'EXPENSE',
                            },
                        ],
                    },
                },
            },
        });

        return {
            name: user.name,
            email: user.email,
        };
    }
}
