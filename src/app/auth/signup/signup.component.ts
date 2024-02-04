import { NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatError } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './signup.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatError, MatCardModule, FormsModule, MatProgressSpinner, NgIf, MatInputModule, MatButtonModule],
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub!: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onSignUp(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.createUser(form.value.email, form.value.password);
    }

    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}