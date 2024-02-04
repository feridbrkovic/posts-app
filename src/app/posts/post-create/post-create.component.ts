import { Component, OnDestroy, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from "@angular/common";

import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatError, NgIf, MatProgressSpinnerModule]
})
export class PostCreateComponent implements OnInit, OnDestroy {
    enteredTitle = '';
    enteredContent = '';
    post!: Post;
    isLoading = false;
    form!: FormGroup;
    imagePreview!: string | ArrayBuffer | null;
    private mode = 'create';
    private postId!: string | null;
    private authStatusSub!: Subscription;

    constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) {}

    ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
        this.form = new FormGroup({
            'title': new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            'content': new FormControl(null, {
                validators: [Validators.required]
            }),
            'image': new FormControl(this.mode === 'create' ? '' : null, {
                asyncValidators: [mimeType],
            })
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId!).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id, 
                        title: postData.title, 
                        content: postData.content,
                        imagePath: postData.imagePath,
                        creator: postData.creator
                    };
                    this.form.setValue({
                        'title': this.post.title,
                        'content': this.post.content,
                        'image': this.post.imagePath
                    });
                });
            } else {
                this.mode = 'create';
                this.postId = null;
                this.form.get('image')?.setValidators([Validators.required]);
                this.form.get('image')?.setAsyncValidators([mimeType]);
            }
        });
    }

    onImageSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files![0];
        this.form.patchValue({image: file});
        this.form.get('image')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid){
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create'){
            this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
        } else {
            this.postsService.updatePost(this.postId!, this.form.value.title, this.form.value.content, this.form.value.image);
        }
        this.form.reset();
    }

    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}