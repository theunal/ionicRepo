import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastController) { }

  async presentToastWithOptions(any: any) {
    const toast = await this.toastr.create({
      message: any.message,
      icon: 'checkmark-circle-outline',
      position: 'bottom',
      color: 'success',
      duration: 2000
    })
    await toast.present()
  }
}