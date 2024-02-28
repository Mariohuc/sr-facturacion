import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  {
    path: "clients",
    loadChildren: () =>
      import("./clients/clients.module").then((x) => x.ClientsModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then((x) => x.ProductsModule),
  },
  {
    path: "invoices",
    loadChildren: () =>
      import("./invoices/invoices.module").then((x) => x.InvoicesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
