import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private api:ApiService,private toastr :ToastrService,private route:Router){

  }


  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(8)]]
  })

  getFormData(){
    console.log(this.loginForm.value);
    this.api.userLogin(this.loginForm.value).subscribe({
      next:(res:any)=>{
        console.log(res,"login success")
        sessionStorage.setItem('existingUserDetails',JSON.stringify(res.existingUser))
        sessionStorage.setItem('token',res.token)
        this.api.getWishListCountApi()
        this.api.getCartCountApi()
        this.toastr.success("Login Success")
        this.route.navigateByUrl('/')
      },
      error:(err)=>{
        console.log(err,"login failed");
        this.toastr.error(err.error) //will give error response given in backend

        
      }
    })
    
  }
}
