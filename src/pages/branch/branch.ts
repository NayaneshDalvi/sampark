import { Component } from '@angular/core';
import { Branchservice } from '../../providers/branches/branchservice';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Branch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-branch',
  templateUrl: 'branch.html',
  providers: [Branchservice],
})
export class BranchPage {
  branches: any = [];
  branchCode: any;
  currentBranch: any;
  loading: Loading;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private Branchservice: Branchservice, private toastController: ToastController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
   this.currentBranch = { };
  }

  ionViewDidLoad() {
    this.getAllBranches();
  }

  getAllBranches() {
    this.showLoading()
    this.Branchservice.getAllBranches().then(
      (data: any) => {
        this.loading.dismiss();
        if (typeof (data) != "undefined") {
          console.log(data);
          if (data.length > 0) {
            this.branches = data;
            this.currentBranch = this.branches[0];
            this.branchCode = this.branches[0].branchId;
          }
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

  getBranchDetails() {
    console.log(this.branchCode)
    for (let i = 0; i < this.branches.length; i++) {
      console.log(this.branchCode === this.branches[i].branchId)
      console.log(this.branches[i].branchId)
      if (this.branchCode === this.branches[i].branchId) {
        console.log(this.branches[i])
        this.currentBranch = this.branches[i];
      }
    }

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }


}
