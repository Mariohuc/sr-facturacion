import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateClientComponent } from "./create-client/create-client.component";
import { ClientsRoutingModule } from "./clients-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CreateClientComponent],
  imports: [CommonModule, ReactiveFormsModule, ClientsRoutingModule],
})
export class ClientsModule {}
