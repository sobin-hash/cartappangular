import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
// import { PipePipe } from '../searchpipe/pipe.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit{

  
  
  @Output() sendSearchEvent = new EventEmitter<string>();

  // addNewItem(value: string) {
  //   this.sendSearchEvent.emit(this.searchtext);
  // }

  // this.adminChangeEvent.emit(this.adminData.username)



  searchtext:any;
  username:any="";
  wishCount:any=0;
  cartCount:any=0;

  constructor(private api:ApiService,private fb:FormBuilder,private router:Router){

  }

  ngOnInit() {  
    if(sessionStorage.getItem("existingUserDetails")){
      const user:any=sessionStorage.getItem("existingUserDetails")
      this.username=JSON.parse(user).username
      this.api.wishlistCount.subscribe((res:any)=>{
      this.wishCount=res
      
      })
      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount=res

      })
    }

    
  }

  logOut(){
    sessionStorage.clear()
    this.wishCount=0
    this.cartCount=0

    this.router.navigateByUrl('login')

  }


  // onchange="((e)=>{this.sendSearchEvent.emit(e.target.value)})"

  searchEvent(){
    this.sendSearchEvent.emit(this.searchtext)
    // console.log(e)
  }



  

  



}
