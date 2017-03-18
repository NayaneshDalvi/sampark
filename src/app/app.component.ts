import { Component, ViewChild } from '@angular/core';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ChangepasswordPage } from '../pages/changePassword/changePassword';
import { Platform, Nav, Events } from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html',
  providers: []
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  public local: any;
  public userName: any;
  public isuserName: boolean;
  public user: any;
  public deviceToken: any;
  public picture: any;
  device: any;

  pages: Array<{ title: string, icon: string, component: any }>;
  constructor(private events: Events, private toastController: ToastController, public platform: Platform, private alertCtrl: AlertController) {
    this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));
    this.events.subscribe('LOGIN_EVENT', () => {
      this.user = JSON.parse(window.localStorage.getItem("AUTH_USER"));

      console.log("EVENT TRIGERR")
      this.pages = [
        { title: 'Home', icon: "home", component: DashboardPage },
        { title: 'Change Password', icon: "lock", component: ChangepasswordPage },
        { title: 'About Us', icon: "information-circle", component: AboutusPage },
      ];
      this.isuserName = true;
      this.userName = this.user.fullName;
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: "home", component: DashboardPage },
      { title: 'Change Password', icon: "lock", component: ChangepasswordPage },
      { title: 'About Us', icon: "information-circle", component: AboutusPage },
    ];
    this.isuserName = false;
    console.log(this.user)
    console.log(typeof (this.user))
    if (this.user != null) {
      this.isuserName = true;
      this.userName = this.user.fullName;
      this.rootPage = DashboardPage;
      this.picture = "img/avatar.png;";
    } else {
      this.isuserName = false;
      this.rootPage = LoginPage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.hideSplashScreen();
      Keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //  let nav = this.app.getComponent('nav');
    console.log(this.nav.last().component === page.component)
    if (this.nav.last().component !== page.component) {
      this.nav.push(page.component);
    }
    //   this.nav.push(page.component);
  }

  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }


  doClick() {
    window.localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
}
