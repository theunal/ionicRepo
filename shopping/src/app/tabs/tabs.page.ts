import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, AfterContentChecked {

  jwtHelper = new JwtHelperService()

  total: number = 0

  admin: boolean = false

  constructor(private basketService: BasketService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total
    this.refresh()
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

  tabButtonColor(url: string, color?: string) {
    return this.router.url == url ? color ? `color:${color};` : 'color: blue;' : ''
  }

  totalPrice() {
    this.total = this.basketService.totalPrice()
    return this.total
  }



}