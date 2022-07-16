import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Product } from '../../models/product/product';
import { Component, AfterContentChecked } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BasketService } from 'src/app/services/basket.service';
import { BasketAddUpdateDeleteDto } from 'src/app/models/basket/basketAddUpdateDeleteDto';
import { LoadingController, ViewDidEnter, Platform } from '@ionic/angular';
import { ErrorService } from 'src/app/services/error-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements ViewDidEnter, AfterContentChecked {

  jwtHelper = new JwtHelperService()
  admin: boolean = false

  products: Product[] = []

  searchText: string = ''

  isAuth: boolean = false

  constructor(private productService: ProductService, private errorService: ErrorService,
    private basketService: BasketService, private toast: ToastService, private loadingCtrl: LoadingController,
    private platform: Platform, private router: Router, private LoginService: LoginService) { }

  ngAfterContentChecked(): void {
    this.refresh()
    this.isAuth = this.LoginService.isAuthenticated()
  }

  refresh() {
    let token = localStorage.getItem('token')
    let expiration = this.jwtHelper.isTokenExpired(token)
    if ((token !== null || token !== undefined) && !expiration) {
      let decode = this.jwtHelper.decodeToken(token)
      let roles: string[] = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      this.admin = roles.includes('admin' && 'Admin')
      return
    }
    this.admin = false
  }

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

  update(id: string) {
    this.router.navigate([`product-update/${id}`])
  }

  delete(product: Product) {
    this.productService.productDelete(product).subscribe(res => {
      this.toast.presentToastWithOptions(res, 'tertiary')
      this.getProducts()
    }, err => {
      console.log(err)
    })
  }

  logout() {
    this.LoginService.logout()
    this.toast.presentToastWithOptions('Çıkış Yaptınız', 'dark')
  }
}
