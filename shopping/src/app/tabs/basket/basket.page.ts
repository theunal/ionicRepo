import { BasketAddUpdateDeleteDto } from 'src/app/models/basket/basketAddUpdateDeleteDto';
import { AfterContentChecked, Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Basket } from 'src/app/models/basket/basket';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from '../products/errorService/toast.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements AfterContentChecked, ViewDidEnter {

  baskets: Basket[] = []
  total: number = 0

  constructor(private basketService: BasketService, private toast: ToastService, private productService: ProductService) { }

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

  increase(basket: Basket) {
    if (basket.product.inventoryQuantity == 0) {
      this.toast.presentToastWithOptions('Stokta Yok', 'warning')
    } else {
      basket.quantity++
      let updateBasket: BasketAddUpdateDeleteDto = {
        id: basket.id,
        quantity: basket.quantity,
        productId: basket.productId
      }
      console.log(updateBasket)
      this.basketService.update(updateBasket).subscribe(res => {
        this.getBasketList()  
        this.productService.getProducts()
        this.toast.presentToastWithOptions(res)
      }, err => {
        console.log('basket page increase error')
      })
    }
  }


}
