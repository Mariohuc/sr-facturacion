import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class InvoicesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const { details, ...headerProps } = createInvoiceDto;
    const [newId] = await this.knex('invoicing_header').insert(
      { ...headerProps },
      ['id'],
    );
    await this.knex('invoicing_detail').insert(details);
    return { id: newId, ...headerProps };
  }

  async findAll() {
    return this.knex.table('invoicing_header');
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
