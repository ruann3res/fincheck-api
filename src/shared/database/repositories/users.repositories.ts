import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(input: Prisma.UserCreateArgs) {
        return this.prismaService.user.create(input);
    }

    findUnique(findUniqueDTO: Prisma.UserFindUniqueArgs) {
        return this.prismaService.user.findUnique(findUniqueDTO);
    }
}
