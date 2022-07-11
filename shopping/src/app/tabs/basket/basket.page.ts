import { Component, OnInit } from '@angular/core';
import { Basket } from 'src/app/models/basket/basket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  baskets: Basket[]
  totalPrice: number = 0

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.getBaskets()
  }

  getBaskets() {
    this.basketService.getBaskets().subscribe(res => {
      this.baskets = res.data
      for (let basket of this.baskets)
        this.totalPrice += basket.quantity * basket.product.price
    }, err => {
      console.log(err)
    })
  }



}
