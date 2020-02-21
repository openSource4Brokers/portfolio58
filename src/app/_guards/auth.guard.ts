import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../_services/toast.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ts: TranslateService,
    private toast: ToastService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data.roles as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/home']);
        this.ts.get('ALERT.authMessage').subscribe(value => {
          this.toast.show(value, 'long');
        });
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.ts.get('ALERT.authMessage').subscribe(value => {
      this.toast.show(value, 'long');
    });

    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    return false;
  }
}
