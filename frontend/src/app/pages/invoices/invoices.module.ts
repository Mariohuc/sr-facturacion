import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';



@NgModule({
  declarations: [
    CreateInvoiceComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
