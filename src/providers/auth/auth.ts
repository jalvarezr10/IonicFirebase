import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>


  constructor(public http: HttpClient, private angularFireAuth: AngularFireAuth) {
    // console.log('Hello AuthProvider Provider');
    this.user = this.angularFireAuth.authState;
  }

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  resetPassword(email: string){
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  signOut() {
    return this.angularFireAuth.auth.signOut();
  }
}
