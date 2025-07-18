import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from './types/blog';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  http = inject(HttpClient);
  constructor() { }
  GetFeaturedBlogs() {
    return this.http.get<Blog[]>(environment.apiUrl + 'api/Blogs/featured');
  }
  GetAllBlogs() {
    return this.http.get<Blog[]>(environment.apiUrl + 'api/Blogs');
  }
  GetBlogById(id: number) {
    return this.http.get<Blog>(environment.apiUrl + 'api/Blogs/' + id);
  }
  deleteBlog(id: number) {
    return this.http.delete<Blog>(environment.apiUrl + 'api/Blogs/' + id);
  }
  addBlog(blog: Blog) {
    return this.http.post(environment.apiUrl + 'api/Blogs/', blog);
  }
  updateBlog(id:number,blog: Blog) {
    return this.http.put(environment.apiUrl + 'api/Blogs/'+id, blog);
  }

}
