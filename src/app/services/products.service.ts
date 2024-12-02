import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Importar el operador tap

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de productos
  getProductList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productsList`)
      .pipe(
        tap(data => console.log('Product List:', data)), // Registrar la respuesta de la API
        catchError(this.handleError)
      );
  }

  // Método para obtener los detalles de un producto
  getProductDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/productDetail/${id}`)
      .pipe(
        tap(data => console.log('Product Details:', data)), // Registrar la respuesta de la API
        catchError(this.handleError)
      );
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Algo salió mal; por favor intenta de nuevo más tarde.');
  }
}
