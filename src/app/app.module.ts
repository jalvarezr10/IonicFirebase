import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Importamos las librerias de Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';
import {ResetpasswordPage} from '../pages/resetpassword/resetpassword';

//Providers
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '../../node_modules/@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyCfiXnYxU2Fl38mf1r5QbvAiP0qayiIMuU",
  authDomain: "ionicfirebase-567c9.firebaseapp.com",
  databaseURL: "https://ionicfirebase-567c9.firebaseio.com",
  projectId: "ionicfirebase-567c9",
  storageBucket: "ionicfirebase-567c9.appspot.com",
  messagingSenderId: "625801238721"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'angular-auth-firebase'),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider
  ]
})
export class AppModule { }
