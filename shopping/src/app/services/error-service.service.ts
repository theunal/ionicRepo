import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastController) { }

  async presentToastWithOptions(err: any) {
    const toast = await this.toastr.create({
      message: err.error,
      icon: 'alert-circle-outline',
      position: 'bottom',
      color: 'dark',
      duration: 2000
    })
    await toast.present()
  }


}
