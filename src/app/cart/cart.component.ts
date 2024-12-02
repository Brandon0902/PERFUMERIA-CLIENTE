import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ShipperService } from '../services/shipper.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  shippers: any[] = [];
  selectedShipperId: number | null = null;
  shippingCost: number = 0;
  total: number = 0;
  userCity: string = '';
  userPostalCode: string = '';
  userColony: string = '';
  userAddress: string = '';

  constructor(private cartService: CartService, private http: HttpClient, private shipperService: ShipperService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al observable del carrito
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.updateTotal();
    });

    this.shipperService.getShippers().subscribe(data => {
      this.shippers = data.shippers;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.updateTotal();
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.updateTotal();
  }

  increaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, 1);
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.updateTotal();
    });
  }

  decreaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, -1);
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.updateTotal();
    });
  }

  updateTotal() {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.total = subtotal + this.shippingCost;
  }

  onShippingChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.shippingCost = parseFloat(selectElement.value);
    this.updateTotal();
  }

  checkout() {
    const userId = localStorage.getItem('userId'); 
  
    const orderData = {
      userId: userId,
      userCity: this.userCity,
      userPostalCode: this.userPostalCode,
      userColony: this.userColony,
      userAddress: this.userAddress,
      freight: this.shippingCost,
      shipVia: this.selectedShipperId, 
      products: this.cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };
  
    console.log('Order Data:', orderData); // Verifica los datos que se están enviando
  
    this.http.post('http://127.0.0.1:8000/api/orders', orderData).subscribe(
      (response: any) => {
        console.log('Orden creada exitosamente', response);
        this.cartService.clearCart();
        this.router.navigate(['/order-success'], { queryParams: { id: response.orderId } });
      },
      (error) => {
        console.error('Error al crear la orden', error);
        if (error.error && error.error.errors) {
          // Muestra los errores de validación si están disponibles
          console.error('Errores de validación:', error.error.errors);
        }
      }
    );
  }
}
