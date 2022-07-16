import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from './../../../models/product/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {

  product: Product
  imageUrl : string = ''

  productUpdateForm: FormGroup

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private toast: ToastService, private errorService: ErrorService) { }

  ngOnInit() {
    this.getProductById()
    this.createProductUpdateForm()
  }

  getProductById() {
    this.productService.getProductById(this.activatedRoute.snapshot.params['guid']).subscribe(res => {
      this.product = res.data
      this.productSetValue(res.data)
    }, err => {
      console.log(err)
    })
  }

  productSetValue(product: Product) {
    this.productUpdateForm.controls['name'].setValue(product.name)
    this.productUpdateForm.controls['inventoryQuantity'].setValue(product.inventoryQuantity)
    this.productUpdateForm.controls['price'].setValue(product.price)
    this.productUpdateForm.controls['imageUrl'].setValue(product.imageUrl)
  }

  createProductUpdateForm() {
    this.productUpdateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      inventoryQuantity: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })
  }

  productUpdate() {
    if (this.productUpdateForm.valid) {
      let product: Product = {
        id: this.product.id,
        codeGuid: this.product.codeGuid,
        name: this.productUpdateForm.value.name,
        inventoryQuantity: this.productUpdateForm.value.inventoryQuantity,
        price: this.productUpdateForm.value.price,
        imageUrl: this.productUpdateForm.value.imageUrl
      }
      this.productService.productUpdate(product).subscribe(res => {
        this.toast.presentToastWithOptions(res, 'primary')
      }, err => {
        this.errorService.presentToastWithOptions(err)
      })
    } else {
      this.toast.presentToastWithOptions('Lütfen tüm alanları doldurunuz.', 'warning', 'alert', 'bottom')
    }

  }

}
