import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { CustomersModule } from './customers/customers.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [RolesModule, PrismaModule, UsersModule, AuthModule, ItemsModule, CustomersModule, SalesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
