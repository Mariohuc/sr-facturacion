import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductStore } from "app/common/stores/product.store";

@Component({
  selector: "app-invoice-detail",
  templateUrl: "./invoice-detail.component.html",
  styleUrls: ["./invoice-detail.component.scss"],
})
export class InvoiceDetailComponent implements OnInit {
  detailForm: FormGroup;
  @Input() invoicingId!: string;
  @Input() readInvoiceDetail: any;
  @Output() addInvoiceDetailEvent = new EventEmitter<any>();
  @Output() removeInvoiceDetailEvent = new EventEmitter<any>();

  readonly: boolean;

  constructor(
    public productStore: ProductStore,
    private readonly formBuilder: FormBuilder
  ) {
    this.detailForm = this.formBuilder.group({
      invoicing_id: [""],
      quantity: [
        "",
        [
          Validators.pattern("^0|[1-9]\\d*$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      discount: [
        "",
        [Validators.pattern("^[0-9]\\d*(\\.\\d+)?$"), Validators.maxLength(15)],
      ],
      product_description: ["", [Validators.required]],
      product_unit_value: ["", [Validators.required]],
      product_unit_code: ["", [Validators.required]],
      product_apply_igv: [false],
    });
  }

  ngOnInit(): void {
    if (this.readInvoiceDetail) {
      this.readonly = true;
      this.detailForm.patchValue({
        ...this.readInvoiceDetail,
      });
    } else {
      this.detailForm.patchValue({
        invoicing_id: this.invoicingId
      });
    }
  }

  addInvoiceDetail() {
    this.addInvoiceDetailEvent.emit(
      this.formBuilder.group({
        ...this.detailForm.value,
      })
    );

    this.resetDetailForm();
  }

  removeInvoiceDetail() {
    this.removeInvoiceDetailEvent.emit();
  }

  private resetDetailForm() {
    (document.getElementById('product-select') as any).value = "";
    this.detailForm.reset({
      invoicing_id: this.invoicingId,
      quantity: "",
      discount: "",
      product_description: "",
      product_unit_value: "",
      product_unit_code: "",
      product_apply_igv: false,
    });
  }

  onChangeProduct(newValue: string) {
    const ID = Number(newValue);
    const product = this.productStore
      .getProducts()
      .find((item) => item.id == ID);

    this.detailForm.patchValue({
      product_description: product.description,
      product_unit_value: product.unit_value,
      product_unit_code: product.unit_code,
      product_apply_igv: product.apply_igv == 1 ? true : false,
    });
  }

  get UnitPrice() {
    if (this.detailForm.get("product_unit_value").errors) return "";

    return (
      parseFloat(this.detailForm.get("product_unit_value").value) *
      (this.detailForm.get("product_apply_igv").value ? 1.18 : 1)
    ).toFixed(2);
  }

  get TotalPrice() {
    if (
      this.detailForm.get("product_unit_value").errors ||
      this.detailForm.get("quantity").errors
    )
      return "";

    return (
      parseFloat(this.detailForm.get("product_unit_value").value) *
        (this.detailForm.get("product_apply_igv").value ? 1.18 : 1) *
        parseFloat(this.detailForm.get("quantity").value) -
      parseFloat(this.detailForm.get("discount").value || 0)
    ).toFixed(2);
  }
}
