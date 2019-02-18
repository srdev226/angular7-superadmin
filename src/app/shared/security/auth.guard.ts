import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router,
                private authService: AuthService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }
}
