import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class InvoiceDraftCorrelativeService {
  constructor(private http: HttpClient) {}

  create(): Observable<any> {
    return this.http.post(
      `${environment.backendHost}/invoice-draft-correlatives`,
      null
    );
  }
}
