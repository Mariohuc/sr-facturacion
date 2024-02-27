import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class InvoiceDraftCorrelativesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async create() {
    const [item] = await this.knex.table('invoice_draft_correlative');
    let correlative = undefined;
    if (!item) {
      await this.knex('invoice_draft_correlative').insert({ counter: 0 });
      correlative = 0;
    } else {
      await this.knex('invoice_draft_correlative').update(
        'counter',
        item.counter + 1,
      );
      correlative = item.counter + 1;
    }
    return {
      correlative: 'B000-' + String(correlative).padStart(8, '0'),
    };
  }
}
