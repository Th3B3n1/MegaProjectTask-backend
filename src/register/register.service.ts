import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RegisterService {
  constructor(private prismaService: PrismaService) {}
  async create(registerDto: RegisterDto) {
    return await this.prismaService.user.create({
      data: registerDto,
    });
  }
}
