import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateInvoiceComponent } from "./create-invoice/create-invoice.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "create-invoice",
    pathMatch: "full",
  },
  {
    path: "create-invoice",
    component: CreateInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
