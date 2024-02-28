import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, firstValueFrom } from "rxjs";
import { ProductService } from "../services/product.service";

@Injectable({ providedIn: "root" })
export class ProductStore {
  private readonly _products: BehaviorSubject<any[]> = new BehaviorSubject<
    Array<any>
  >([]);
  public readonly products$: Observable<any[]> = this._products.asObservable();

  constructor(private productService: ProductService) {
    this.load();
  }

  getProducts(): Array<any> {
    return this._products.getValue();
  }
  setProducts(val: Array<any>): void {
    this._products.next(val);
  }

  async load(): Promise<boolean> {
    const response: any = await firstValueFrom(this.productService.getAll());
    if (response instanceof Array) {
      this.setProducts(response);
    } else {
      this.setProducts([]);
    }
    return true;
  }
}
