import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { EventService } from '../../providers/events/event-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers: [EventService]
})
export class EventsPage {
  eventList: any;
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private EventService: EventService, private toastController: ToastController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.getAllEvents();
  }

  getAllEvents() {
    this.showLoading();
    let user = {}
    this.EventService.getAllEvents(user).then(
      (data: any) => {
        this.loading.dismiss();
        this.eventList = data;
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


  showDetails(events: any) {
    console.log(event)
    this.navCtrl.push(EventDetailsPage, {
      EVENT_DETAIL: events
    });

  }

}
