import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateClientComponent } from "./create-client/create-client.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "create-client",
    pathMatch: "full",
  },
  {
    path: "create-client",
    component: CreateClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
