import { ViewDidEnter } from '@ionic/angular';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, AfterContentChecked {

  total: number = 0

  constructor(private basketService: BasketService, private router: Router) { }

  ngOnInit() {
    console.log(this.router.url)
  }

  tabButtonColor(url: string, color?: string) {
    return this.router.url == url ? color ? `color:${color};` : 'color: blue;' : ''
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total
  }

  totalPrice() {
    this.total = this.basketService.totalPrice()
    return this.total
  }

}