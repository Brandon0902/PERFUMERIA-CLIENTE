import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://127.0.0.1:8000/api/login";

  constructor(private router: Router, private http: HttpClient) {}

  login(user: object) {
    return this.http.post<any>(this.url, user);
  }

  guardarSesion(user: any) {
    // Guarda el token en el localStorage
    localStorage.setItem("usuario", user.user.email);
    localStorage.setItem("token", user.access_token); 
    localStorage.setItem("userId", user.user.id); 
    this.router.navigate(["/catalogo"]); 
  }

  esLogueado(): boolean {
    return localStorage.getItem("usuario") !== null;
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
