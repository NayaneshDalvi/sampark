import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { DashboardPage } from '../dashboard/dashboard';

/*
  Generated class for the Changepassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
  providers: [AuthService]
})
export class ChangepasswordPage {
  password: any = "";
  newPassword: any = "";
  cnfrmPassword: any = "";
  loading: Loading;
  user: any;
  constructor(private auth: AuthService, private events: Events, private toastController: ToastController, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  changePassword(event: any) {
    console.log(this.newPassword !== this.cnfrmPassword)
    console.log("this.newPassword !== this.cnfrmPassword")
    if (this.newPassword != this.cnfrmPassword) {
      let toast = this.toastController.create({
        message: "password does not Match",
        duration: 2500
      });
      toast.present();
      return;
    } else {
      this.showLoading();
      let obj: any;
      obj = {};
      obj.newPassword = this.newPassword
      obj.oldPassword = this.password
      obj.ffCode = this.user.ffCode;
      event.preventDefault();
      this.auth.changePassword(obj).then(
        (data: any) => {
          this.loading.dismiss();
          console.log("This is response salnadnslad");
          console.log(data);
          console.log(JSON.stringify(data));
          let toast = this.toastController.create({
            message: "User password Updated Successfully",
            duration: 2500
          });
          toast.present();
          this.nav.setRoot(DashboardPage);
        }, error => {
          console.log("This is response");
          console.log(error);
          this.loading.dismiss();
          let toast = this.toastController.create({
            message: error.message,
            duration: 2500
          });
          toast.present();
        }
      );
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}


