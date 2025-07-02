import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../types/blog';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogService = inject(BlogService);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  blog!: Blog;
  categoryList: Category[]=[];
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.blogService.GetBlogById(id).subscribe(result => {
      this.blog = result;
    });
    this.categoryService.getCategoryList().subscribe(result => {
      this.categoryList = result;
    });
  }
  GetCategoryName(){
    return this.categoryList.find(x=>x.id==this.blog?.categoryId)?.name
  }
}
