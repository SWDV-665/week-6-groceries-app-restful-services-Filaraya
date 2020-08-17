import { Component } from '@angular/core';
import { NavController, } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceProvider } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls:['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";
  socialSharing: any;

  items = [];
  
  
  errorMessage: string;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public dataService: GroceriesServiceService, 
    public inputDialogService: InputDialogServiceProvider, 
    public SocialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }
  
  

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
    
    .subscribe(
      items => this.items = items,
      error => this.errorMessage =<any>error);
    
  }

  async removeItem(id,item){

    console.log("Removing Item - ", id.name);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + id.name + " ...",
      duration: 3000
    });
    (await toast).present();

    this.dataService.removeItem(id);  
  }

  async shareItem(item,index) {
    console.log("Sharing Item - ", item,index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });

    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error: any) => {
      console.error("Error while sharing ", error);
    });    

  }

  // Edit Item
  async editItem(item,index) {
    
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + item.name + " ...",
      duration: 3000
    });
    (await toast).present();
    
    this.inputDialogService.showPrompt(item, index);
  }  
  
  
  // Add Item
  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }



}
