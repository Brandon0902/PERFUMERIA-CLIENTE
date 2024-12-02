import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './order/order.component';
import { CompanyComponent } from './company/company.component';
import { eslogueadoGuard } from './guardias/eslogueado.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
    { path: 'catalogo', component: ProductsComponent },
    {path: "login", component: LoginComponent},
    {path: "catalogo/detalle/:id", component: ProductsDetailComponent},
    { path: 'carrito', component: CartComponent, canActivate:[eslogueadoGuard] },
    { path: 'order-success', component: OrderSuccessComponent },
    { path: 'orders', component: OrdersComponent, canActivate:[eslogueadoGuard]},
    {path: 'nosotros', component: CompanyComponent}
];
