import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [ProductsModule, LoginModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
