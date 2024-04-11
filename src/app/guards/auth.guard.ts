import { CanActivateFn } from '@angular/router';
import { ApiService } from '../api.service';
import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
export const authGuard: CanActivateFn = (route, state) => {


  const api = inject(ApiService)
  const router = inject(Router)
  const toastr = inject(ToastrService)


  if(api.isLoggedIn()){
    return true
  }else{
    toastr.warning('please login first')
    router.navigateByUrl('login')
  return false;


  }

};
