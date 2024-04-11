import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {






  public payPalConfig?: IPayPalConfig;

  checkOutStatus: boolean = false
  total: any = sessionStorage.getItem('totalAmount')


  constructor(private fb: FormBuilder, private toastr: ToastrService,private api:ApiService,private router:Router) {

  }
  ngOnInit() {
    this.initConfig();
  }



  initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.total
              }
            }
          },
          // items: [{
          //     name: 'Enterprise Subscription',
          //     quantity: '1',
          //     category: 'DIGITAL_GOODS',
          //     unit_amount: {
          //         currency_code: 'EUR',
          //         value: '9.99',
          //     },
          // }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        
        this.api.clearCartApi().subscribe((res:any)=>{
          this.api.getCartCountApi()
          this.toastr.success("Transaction success")
          this.checkOutStatus=false
          this.checkOutForm.reset()
          this.router.navigateByUrl('/')
            })
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.toastr.warning('payment cancelled')

      },
      onError: err => {
        console.log('OnError', err);
        this.toastr.error("Payment Error")
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      }
    };
  }




  checkOutForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    address: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })



  onCancel() {
    this.checkOutForm.reset()
  }


  onCheckOut() {
    console.log(this.checkOutForm.value)
    if (this.checkOutForm.valid) {
      this.checkOutStatus = true
      this.initConfig()

    } else {
      this.toastr.info('Invalid form details..!')
    }
  }

}
