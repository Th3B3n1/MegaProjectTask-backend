import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AutoLoginDto } from './dto/autologin.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(private prismaService: PrismaService) {}
  autoLogin(autoLoginDto: AutoLoginDto) {
  }
  async login(loginDto: LoginDto) {
    return await this.prismaService.user.findFirstOrThrow({
      select: { name: true, email: true },
      where: {
        name: loginDto.name,
        password: loginDto.password,
      },
    });
  }
}
