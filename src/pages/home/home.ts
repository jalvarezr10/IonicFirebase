import { Component, ViewChild } from '@angular/core';
import { NavController, ToastOptions, ToastController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toastOptions: ToastOptions;
  user: User = new User();
  @ViewChild('formLogin') formLogin: NgForm;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private authProvider: AuthProvider
    , private loadingCtrl: LoadingController) {

  }


  signOut() {
    const loader = this.loadingCtrl.create({
      content: 'Cerrando Sesión ...',
      duration: 1000
    });
    this.authProvider.signOut()
      .then(() => {
        loader.present();
        this.navCtrl.setRoot(SigninPage);
        loader.dismiss();
      })
      .catch((error) => {
        console.error(error);
      })
  }

}
