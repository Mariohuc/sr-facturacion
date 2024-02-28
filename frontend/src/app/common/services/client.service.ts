import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ClientService {
  constructor(private http: HttpClient) {}

  create(createClientPayload: any): Observable<any> {
    return this.http.post(
      `${environment.backendHost}/clients`,
      createClientPayload
    );
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.backendHost}/clients`);
  }
}
