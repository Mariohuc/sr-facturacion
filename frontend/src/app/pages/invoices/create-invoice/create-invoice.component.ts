import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotifierHelper } from "app/common/helpers/notifier.helper";
import { InvoiceDraftCorrelativeService } from "app/common/services/invoice-draft-correlative.service";
import { InvoiceService } from "app/common/services/invoice.service";
import { ClientStore } from "app/common/stores/client.store";
import { Observable, firstValueFrom } from "rxjs";

@Component({
  selector: "app-create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.scss"],
})
export class CreateInvoiceComponent implements OnInit {
  mainForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly invoiceService: InvoiceService,
    private readonly notifierHelper: NotifierHelper,
    private readonly invoiceDraftCorrelativeService: InvoiceDraftCorrelativeService,
    public clientStore: ClientStore
  ) {
    this.mainForm = this.formBuilder.group({
      invoicing_id: [""],
      client_id: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      issue_date: ["", [Validators.required]],
      due_date: ["", [Validators.required]],
      payment_condition: ["", [Validators.required]],
      details: this.formBuilder.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.initInvoicingId();
  }

  private async initInvoicingId() {
    const { correlative }: { correlative: string } = await firstValueFrom(
      this.invoiceDraftCorrelativeService.create()
    );
    this.mainForm.patchValue({
      invoicing_id: correlative,
    });
  }

  storeNewInvoiceDetail(newValue: any) {
    this.InvoiceDetails.push(newValue);
  }

  removeInvoiceDetail(itemIndex: number) {
    this.InvoiceDetails.removeAt(itemIndex);
  }
  get InvoiceDetails() {
    return this.mainForm.get("details") as FormArray;
  }
  async createInvoice() {
    try {
      const { details, ...header } = this.mainForm.value;
      const response: any = await firstValueFrom(
        this.invoiceService.create({
          ...header,
          client_id: parseInt(header.client_id, 10),
          details: details.map((item) => ({
            ...item,
            quantity: parseInt(item.quantity, 10),
            discount: item.discount ? parseFloat(item.discount) : 0,
          })),
        })
      );
      this.notifierHelper.notifySuccess("Factura generada");

      this.InvoiceDetails.clear();
      this.mainForm.reset({
        invoicing_id: "",
        client_id: "",
        currency: "",
        issue_date: "",
        due_date: "",
        payment_condition: "",
      });
      this.initInvoicingId();
    } catch (error) {
      this.notifierHelper.notifyError(error);
    }
  }
}
