import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BranchPage } from '../branch/branch';
import { ContactPage } from '../contact/contact';
import { CollectionStatusPage } from '../collection-status/collection-status';
import { CouponsPage } from '../coupons/coupons';
import { EventsPage } from '../events/events';
import { GroupDetailsPage } from '../group-details/group-details';
import { ProjectPage } from '../project/project';
import { LoginPage } from '../login/login';
import {VoucherPage} from '../voucher/voucher';


/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  
  pages: Array<{component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.pages=[{component: CollectionStatusPage },
   {component: GroupDetailsPage },{component: VoucherPage },{component: ContactPage },{component: CouponsPage },{component: BranchPage },{component: ProjectPage },{component: EventsPage }];
  
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad DashboardPage');
  }

gotoPage(pageIndex){

console.log(this.pages[pageIndex].component)	
this.navCtrl.push(this.pages[pageIndex].component);
}

logout(){
 window.localStorage.clear();
this.navCtrl.setRoot(LoginPage);	
}

}
