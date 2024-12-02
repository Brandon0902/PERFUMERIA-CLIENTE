import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  productDetails: any = {}; // Aquí se guardarán los detalles del producto

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductDetails(id).subscribe(
        (data) => {
          console.log('Product Details:', data); // Para depuración
          this.productDetails = data.product; // Acceder directamente a 'product'
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }
}
