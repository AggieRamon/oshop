import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/auth';
// import * as firebase from 'firebase';
import { User, auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
      const appUser$ = this.userService.get(user.uid);
      return appUser$.valueChanges();
      } else {
        return of(null);
      }
    }));
  }
}
