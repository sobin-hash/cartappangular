import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  
  username:any=""
  wishCount:any=0;
  cartCount:any=0;

  constructor(private api:ApiService){

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

  



}
