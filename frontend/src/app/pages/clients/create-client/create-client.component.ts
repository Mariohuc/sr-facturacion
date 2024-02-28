import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotifierHelper } from "app/common/helpers/notifier.helper";
import { ClientService } from "app/common/services/client.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-create-client",
  templateUrl: "./create-client.component.html",
  styleUrls: ["./create-client.component.scss"],
})
export class CreateClientComponent implements OnInit {
  mainForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientService: ClientService,
    private readonly notifierHelper: NotifierHelper
  ) {
    this.mainForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.pattern("^[^-\\s][A-zÀ-ú\\s\\u00C0]+$"),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      id_card_number: [
        "",
        [
          Validators.pattern("^0|[1-9]\\d*$"),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      address: ["", [Validators.maxLength(50), Validators.required]],
      phone: ["", [Validators.maxLength(20), Validators.required]],
    });
  }

  ngOnInit(): void {}

  async createClient() {
    try {
      const response: any = await firstValueFrom(
        this.clientService.create({
          ...this.mainForm.value,
          id_card_number: parseInt(this.mainForm.value.id_card_number, 10),
        })
      );
      this.notifierHelper.notifySuccess("Cliente guardado");
      this.mainForm.reset({
        name: "",
        id_card_number: "",
        address: "",
        phone: "",
      });
    } catch (error) {
      this.notifierHelper.notifyError(error);
    }
  }
}
