import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceService) {
    console.log('Hello InputDialogServiceProvider Provider');
  }


  async showPrompt(item?, index?) {
    const prompt = await this.alertCtrl.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item..." : "Please enter item...",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Quantity',
          value: item ? item.quantity :null

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log('Saved clicked', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;

              this.dataService.editItem(item,index);
            }
            else {
              this.dataService.addItem(data);
            }

          }
        }
      ]
    });
    return prompt.present();
  }

}

