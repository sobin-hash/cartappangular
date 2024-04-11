import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartproducts:any=[]
  totalAmount:any=0
  cartCoupon:any=false
  couponClickStatus:any=false

  constructor(private api:ApiService,private toastr:ToastrService,private router:Router){}

  ngOnInit() {
    this.getData()

    

}

getData(){
  this.api.getCartApi().subscribe((res)=>{
    this.cartproducts=res
    console.log(this.cartproducts,"cartproducts")
    this.getTotalAmount()

  },
  (err:any)=>{
    console.log(err)
  })
  
}

delCartItem(id:any){
  this.api.delCartApi(id).subscribe((res:any)=>{
    this.getData()
    this.toastr.success("deleted successfully")
    this.api.getCartCountApi()
    console.log(res)
    

  },(err:any)=>{
    // err.status(401).json(err)
    console.log(err)


  })
}

getTotalAmount(){

  if(this.cartproducts.length>0){
    this.totalAmount=Math.ceil(this.cartproducts.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>(p1+p2)))
    console.log(this.totalAmount)
  }else{
    this.totalAmount=0
  }

}

increaseCartQuantity(id:any){
  this.api.increaseCart(id).subscribe({
    next:((res:any)=>{
      this.getData()
      

    }),error:((err:any)=>{
      

    })
  })

}


decreaseCartQuantity(id:any){
  this.api.decreaseCart(id).subscribe({
    next:((res:any)=>{
      this.getData()
      

    }),error:((err:any)=>{
      this.toastr.warning(err.error)

    })
  })

}

clearCart(){
  this.api.clearCartApi().subscribe({
    next:(res:any)=>{
      this.getData()
      this.toastr.success("deleted successfully")
      this.api.getCartCountApi()
      console.log(res)

    },error:(err:any)=>{
      // err.status(401).json(err)
      console.log(err)
    }
  }
  )
}

getCoupons(){
  this.cartCoupon=true
}

getDiscount10(){
  this.couponClickStatus=true
  const discount = this.totalAmount * 0.1
  this.totalAmount=Math.ceil(this.totalAmount-discount)

}

getDiscount25(){
  this.couponClickStatus=true
  const discount = this.totalAmount * 0.25
  this.totalAmount=Math.ceil(this.totalAmount-discount)

}
getDiscount50(){
  this.couponClickStatus=true
  const discount = this.totalAmount * 0.5
  this.totalAmount=Math.ceil(this.totalAmount-discount)

}


clickCheckout(){
  sessionStorage.setItem('totalAmount',this.totalAmount)
  this.router.navigateByUrl('checkout')

}



}
