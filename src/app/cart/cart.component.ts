import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartproducts:any=[]


  constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit() {
    this.getData()

    

}

getData(){
  this.api.getCartApi().subscribe((res)=>{
    this.cartproducts=res
    console.log(this.cartproducts,"cartproducts")

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
    err.status(401).json(err)


  })
}
}
