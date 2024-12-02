import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCartUpdated = false;
  isCartEmpty = true;
  cartLength: number = 0;

  constructor(public loginService: LoginService, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartUpdatedListener().subscribe(cart => {
      this.cartLength = cart.length;
      this.isCartEmpty = cart.length === 0;
      this.triggerCartUpdateAnimation();
    });
  }

  logout() {
    this.loginService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  openCart() {
    this.router.navigate(['/carrito']);
  }

  private triggerCartUpdateAnimation() {
    this.isCartUpdated = true;
    setTimeout(() => this.isCartUpdated = false, 1000); // Ajusta el tiempo según sea necesario
  }
}
