import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CouponService } from '../../providers/coupons/coupon-service';
import * as moment from 'moment'
/*
  Generated class for the Voucher page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-voucher',
  templateUrl: 'voucher.html',
  providers: [CouponService]
})
export class VoucherPage {
  startTime: any;
  loading: Loading;
  voucherList: any;
  totalVoucherAmt: any = 0;
  endTime: any;
  user: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private CouponService: CouponService, private toastController: ToastController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
  }

  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
    this.startTime = new Date().getFullYear() + '-0' + (new Date().getMonth() - 1);
    this.endTime = new Date().getFullYear() + '-0' + new Date().getMonth();
  }

  getVoucherDetails() {
    if (this.startTime > this.endTime) {
      let toast = this.toastController.create({
        message: "Please Enter Valid Month",
        duration: 2500
      });
      toast.present();
      return;
    }
    this.showLoading()
    let apiObj = { "ffCode": this.user.ffCode, "startTime": new Date(this.startTime).getTime(), "endTime": new Date(this.endTime).setDate(28) }
    this.CouponService.getVoucherDetails(apiObj).then(
      (data: any) => {
        this.loading.dismiss();
        this.voucherList = data;
        for (let i = 0; i < this.voucherList.length; i++) {
          this.totalVoucherAmt = this.totalVoucherAmt + Number(this.voucherList[i].voucherAmount);
        }
        console.log(this.totalVoucherAmt)
      }, error => {
        this.loading.dismiss();
        let toast = this.toastController.create({
          message: error.message,
          duration: 2500
        });
        toast.present();
      }
    );
  }


  validateStartDate() {
    if (this.startTime > this.endTime) {
      let toast = this.toastController.create({
        message: "Please Enter Valid Month",
        duration: 2500
      });
      toast.present();
      delete this.startTime;
    }
  }

  validateEndDate() {
    if (this.startTime > this.endTime) {
      let toast = this.toastController.create({
        message: "Please Enter Valid Month",
        duration: 2500
      });
      toast.present();
      delete this.endTime;
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  getVOucherMonth(voucher) {
    return moment(voucher.voucherDate).format('MMM, YYYY');
  }

}



