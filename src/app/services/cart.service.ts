import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartUpdated = new BehaviorSubject<any[]>(this.cart); // BehaviorSubject para emitir cambios

  constructor() { }

  getCart() {
    return this.cartUpdated.asObservable(); // Retorna el observable del carrito
  }

  addToCart(product: any): void {
    console.log('Añadiendo al carrito:', product);
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartUpdated.next(this.cart); // Notificar que el carrito se ha actualizado
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartUpdated.next(this.cart); // Notificar que el carrito se ha actualizado
  }

  clearCart(): void {
    this.cart = [];
    this.cartUpdated.next(this.cart); // Notificar que el carrito se ha actualizado
  }

  updateQuantity(productId: number, change: number): void {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
      this.cartUpdated.next(this.cart); // Notificar que el carrito se ha actualizado
    }
  }

  getCartUpdatedListener() {
    return this.cartUpdated.asObservable(); // Retornar el observable para suscribirse
  }
}
