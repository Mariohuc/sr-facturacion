import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateProductComponent } from "./create-product/create-product.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "create-product",
    pathMatch: "full",
  },
  {
    path: "create-product",
    component: CreateProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
