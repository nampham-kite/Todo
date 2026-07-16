
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriorityModule } from './modules/priority/priority.module';
import { ProductModule } from './modules/product/product.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'app_db',
      entities: [__dirname + '/database/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule,
    UserModule,
    PriorityModule,
    ProductModule,
  ],
})
export class AppModule {}
