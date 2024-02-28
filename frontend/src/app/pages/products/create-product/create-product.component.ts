import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotifierHelper } from "app/common/helpers/notifier.helper";
import { ProductService } from "app/common/services/product.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  mainForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly notifierHelper: NotifierHelper
  ) {
    this.mainForm = this.formBuilder.group({
      description: [
        "",
        [
          Validators.pattern("^[^-\\s][A-zÀ-ú\\s\\u00C0]+$"),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      unit_value: [
        "",
        [
          Validators.pattern("^[0-9]\\d*(\\.\\d+)?$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      stock: [
        "",
        [
          Validators.pattern("^0|[1-9]\\d*$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      unit_code: ["", [Validators.maxLength(10), Validators.required]],
      apply_igv: [false],
    });
  }

  ngOnInit(): void {}

  async createProduct() {
    try {
      const response: any = await firstValueFrom(
        this.productService.create({
          ...this.mainForm.value,
          unit_value: parseFloat(this.mainForm.value.unit_value),
          stock: parseInt(this.mainForm.value.stock, 10),
        })
      );
      this.notifierHelper.notifySuccess("Producto guardado");
      this.mainForm.reset({
        description: "",
        unit_value: "",
        unit_code: "",
        stock: "",
        apply_igv: false,
      });
    } catch (error) {
      this.notifierHelper.notifyError(error);
    }
  }
}
