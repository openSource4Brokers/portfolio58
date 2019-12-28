import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { LanguageService } from './_services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  user: User;
  memberLoading = false;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }

      this.languageService.setInitialAppLanguage();
    });
  }

  ngOnInit() {
    this.memberLoading = true;

    const token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }
    if (this.user) {
      this.authService.currentUser = this.user;
    }
    this.memberLoading = false;
  }

  onLogout() {
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
