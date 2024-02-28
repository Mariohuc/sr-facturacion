import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class InvoiceService {
  constructor(private http: HttpClient) {}

  create(createInvoicePayload: any): Observable<any> {
    return this.http.post(
      `${environment.backendHost}/invoices`,
      createInvoicePayload
    );
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.backendHost}/invoices`);
  }
}
