import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../types/category';
import { BlogService } from '../../../blog.service';
import { Blog } from '../../../types/blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent {
  formBuilder = inject(FormBuilder);
  blogForm = this.formBuilder.group({
    id: [null],
    title: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
    description: [''],
    image: ['',],
    content: ['', [Validators.required]],
    isFeatured: [false,],
  })
  categoryService = inject(CategoryService);
  blogService = inject(BlogService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  
  categoryList: Category[] = [];
  // blog!:Blog[];
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if(id){
      this.isEdit = true;
      this.blogService.GetBlogById(+id).subscribe(result=>{
        this.blogForm.patchValue(result as any)
      })
    }
    this.categoryService.getCategoryList().subscribe((result => this.categoryList = result))
  }
  create() {
    let model:any=this.blogForm.value
   this.blogService.addBlog(model as Blog).subscribe(()=>{
    alert("Blog Created..");
    this.router.navigateByUrl("/admin/blogs")
   })
  }
  update(){
   let model:any=this.blogForm.value
   this.blogService.updateBlog(this.blogForm.value.id!,model as Blog).subscribe(()=>{
    alert("Blog updated..");
    this.router.navigateByUrl("/admin/blogs")
   })
  }
}
