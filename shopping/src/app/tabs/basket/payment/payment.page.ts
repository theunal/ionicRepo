import { Router } from '@angular/router';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, Platform } from '@ionic/angular';
import { Basket } from 'src/app/models/basket/basket';
import { AddPayment } from 'src/app/models/payment/addPayment';
import { BasketService } from 'src/app/services/basket.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastService } from '../../products/errorService/toast.service';
import { ErrorService } from '../../products/errorService/error-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit, AfterContentChecked {

  paymentForm: FormGroup

  baskets: Basket[] = []
  total: number = 0

  showBasketButton: boolean = false

  constructor(private basketService: BasketService, private loadingCtrl: LoadingController, private toast: ToastService,
    private paymentService: PaymentService, private errorService: ErrorService, private router: Router,
    private platform: Platform) { }

  platformDetect() {
    return this.platform.is('ios') ? 'ios' : 'other'
  }


  ngOnInit() {
    this.createPaymentForm()
  }

  ngAfterContentChecked(): void {
    this.baskets = this.basketService.baskets
  }

  ionViewDidEnter() {
    this.total = this.basketService.total
    this.getBasketList()
  }

  getBasketList() {
    this.basketService.getBaskets()
  }

  totalPrice() {
    this.total = this.basketService.totalPrice()
    return this.total
  }

  showBasket() {
    this.showBasketButton ? this.showBasketButton = false : this.showBasketButton = true
  }

  createPaymentForm() {
    this.paymentForm = new FormGroup({
      id: new FormControl(0),
      date: new FormControl(new Date().toISOString()),
      cartOwner: new FormControl('', [Validators.required]),
      cartNumber: new FormControl('', [Validators.required]),
      expirationDate: new FormControl(new Date().toISOString(), [Validators.required]),
      cvv: new FormControl('', [Validators.required])
    })
  }

  async payment() {
    await this.showLoading()
    if (this.paymentForm.valid) {
      let addPayment: AddPayment = {
        payment: this.paymentForm.value,
        baskets: this.baskets
      }
      this.paymentService.payment(addPayment).subscribe(res => {
        this.loadingCtrl.dismiss()
        this.router.navigate([''])
        this.toast.presentToastWithOptions('Ödeme Başarılı', 'tertiary')
      }, err => {
        // err.statusCode == '404' ? this.toast.presentToastWithOptions('')
        console.log(err)
        this.loadingCtrl.dismiss()
        this.errorService.presentToastWithOptions(err)
      })
    } else {
      console.log('in valid')
      this.loadingCtrl.dismiss()
      this.toast.presentToastWithOptions('Lütfen gerekli alanları doldurunuz', 'warning')
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({})
    loading.present()
  }

}
