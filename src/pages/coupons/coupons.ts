import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CouponService } from '../../providers/coupons/coupon-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Coupons page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
  providers: [CouponService]
})
export class CouponsPage {
  coupon: any;
  user: any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private CouponService: CouponService, private toastController: ToastController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.coupon = { };
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponsPage');
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
    this.getCouponDetails();
  }

  getCouponDetails() {
    this.showLoading()
    let apiObj = { "ffCode": this.user.ffCode }
    this.CouponService.getCouponDetails(apiObj)
    .then((data: any) => {
        console.log(data)
        this.loading.dismiss();
        this.coupon= data[0];
        console.log(this.coupon)
        this.coupon.totalCredit=Number(data[0].ecouponsCreditVoucher)+Number(data[0].adhocCredit);
        this.coupon.totalDebit= Number(data[0].bitoPromoterDebit)+Number(data[0].bitoDebit)+Number(data[0].adhocDebit)+Number(data[0].fmcgDebit);
        this.coupon.balance=Number(this.coupon.totalCredit)-Number(this.coupon.totalDebit);
       }, (error:any) => {
        this.loading.dismiss();
        let toast = this.toastController.create({
          message: error.message,
          duration: 2500
        });
        toast.present();
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
