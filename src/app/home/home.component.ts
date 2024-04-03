import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  array1 :any=[]

  constructor(private api:ApiService,private toastr:ToastrService){

  }

  ngOnInit(){

    this.getAllProducts()

  }

  getAllProducts(){
    this.api.getAllProducts().subscribe((res)=>{
      console.log(res)
      this.array1=res
      console.log(this.array1,"arrya")
    },
    (err:any)=>{
      console.log(err)

    })
  }

  addToWishList(data:any){
    // console.log(sessionStorage.getItem("token"));
    
    if(sessionStorage.getItem("token")){
      console.log(data)
      
      this.api.addWishApi(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.api.getWishListCountApi()

          this.toastr.success("Item added to wishlist")


        },error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })

      

    }else{
      this.toastr.warning("PleaseLogin First to add products to wishlist")

    }
  }

  addToCart(data:any){
    if(sessionStorage.getItem('token')){
      const {id,title,price,image}=data
      const products = {id,title,image,price,quantity:1}
      this.api.addToCartApi(products).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.api.getCartCountApi()
          this.toastr.success("item added to cart")
        },
        error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })
    }else{
      this.toastr.warning("Please Login First!!")
    }
  }



}
