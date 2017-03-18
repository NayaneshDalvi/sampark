import { Component } from '@angular/core';
import { GroupDetailService } from '../../providers/group-details/groupdetail-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the GroupDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
  providers: [GroupDetailService]
})
export class GroupDetailsPage {
  groupDetailList: any;
  user: any;
  loading: Loading;

  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private GroupDetailService: GroupDetailService, private toastController: ToastController, private alertCtrl: AlertController) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailsPage');
    this.getCouponDetails();
  }

  getCouponDetails() {
    this.showLoading();
    let apiObj = { "rank": this.user.rankId, "ffCode": this.user.ffCode }
    this.GroupDetailService.getGroupDetails(apiObj).then(
      (data: any) => {
        this.loading.dismiss();
        this.groupDetailList = data;
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  getMemberCount() {
   let count=0; 
   if(this.groupDetailList){
     for(let i=0;i<this.groupDetailList.length;i++){
      count=count+Number(this.groupDetailList[i].memberCount) 
     }
   }
    return count;
  }

}
