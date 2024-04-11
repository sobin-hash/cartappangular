import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL="https://cartserverangular.onrender.com"
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)


  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishListCountApi()
      this.getCartCountApi()
  
    }

  }


  getAllProducts(){
    return this.http.get(`${this.SERVER_URL}/allproducts`)

  }

  getProducts(id:any){
    return this.http.get(`${this.SERVER_URL}/getproducts/${id}`)

  }


  userRegister(data:any){
    return this.http.post(`${this.SERVER_URL}/reg-user`,data)

  }

  userLogin(data:any){
    return this.http.post(`${this.SERVER_URL}/login`,data)

  }
// -----------------------------------------------------------------
  appendTokenToHeader(){
    const token = sessionStorage.getItem("token")
    // console.log(JSON.parse(token),"from service")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`) //to avoid ""
    }
    return {headers}                                                                         //directly making it as object to avoid this --//headers:this.appendTokenHeader()


  }

  addWishApi(data:any){
    return this.http.post(`${this.SERVER_URL}/addwish`,data,this.appendTokenToHeader())     

  }
  
  getWishApi(){
    return this.http.get(`${this.SERVER_URL}/getwish`,this.appendTokenToHeader())     

  }

  delWishApi(id:any){
    return this.http.delete(`${this.SERVER_URL}/delwish/${id}`,this.appendTokenToHeader())     

  }


  getWishListCountApi(){
    this.http.get(`${this.SERVER_URL}/getwish`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
      console.log(res.length)
  })
  }

addToCartApi(product:any){
  return this.http.post(`${this.SERVER_URL}/addtocart`,product,this.appendTokenToHeader())     

}

getCartApi(){
  return this.http.get(`${this.SERVER_URL}/getcartlist`,this.appendTokenToHeader())     

}
getCartCountApi(){
  this.http.get(`${this.SERVER_URL}/getcartlist`,this.appendTokenToHeader()).subscribe((res:any)=>{
    this.cartCount.next(res.length)


  })

}

delCartApi(id:any){
  return this.http.delete(`${this.SERVER_URL}/delcart/${id}`,this.appendTokenToHeader())     

}

clearCartApi(){
  return this.http.delete(`${this.SERVER_URL}/clearcart`,this.appendTokenToHeader())     

}

increaseCart(id:any){
  return this.http.get(`${this.SERVER_URL}/cart-increase/${id}`,this.appendTokenToHeader())     


}
decreaseCart(id:any){
  return this.http.get(`${this.SERVER_URL}/cart-decrease/${id}`,this.appendTokenToHeader())     


}

isLoggedIn(){
  return !!sessionStorage.getItem('token')

}







}
