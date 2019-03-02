import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { LoginComponent } from './views/login/login.component';
import { longStackSupport } from 'q';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators'
import { auth } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid = this.afAuth.authState.pipe(map(authState => {
    if (!authState) {
      return null;
    }
    else {
      return authState.uid;
    }
  }));
  isAdmin = this.uid.pipe(
    switchMap(uid => {
      if (!uid) {
        return observableOf(false);
      }
      else {
        return this.db.object('/admins/' + uid).valueChanges()
      }
    })
  )
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  login(email:string,password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
  