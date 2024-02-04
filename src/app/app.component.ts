import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { PostsService } from './posts/posts.service';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { PostsModule } from './posts/posts.module';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RouterLink, HeaderComponent, PostsModule, LoginComponent, SignUpComponent],
    providers: [PostsService, RouterModule]
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}
    title = 'Posts App';

    ngOnInit(): void {
        this.authService.autoAuthUser();
    }
}
