import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BlogService } from '../../blog.service';
import { Blog } from '../../types/blog';
import { RouterModule } from '@angular/router';
import { BlogCardComponent } from "../blog-card/blog-card.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 blogService= inject(BlogService)
featuredBlogs!:Blog[];
 ngOnInit() {
  this.blogService.GetFeaturedBlogs().subscribe(result => {
    this.featuredBlogs = result;
    console.log(this.featuredBlogs);
  });
}
}
