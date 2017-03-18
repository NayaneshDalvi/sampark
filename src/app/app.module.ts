import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth/auth-service';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { VoucherPage } from '../pages/voucher/voucher';
import { BranchPage } from '../pages/branch/branch';
import { CollectionStatusPage } from '../pages/collection-status/collection-status';
import { CouponsPage } from '../pages/coupons/coupons';
import { EventsPage } from '../pages/events/events';
import { GroupDetailsPage } from '../pages/group-details/group-details';
import { ProjectPage } from '../pages/project/project';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ChangepasswordPage } from '../pages/changePassword/changePassword';
import { IndianNumber } from '../pipes/indian-number';
import { EventDetailsPage } from '../pages/event-details/event-details';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,EventDetailsPage,
    LoginPage, DashboardPage, BranchPage, CollectionStatusPage, CouponsPage, EventsPage, GroupDetailsPage, ProjectPage, VoucherPage, AboutusPage, ChangepasswordPage, IndianNumber
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, DashboardPage, DashboardPage, BranchPage, CollectionStatusPage, CouponsPage, EventsPage, GroupDetailsPage, ProjectPage,
    LoginPage, VoucherPage, AboutusPage, ChangepasswordPage,EventDetailsPage
  ],
  providers: [AuthService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
