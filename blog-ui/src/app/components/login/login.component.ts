import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!:string;
  password!:string;
  authService = inject(AuthService);
  router = inject(Router)
login(){
  if(this.email && this.password){
    this.authService.login(this.email,this.password).subscribe(result=>{
      console.log(result)
      localStorage.setItem("token",result.accessToken)
      this.router.navigateByUrl("/admin/blogs")
    })
  } else{
    alert("please enter email and password")
  }
}
}
