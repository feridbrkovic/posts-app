import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterModule, MatToolbarModule, MatButtonModule, NgIf]
})  

export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated: any = false;
    private authListenerSubs!: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
                .subscribe(isAuthenticated => {
                    this.userIsAuthenticated = isAuthenticated;
                });
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.authListenerSubs.unsubscribe();
    }
}