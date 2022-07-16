import { BasketAddUpdateDeleteDto } from 'src/app/models/basket/basketAddUpdateDeleteDto';
import { AfterContentChecked, Component } from '@angular/core';
import { ViewDidEnter, LoadingController, Platform } from '@ionic/angular';
import { Basket } from 'src/app/models/basket/basket';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements AfterContentChecked, ViewDidEnter {

  baskets: Basket[] = []
  total: number = 0

  constructor(private basketService: BasketService, private toast: ToastService, private productService: ProductService,
    private loadingCtrl: LoadingController, private platform: Platform) { }

  doRefresh(event : any) {
    this.ionViewDidEnter()
    setTimeout(() => {
      event.target.complete()
    }, 100)
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

  platformDetect() {
    return this.platform.is('ios') ? 'ios' : 'other'
  }

  increase(basket: Basket) {
    this.showLoading()
    basket.quantity++
    let updateBasket: BasketAddUpdateDeleteDto = {
      id: basket.id,
      quantity: basket.quantity,
      productId: basket.productId
    }
    this.basketService.update(updateBasket).subscribe(res => {
      this.loadingCtrl.dismiss()
      this.getBasketList()
      this.productService.getProducts()
      this.toast.presentToastWithOptions(res)
    }, err => {
      this.loadingCtrl.dismiss()
      console.log('basket page increase error')
    })
  }

  reduce(basket: Basket) {
    this.showLoading()
    basket.quantity--
    let reduceBasket: BasketAddUpdateDeleteDto = {
      id: basket.id,
      quantity: basket.quantity,
      productId: basket.productId
    }
    this.basketService.update(reduceBasket).subscribe(res => {
      this.loadingCtrl.dismiss()
      this.getBasketList()
      this.productService.getProducts()
      this.toast.presentToastWithOptions(res)
    }, err => {
      this.loadingCtrl.dismiss()
      console.log('basket page reduce error')
    })
  }

  delete(basket: Basket) {
    this.showLoading()
    let deleteBasket: BasketAddUpdateDeleteDto = {
      id: basket.id,
      quantity: basket.quantity,
      productId: basket.productId
    }
    this.basketService.delete(deleteBasket).subscribe(res => {
      this.loadingCtrl.dismiss()
      this.getBasketList()
      this.productService.getProducts()
      this.toast.presentToastWithOptions(res, 'primary')
    }, err => {
      this.loadingCtrl.dismiss()
      console.log('basket page delete error')
    })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
    })
    loading.present()
  }

}
