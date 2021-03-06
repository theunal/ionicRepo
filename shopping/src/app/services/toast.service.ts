import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastController) { }

  async presentToastWithOptions(any: any, color?: string, icon?: string, position?: any) {

    if (any.message == null) {
      const toast = await this.toastr.create({
        message: any,
        icon: (icon || icon !== '') ? icon : 'checkmark-circle-outline',
        position: position ? position : 'top',
        color: color,
        duration: 2000
      })
      await toast.present()
      return
    }


    const toast = await this.toastr.create({
      message: any.message,
      icon: 'checkmark-circle-outline',
      position: 'top',
      color: color ? color : 'success',
      duration: 2000
    })
    await toast.present()
  }
}