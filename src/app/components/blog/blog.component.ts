import { Component, inject, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  posts: any[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get('/assets/blog/posts.json').subscribe((data) => {
      this.posts = data as any;
    });
  }
}
