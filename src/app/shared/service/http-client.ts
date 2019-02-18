import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../security/auth.service';
import { LoadingStatusService } from './loading-status';
@Injectable()
export class AppHttpClient {

  headers: HttpHeaders;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private loadingStatusService: LoadingStatusService) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', authService.getToken());
  }

  get (url): Observable<any> {
    this.loadingStatusService.loading();
    return this.http.get(url, { headers: this.headers } )
      .pipe(
        map(response => {
          return (<any>response).data;
        }),
        tap(_ => this.loadingStatusService.loaded()),
        catchError(this.handleError('get', []))
      );
  }

  post (url, data): Observable<any> {
    this.loadingStatusService.loading();
    return this.http.post(url, data, { headers: this.headers } )
      .pipe(
        tap(_ => this.loadingStatusService.loaded()),
        catchError(this.handleError('post', []))
      );
  }

  put (url, data): Observable<any> {
    this.loadingStatusService.loading();
    return this.http.put(url, data, { headers: this.headers } )
      .pipe(
        tap(_ => this.loadingStatusService.loaded()),
        catchError(this.handleError('put', []))
      );
  }

  patch (url, data): Observable<any> {
    this.loadingStatusService.loading();
    return this.http.patch(url, data, { headers: this.headers } )
      .pipe(
        tap(_ => this.loadingStatusService.loaded()),
        catchError(this.handleError('patch', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.loadingStatusService.loaded();
      console.error(error); // log to console instead
      if (error.error.message === 'Invalid token') {
        this.router.navigate(['/login']);
      }
      if (error.status === 0) {
        this.router.navigate(['/network-error']);
      }
      this.log(`${operation} failed: ${error.message}`);
      return of(error);
    };
  }

  private log(message: string) {

  }

}
