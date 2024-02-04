import { Injectable } from "@angular/core";
import { Route, Router, mapToCanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['/login'])
        }
        return isAuth;
    }
}