import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { marked } from 'marked';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownModule, HttpClientModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent implements OnInit {
  route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  markdownPath = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.markdownPath = `/assets/blog/${slug}.md`;
  }
}
