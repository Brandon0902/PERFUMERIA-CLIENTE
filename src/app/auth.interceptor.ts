import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Obtener el token del localStorage
  const authToken = localStorage.getItem('token');

  // Clonar la solicitud y agregar el encabezado de autorización si el token existe
  const authReq = authToken ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  }) : req;

  console.log('Intercepted request', authReq);

  // Pasar la solicitud clonada al siguiente manejador
  return next(authReq);
};
