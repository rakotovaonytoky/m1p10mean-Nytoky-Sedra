import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { request } from 'http';
import { Observable, TimeoutError, throwError, catchError, map, timeout, finalize } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../loader/loader.service';

const APP_XHR_TIMEOUT = 7000;
@Injectable({
  providedIn: 'root'
})
export class AppinterceptorService implements HttpInterceptor {
  token: any;

  constructor(private autthservice: AuthService,
    private route: Router,
    private loaderService: LoaderService) { }
  totalrequest = 0;
  completedRequest = 0;


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalrequest++;
    return next
      .handle(req)
      .pipe(
        timeout(APP_XHR_TIMEOUT),
        map((res) => this.handleSuccessfulResponse(res)),
        catchError((err) => this.handleErrorResponse(err)),
        finalize(this.handleRequestCompleted.bind(this))
      );
  }




  private handleSuccessfulResponse(event: any): HttpResponse<any> {
    // console.log('response at interceptor', event);

    this.loaderService.isLoading.next(true);
    // if (event instanceof HttpResponse) {
    //   event = event.clone({ body: event.body.response });
    // }

    // const token = this.appService.getAuthToken();

    // return request.clone({
    //   setHeaders: {
    //     Authorization: `Basic ${token}`
    //   }
    // })
    return event;
  }

  private handleErrorResponse(errorResponse: any): Observable<HttpEvent<any>> {

    let printerror = '';

    if (errorResponse instanceof TimeoutError) {
      printerror = 'Timeout request';
      return throwError(() => new Error("Timeout request"));
    }

    switch (errorResponse.status) {
      case 401:

        printerror = 'Mot de passe ou identifiant invalide';
        this.token.signOut();
        break;
      case 503: // Service Unavailable

        // printerror = '503 ';
        break;
      case 500: // Internal Server 

        // printerror = 'Erreur interne du serveur/' + errorResponse.error;
        break;
      case 504:

        // printerror = 'Serveur API erreur';
        break;
      case 403:
        // printerror = 'Une erreur inattendue est survenue';
        break;
      default:

        printerror = errorResponse.message;
    }

    // let customError = new HttpError();
    // try {
    //   customError = HttpError.initWithCode(errorResponse.error.errors[0].code);
    // } catch (e) { }

    return throwError(() => new Error(printerror));
  }

  private handleRequestCompleted(): void {
    this.completedRequest++;
    //  console.log("completed request:" + this.completedRequest + "/" + this.completedRequest);
    if (this.completedRequest === this.totalrequest) {
      this.loaderService.isLoading.next(false);
      this.completedRequest = 0;
      this.totalrequest = 0;
    }
    //  console.log(`Request finished`);
  }
  logout() {

    this.autthservice.signOut();
    this.route.navigate(['/']);

  }
}


