import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  pid:any = 0
  product:any={}

  constructor(private aroute:ActivatedRoute,private api:ApiService,private toastr:ToastrService){
    this.aroute.params.subscribe((res:any)=>{
      console.log(res)
      this.pid=res.id
      console.log(this.pid)

    })

  }

  ngOnInit() {

    this.handleGetProducts()


    
  }

  handleGetProducts(){
    this.api.getProducts(this.pid).subscribe((res)=>{
      console.log(res)
      this.product = res
      console.log(this.product,"arry2 from view")

    },(err:any)=>{
      console.log(err)

    })
  }

  addToWish(data:any){

    if(sessionStorage.getItem("token")){
      console.log(data)
      this.api.addWishApi(data).subscribe({
        next:(res:any)=>{
          this.toastr.success("Item added to wishlist")


        },error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })

      

    }else{
      this.toastr.warning("PleaseLogin First to add products to wishlist")

    }


  }



}
