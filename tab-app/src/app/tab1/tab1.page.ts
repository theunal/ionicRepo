import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Uygulama kapatılsın mı?',
      buttons: [
        {
          text: 'Hayır',
          role: 'cancel'
        },
        {
          text: 'Evet',
          role: 'confirm',
          handler: () => { navigator['app'].exitApp() }
        }
      ]
    })

    await alert.present()
  }
}