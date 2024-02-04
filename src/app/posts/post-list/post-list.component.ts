import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButton } from "@angular/material/button";
import { NgFor } from "@angular/common";
import { NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss'],
    standalone: true,
    imports: [MatExpansionModule, MatButton, NgFor, NgIf, HttpClientModule, RouterModule, MatProgressSpinnerModule, MatPaginatorModule]
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    userIsAuthenticated: any = false;
    userId!: string | null;

    private postsSub!: Subscription;
    private authStatusSub!: Subscription;

    constructor(public postsService: PostsService, private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.postsSub = this.postsService
        .getPostUpdateListener()
        .subscribe((postData: {posts: Post[], postCount: number}) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
        });

        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postsService.deletePost(postId).subscribe(() => {
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        }, () => {
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }
}