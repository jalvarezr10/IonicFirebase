import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  userEmail: string;
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  resetPassword() {

    if (this.form.form.valid) {
      const toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      this.authProvider.resetPassword(this.userEmail)
        .then(() => {
          const loader = this.loadingCtrl.create({
            content: 'Iniciando Sesión ...'
          });
          loader.present();
          toast.setMessage('La Solicitud fue enviada a su Correo, Favor de Confirmar');
          toast.present();
          loader.dismiss();
          this.cleanForm();
        })
        .catch((error: any) => {
          if (error.code === 'auth/invalid-email') {
            toast.setMessage('Ingrese un Email Válido');
            toast.present();
          }
          if (error.code === 'auth/user-not-found') {
            toast.setMessage('El Email no fue encontrado');
            toast.present();
          }
        });
    }

  }

  cleanForm(){
    this.userEmail = '';
  }

}
