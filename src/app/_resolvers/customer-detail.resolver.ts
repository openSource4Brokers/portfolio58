import { ToastService } from './../_services/toast.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { VsoftCustomer } from '../_models/vsoftCustomer';
import { VsoftCustomerService } from '../_services/vsoftcustomer.service';

@Injectable()
export class CustomerDetailResolver implements Resolve<VsoftCustomer> {
  constructor(
    private vCs: VsoftCustomerService,
    private router: Router,
    private toast: ToastService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VsoftCustomer> {
    return this.vCs.getVsoftCustomer(route.params.id).pipe(
      catchError(error => {
        this.toast.show('Problem retrieving data', 'short');
        this.router.navigate(['/member']);
        return of(null);
      })
    );
  }
}
