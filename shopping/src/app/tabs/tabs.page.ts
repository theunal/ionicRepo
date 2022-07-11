import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, AfterContentChecked {

  total: number = 0

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total
  }


  totalPrice() {
    this.total = this.basketService.totalPrice()
    return this.total
  }

}