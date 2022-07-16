import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product/product';
import { ToastService } from '../products/errorService/toast.service';
import { ErrorService } from '../products/errorService/error-service.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  productAddForm: FormGroup

  constructor(private productService: ProductService, private toast: ToastService, private errorService: ErrorService) { }

  ngOnInit() {
    this.createProductAddForm()
  }

  createProductAddForm() {
    this.productAddForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      inventoryQuantity: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })
  }

  productAdd() {
    if (this.productAddForm.valid) {
      let product: Product = {
        id: 0,
        codeGuid: '',
        name: this.productAddForm.value.name,
        imageUrl: this.productAddForm.value.imageUrl,
        inventoryQuantity: this.productAddForm.value.inventoryQuantity,
        price: this.productAddForm.value.price
      }
      this.productService.productAdd(product).subscribe(res => {
        this.toast.presentToastWithOptions(res)
        this.createProductAddForm()
      }, err => {
        this.toast.presentToastWithOptions(err.error.message, 'dark', 'warning', 'bottom')
      })
    } else {
      this.toast.presentToastWithOptions('Lütfen tüm alanları doldurunuz.', 'warning', 'alert', 'bottom')
    }
  }

}

