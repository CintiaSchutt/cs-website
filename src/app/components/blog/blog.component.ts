import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-blog',
    imports: [
      
    ],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  blogPosts$: Observable<ScullyRoute[]>; // Observable of prerendered routes

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    // Filter all blog routes
    this.blogPosts$ = this.scully.available$.pipe(
      // Only include blog posts
      map((routes: ScullyRoute[]) =>
        routes.filter((r) => r.route.startsWith('/blog/'))
      )
    );
  }
}