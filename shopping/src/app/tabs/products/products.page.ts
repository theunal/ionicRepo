
import { Product } from './../../models/product';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ErrorServiceService } from './errorService/error-service.service';
import { BasketService } from 'src/app/services/basket.service';
import { ToastService } from './errorService/toast.service';
import { BasketAddUpdateDeleteDto } from 'src/app/models/basket/basketAddUpdateDeleteDto';
import { LoadingController, ViewDidEnter, Platform } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements ViewDidEnter {

  products: Product[] = []

  searchText: string = ''

  constructor(private productService: ProductService, private errorService: ErrorServiceService,
    private basketService: BasketService, private toast: ToastService, private loadingCtrl: LoadingController,
    private platform: Platform) { }

  doRefresh(event: any) {
    this.getProducts()
    setTimeout(() => {
      event.target.complete()
    }, 100)
  }

  ionViewDidEnter() {
    this.getProducts()
  }

  platformDetect() {
    return this.platform.is('ios') ? 'ios' : 'other'
  }

  async getProducts() {
    await this.showLoading()
    this.productService.getProducts().subscribe(res => {
      this.loadingCtrl.dismiss()
      this.products = res.data
    }, (err: any) => {
      this.loadingCtrl.dismiss()
      this.errorService.presentToastWithOptions(err)
    })
  }

  async addBasket(productId: number) {
    await this.showLoading()
    let dto: BasketAddUpdateDeleteDto = {
      id: 0,
      productId: productId,
      quantity: 1
    }
    this.basketService.add(dto).subscribe(res => {
      this.toast.presentToastWithOptions(res)
      this.getProducts()
      this.loadingCtrl.dismiss()
    }, err => {
      this.loadingCtrl.dismiss()
      this.errorService.presentToastWithOptions(err)
    })
  }

  productTitle(name: string) { //product card daki ürün adı ilk 35 karakterden olusuyor ve son kelimenin tamamı alındı
    let text = name.substring(0, 35)
    let newArray = text.split(' ').filter(x => !x.includes(text.split(' ')[text.split(' ').length - 1]))
    newArray.push(name.split(' ')[text.split(' ').length - 1])
    let result = ''
    newArray.map(item => result += item + ' ')
    result.trim()
    return result
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
    })
    loading.present()
  }

}
