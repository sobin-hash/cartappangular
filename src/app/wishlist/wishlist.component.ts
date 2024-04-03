import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  products:any[]=[]
  constructor(private api:ApiService,private toastr:ToastrService){

  }
  ngOnInit() {
    this.getData()


    
  }


  getData(){
    this.api.getWishApi().subscribe({
      next:(res:any)=>{
        this.products = res
        console.log(res)
        
      },
      
      error:(err:any)=>{
        console.log(err)
      }
    })

  }

  deleteWish(id:any){
    this.api.delWishApi(id).subscribe({
      next:(res:any)=>{
        this.toastr.success("deleted succesfully")
        this.api.getWishListCountApi()
        this.getData()

      },
      error:(err)=>{
        this.toastr.error("deletetion failed ")


      }
    })
  }



}
