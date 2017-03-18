import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectService } from '../../providers/project/project-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
	project:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,private ProjectService:ProjectService,private toastController : ToastController,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }


  

}
