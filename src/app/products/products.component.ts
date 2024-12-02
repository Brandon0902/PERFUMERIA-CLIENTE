// products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProductList().subscribe(
      (data: any) => {
        this.products = data.products;
        console.log('Productos obtenidos:', this.products);
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Producto añadido al carrito:', product);
    
    // Redireccionar al carrito
    this.router.navigate(['/carrito']);
  }
}
