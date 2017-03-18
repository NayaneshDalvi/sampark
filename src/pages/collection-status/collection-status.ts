import { Component } from '@angular/core';
import { CollectionService } from '../../providers/collection-status/collection-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the CollectionStatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-collection-status',
  templateUrl: 'collection-status.html',
  providers: [CollectionService],
})
export class CollectionStatusPage {
  collection: any = {};
  user: any;
  financialYear: any;
  loading: Loading;
  yearList: any = [2011, 2012, 2013, 2014, 2015];
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private CollectionService: CollectionService, private toastController: ToastController, private alertCtrl: AlertController) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionStatusPage');
    for (var i = 2016; i <= (new Date().getFullYear() - 1); i++) {
      var financialYear = i + "-" + (i + 1);
      if (i === new Date().getFullYear()) {
        this.financialYear = financialYear;
        this.getCollectionStatus();
      }
      console.log(financialYear)
      this.yearList.push(financialYear);
    }
  }

  getCollectionStatus() {
    this.showLoading();
    let apiObj: any = {};
    apiObj.rank = this.user.rankId;
    let years = this.financialYear.split("-")
    if (years.length > 1) {
      apiObj.financeYear = this.financialYear;
      apiObj.startTime = years[0];
      apiObj.endTime = years[1];
    } else {
      apiObj.startTime = years[0];
      apiObj.endTime = years[0];
      apiObj.financeYear = years[0] + '-' + years[0];
    }
    console.log(apiObj)
    this.CollectionService.getAllCollectionStatus(apiObj).then(
      (data: any) => {
        this.loading.dismiss();
        this.collection = data;
        this.collection.cmdBalance = Number(this.collection.cmdTarget) - Number(this.collection.cmdCollection);
        this.collection.promotionBalance = Number(this.collection.promotionTarget) - Number(this.collection.promotionCollection);
        if (Number(this.collection.cmdTarget) - Number(this.collection.cmdCollection) < 0) {
          this.collection.cmdBalance = 0;
        }
        if (Number(this.collection.promotionTarget) - Number(this.collection.promotionCollection) < 0) {
          this.collection.promotionBalance = 0;
        }

      }, error => {
        this.loading.dismiss();
        this.collection = {}
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


