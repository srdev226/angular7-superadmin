import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from '../../login/login';
import { LoadingStatusService } from '../service/loading-status';

@Injectable()
export class AuthService {
    private headers: HttpHeaders;

    private authUrl = environment.serverUrl + 'api/v1/login';

    constructor(private httpClient: HttpClient,
                private loadingStatusService: LoadingStatusService,
                private router: Router) {
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
    }

    signIn(userName: string, password: string): Observable<any> {
        const data = new Login;
        data.userName = userName;
        data.password = password;
        data.platform = this.getPlatform();
        data.platformOs = this.getPlatformOs();
        this.loadingStatusService.loading();
        return this.httpClient.post(this.authUrl, data, { headers: this.headers })
            .pipe(
                map(response => {
                    return (<any>response).data;
                }),
                tap(response => {
                    localStorage.setItem('token', response.userTokenDetails.accessToken);
                    this.loadingStatusService.loaded();
                }),
                catchError(this.handleError('patch', []))
            );
    }

    logOut() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        if (this.getToken()) {
            return true;
        }
        return false;
    }

    getPlatformOs() {
        if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1 ) {
            return 'Opera';
        } else if (navigator.userAgent.indexOf('Chrome') !== -1 ) {
            return 'Chrome';
        } else if (navigator.userAgent.indexOf('Safari') !== -1) {
            return 'Safari';
        } else if (navigator.userAgent.indexOf('Firefox') !== -1 ) {
            return 'Firefox';
        } else if ((navigator.userAgent.indexOf('MSIE') !== -1 ) || (!!document.DOCUMENT_NODE === true )) {
            return 'IE';
        } else {
            return 'unknown';
        }
    }

    getPlatform() {
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return 'mobile';
        } else {
            return 'pc';
        }
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.loadingStatusService.loaded();
            if (error.status === 0) {
                this.router.navigate(['/network-error']);
            }
            console.error(error); // log to console instead
            console.log(`${operation} failed: ${error.message}`);
            return of(error);
        };
    }
}
