import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { InvoiceDraftCorrelativesModule } from './invoice-draft-correlatives/invoice-draft-correlatives.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'mysql',
          connection: {
            database: configService.get('DATABASE_NAME'),
            user: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASS'),
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'),
          },
        },
      }),
      inject: [ConfigService]
    }),
    ClientsModule,
    ProductsModule,
    InvoicesModule,
    InvoiceDraftCorrelativesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
