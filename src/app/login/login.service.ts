import { Injectable } from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class LoginService {

    constructor(private authService: AuthService) { }

    login(userName: string, password: string): Observable<any> {
        return this.authService.signIn(userName, password);
    }
}
