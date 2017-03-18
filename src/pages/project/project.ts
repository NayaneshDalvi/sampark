import { Component } from '@angular/core';
import { ProjectService } from '../../providers/project/project-service';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment'

/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
  providers: [ProjectService]
})
export class ProjectPage {
  project: any;
  user: any;
  loading: Loading;
  certificateNo: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private ProjectService: ProjectService, private toastController: ToastController, private alertCtrl: AlertController) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }


  getProjectContribution() {
    this.showLoading();
    let apiObj = { "certNo": this.certificateNo, "introducerCode": this.user.ffCode }
    this.ProjectService.getProjectContributionDetails(apiObj).then(
      (data: any) => {
        this.loading.dismiss();
        this.project = data[0];
      }, error => {
        this.loading.dismiss();
        delete this.project
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

  getEmiPaid(project) {
    if (project.paymentFrequency === 'M') {
      return project.planDuration.toString() + "/" + project.emiNo.toString();
    } else if (project.paymentFrequency === 'Y') {
      let projectDuration = Number(project.planDuration) / 12;// get no of years
      return projectDuration.toString() + "/" + project.emiNo.toString();
    } else if (project.paymentFrequency === 'Q') {
      let projectDuration = Number(project.planDuration) / 3;// get no of years
      return projectDuration.toString() + "/" + project.emiNo.toString();
    } else if (project.paymentFrequency === 'H') {
      let projectDuration = Number(project.planDuration) / 6;// get no of years
      return projectDuration.toString() + "/" + project.emiNo.toString();
    } else if (project.paymentFrequency === 'F') {
      return  project.emiNo.toString();
    }
    return "0";
  }

  getDate(date: any) {
    if (date != null) {
      return moment(date).format('MMM DD, YYYY');
    } else {
      return "NA";
    }

  }
}
