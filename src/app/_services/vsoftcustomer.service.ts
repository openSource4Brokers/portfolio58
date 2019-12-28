import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VsoftCustomer } from '../_models/vsoftCustomer';
import { PaginatedResult } from '../_models/pagination';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class VsoftCustomerService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) {}

  getVsoftCustomers(
    page?: string,
    itemsPerPage?: string,
    customerParams?: { minA107: string; maxA107: string }
  ) {
    const paginatedResult: PaginatedResult<
      VsoftCustomer[]
    > = new PaginatedResult<VsoftCustomer[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (customerParams != null) {
      params = params.append('minA107', customerParams.minA107);
      params = params.append('maxA107', customerParams.maxA107);
    }

    return this.authHttp
      .get<VsoftCustomer[]>(this.baseUrl + 'vsoftcustomers', {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getVsoftCustomer(id: string): Observable<VsoftCustomer> {
    return this.authHttp.get<VsoftCustomer>(
      this.baseUrl + 'vsoftcustomers/' + id
    );
  }

  newVsoftCustomer(customer: VsoftCustomer) {
    return this.authHttp.post(
      this.baseUrl + 'vsoftcustomers/customercreate',
      customer,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );
  }

  updateVsoftCustomer(customer: VsoftCustomer) {
    return this.authHttp.put(
      this.baseUrl + 'vsoftcustomers/updatecustomer',
      customer
    );
  }

  /* updateVsoftCustomer(customer: VsoftCustomer) {
    return this.authHttp.put(
      this.baseUrl + 'vsoftcustomers/updatecustomer',
      customer,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );
  } */
  // TODO IF NEEDED:
  /* deleteVsoftContract(vsoftCustomerId: number, id: number) {
    return this.authHttp.delete(
      this.baseUrl + 'vsoftcustomers/' + vsoftCustomerId + '/vsoftcontracts/' + id
    );
  } */
}
