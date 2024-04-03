import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

 constructor(private fb:FormBuilder,private api:ApiService ,private toastr:ToastrService) {

 }




 registrationForm = this.fb.group({

  username:['',[Validators.required,Validators.pattern('[a-zA-Z 0-9]*')]],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9@!]*'),Validators.minLength(8)]]

 })

 getFormData (){
  console.log(this.registrationForm.value);
  this.api.userRegister(this.registrationForm.value).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.toastr.success(`${this.registrationForm.value.username} successfully registered as admin!!`)

    },error:(err)=>{
      console.log(err)
      this.toastr.error("Registration failed..!!")

    }
  })
  
 }


  

}
