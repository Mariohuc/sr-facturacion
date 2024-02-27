import { Module } from '@nestjs/common';
import { InvoiceDraftCorrelativesService } from './invoice-draft-correlatives.service';
import { InvoiceDraftCorrelativesController } from './invoice-draft-correlatives.controller';

@Module({
  controllers: [InvoiceDraftCorrelativesController],
  providers: [InvoiceDraftCorrelativesService],
})
export class InvoiceDraftCorrelativesModule {}
