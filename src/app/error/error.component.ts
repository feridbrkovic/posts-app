import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
    templateUrl: './error.component.html',
    imports: [MatDialogModule, MatButton],
    standalone: true
})
export class ErrorComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}