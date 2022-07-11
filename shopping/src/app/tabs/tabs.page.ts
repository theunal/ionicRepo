import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  totalPrice: number = 0

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.getTotalPrice()
  }

  getTotalPrice() {
    this.basketService.getBaskets().subscribe(res => {
      for (let basket of res.data)
        this.totalPrice += basket.quantity * basket.product.price
    }, err => {
      console.log(err)
    })
  }

}