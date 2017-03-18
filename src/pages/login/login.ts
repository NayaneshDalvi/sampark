import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { ffCode: '', password: '' };

  constructor(private events: Events, private toastController: ToastController, private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.showLoading()
    console.log(this.registerCredentials)
    this.auth.login(this.registerCredentials).then(
      (data: any) => {
        if (typeof (data) != "undefined") {
          this.loading.dismiss();
          window.localStorage.setItem("AUTH_USER", JSON.stringify(data));
          this.events.publish('LOGIN_EVENT');
          this.nav.setRoot(DashboardPage);
        } else {
          this.errorshow("No Data Availabe")
        }
      }, error => {
        this.loading.dismiss();
        this.errorshow(error.message);
      }
    );
  }

  errorshow(message) {
    let toast = this.toastController.create({
      message: message,
      duration: 2500
    });
    toast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    let toast = this.toastController.create({
      message: "Unauthorized Access! ",
      duration: 2500
    });
    toast.present();

  }

}
