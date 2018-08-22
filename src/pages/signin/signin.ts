import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ToastOptions } from 'ionic-angular';
import { User } from '../../models/user';
import { NgForm } from '../../../node_modules/@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  toastOptions: ToastOptions;
  user: User = new User();
  @ViewChild('formLogin') formLogin: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private authProvider: AuthProvider
    , private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  goToSignUp() {
    this.navCtrl.setRoot(SignupPage);
  }

  goToResetPassword(){
    this.navCtrl.setRoot(ResetpasswordPage);
  }

  SignIn() {
    if (this.formLogin.valid) {
      this.authProvider.signIn(this.user)
        .then(() => {
          const loader = this.loadingCtrl.create({
            content: 'Iniciando Sesión ...'
          });
          loader.present();
          this.navCtrl.setRoot(HomePage);
          loader.dismiss();
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code === 'auth/invalid-email') {
            toast.setMessage('Ingrese Un Email Válido ');
            toast.present();
          } else if (error.code === 'auth/user-disabled') {
            toast.setMessage('El Usuario Se Encuentra Inactivo');
            toast.present();
          } else if (error.code === 'auth/user-disabled') {
            toast.setMessage('El Usuario no fue Encontrado');
            toast.present();
          } else if (error.code === 'auth/user-disabled') {
            toast.setMessage('Ingrese una Contraseña Válida');
            toast.present();
          }
          else{
            toast.setMessage('Valide Sus Credenciales');
            toast.present();
          }

        })
    }

  }

}
