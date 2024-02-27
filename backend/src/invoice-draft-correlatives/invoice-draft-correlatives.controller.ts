import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceDraftCorrelativesService } from './invoice-draft-correlatives.service';

@Controller('invoice-draft-correlatives')
export class InvoiceDraftCorrelativesController {
  constructor(private readonly invoiceDraftCorrelativesService: InvoiceDraftCorrelativesService) {}

  @Post()
  async create() {
    return this.invoiceDraftCorrelativesService.create();
  }
}
