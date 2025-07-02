import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Blog } from '../../types/blog';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-blog-card',
  imports: [MatCardModule,MatButtonModule,RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
@Input() blog!: Blog;
categoryService = inject(CategoryService);
categoryList:Category[]=[];
ngOnInit  () {
  this.categoryService.getCategoryList().subscribe(result => {
    this.categoryList = result;
  });
}
 GetCategoryName(){
    return this.categoryList.find(x=>x.id==this.blog?.categoryId)?.name
  }
}
