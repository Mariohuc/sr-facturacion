import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, firstValueFrom } from "rxjs";
import { ClientService } from "../services/client.service";

@Injectable({ providedIn: "root" })
export class ClientStore {
  private readonly _clients: BehaviorSubject<any[]> = new BehaviorSubject<
    Array<any>
  >([]);
  public readonly clients$: Observable<any[]> = this._clients.asObservable();

  constructor(private clientService: ClientService) {
    this.load();
  }

  getClients(): Array<any> {
    return this._clients.getValue();
  }
  setClients(val: Array<any>): void {
    this._clients.next(val);
  }

  async load(): Promise<boolean> {
    const response: any = await firstValueFrom(this.clientService.getAll());
    if (response instanceof Array) {
      
      this.setClients(response);
    } else {
      this.setClients([]);
    }
    return true;
  }
}
