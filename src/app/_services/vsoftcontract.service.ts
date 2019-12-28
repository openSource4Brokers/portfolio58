import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VsoftContract } from '../_models/vsoftContract';

@Injectable()
export class VsoftContractService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) {}

  getVsoftContract(id: string): Observable<VsoftContract> {
    return this.authHttp.get<VsoftContract>(
      this.baseUrl + 'vsoftcontracts/' + id
    );
  }
}
