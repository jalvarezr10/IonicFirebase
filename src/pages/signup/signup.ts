import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  toastOptions: ToastOptions;

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private authProvider: AuthProvider
              ,private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToLogin(){
    this.navCtrl.setRoot(SigninPage);
  }

  createAccount() {
    if (this.form.form.valid) {
      const loader = this.loadingCtrl.create({
        content: 'Cargando ...',
        duration: 3000
      });

      this.authProvider.createUser(this.user)
        .then((user: any) => {

          this.toastOptions = {
            message: 'Usuario Creado Con Éxito',
            duration: 2000
          };
          // user.sendEmailVerification();
          loader.present();
          this.showToast();
          this.navCtrl.setRoot(HomePage);
          loader.dismiss();
        })
        .catch((error: any) => {
          if (error.code === 'auth/email-already-in-use') {
            this.toastOptions = {
              message: 'Correo Ya En Uso',
              duration: 3000
            };
          } else if (error.code === 'auth/invalid-email') {
            this.toastOptions = {
              message: 'Correo Inválido',
              duration: 3000
            };
          } else if (error.code === 'auth/operation-not-allowed') {
            this.toastOptions = {
              message: 'Error en la Operación',
              duration: 3000
            };
          } else if (error.code === 'auth/weak-password') {
            this.toastOptions = {
              message: 'Contraseña muy Corta',
              duration: 3000
            };
          }
          this.showToast();
        });
    }
  }

  showToast() {
    const toast = this.toastCtrl.create(this.toastOptions);
    toast.present();
  }

}
