import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class ProductsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async create(createProductDto: CreateProductDto) {
    const [newId] = await this.knex('product').insert({ ...createProductDto }, [
      'id',
    ]);
    return { id: newId, ...createProductDto };
  }

  async findAll() {
    return this.knex.table('product');
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
