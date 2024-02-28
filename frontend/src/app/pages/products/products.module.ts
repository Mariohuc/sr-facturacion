import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateProductComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, ProductsRoutingModule
  ]
})
export class ProductsModule { }
