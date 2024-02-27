import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class ClientsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async create(createClientDto: CreateClientDto) {
    const [newId] = await this.knex('client').insert({ ...createClientDto }, [
      'id',
    ]);
    return { id: newId, ...createClientDto };
  }

  async findAll() {
    return this.knex.table('client');
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
