import { Component } from '@angular/core';
import { GroupDetailService } from '../../providers/group-details/groupdetail-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Contact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [GroupDetailService]
})
export class ContactPage {
  promoter: any;
  user: any;
  loading: Loading;
  promoterNo: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private GroupDetailService: GroupDetailService, private toastController: ToastController, private alertCtrl: AlertController) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  getContactDetails() {
    this.showLoading();
    let apiObj = { "rank": this.user.rankId, "promoterCode": this.promoterNo, "ffCode": this.user.ffCode }
    this.GroupDetailService.getContactDetails(apiObj).then(
      (data: any) => {
        this.loading.dismiss();
        if (data.length > 0) {
          this.promoter = data[0];
        } else {
          delete this.promoter
          let toast = this.toastController.create({
            message: "User Data unAvailable",
            duration: 2500
          });
          toast.present();
        }

      }, error => {
        delete this.promoter
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


// Select 
// A.FF_NAME, 
// COALESCE(B.eCOUPONS_CREDIT, 0) as eCOUPONS_CREDIT_FROM_VOUCHER, 
// COALESCE(C.eCOUPONS_DEBIT, 0) as eCOUPONS_DEBIT_FROM_FMCG_SALES, 
// COALESCE(D.eCOUPONS_DEBIT, 0) as eCOUPONS_DEBIT_FROM_BITO_SALES, 
// COALESCE(E.eCOUPONS_DEBIT, 0) as eCOUPONS_DEBIT_FROM_BITO_PROMOTER_ENROLLMENT, 
// COALESCE(F.eCOUPONS_ADHOC_CREDIT, 0) as eCOUPONS_ADHOC_CREDIT, 
// COALESCE(G.eCOUPONS_ADHOC_DEBIT, 0) as eCOUPONS_ADHOC_DEBIT 
// from 
// FIELD_FORCE_MASTER A left join 
// eCOUPONS_CREDIT_FROM_VOUCHER B on A.FF_CODE = B.FF_CODE left join 
// eCOUPONS_DEBIT_FROM_FMCG_SALES C on A.FF_CODE = C.FF_CODE left join 
// eCOUPONS_DEBIT_FROM_BITO_SALES D on A.FF_CODE = D.FF_CODE left join 
// eCOUPONS_DEBIT_FROM_BITO_PROMOTER_ENROLLMENT E on A.FF_CODE = E.FF_CODE left join 
// eCOUPONS_ADHOC_CREDIT F on A.FF_CODE = F.FF_CODE left join 
// eCOUPONS_ADHOC_DEBIT G on A.FF_CODE = G.FF_CODE 
// where 
// A.FF_CODE = 520