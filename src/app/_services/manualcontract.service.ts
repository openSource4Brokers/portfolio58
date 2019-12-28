import { VsoftContract } from '../_models/vsoftContract';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ManualContractService {
  private _manualcontracts = new BehaviorSubject<VsoftContract[]>([
    /* {
      id: '890321456',
      a010: '0033',
      vs99: 'blabla kort',
      vs98: 'blabla lang',
      vs97: '8',
      aw2: '20991201',
      a325: '4'
    } */
  ]);

  constructor(private storage: Storage) {}

  get manualContracts() {
    return this._manualcontracts.asObservable();
  }

  loadManualContracts() {
    this.storage.get('MANUALCONTRACTS').then(val => {
      this._manualcontracts.next(JSON.parse(val));
    });
  }

  saveManualContracts() {
    const myJSON = JSON.stringify(this._manualcontracts);
    this.storage.set('MANUALCONTRACTS', myJSON);
  }

  getManualContract(Id: string) {
    return this.manualContracts.pipe(
      take(1),
      map(manualContracts => {
        return { ...manualContracts.find(mc => mc.id === Id) };
      })
    );
  }

  addMC(vsoftcontract: VsoftContract) {
    this.manualContracts.pipe(take(1)).subscribe(manualContracts => {
      this._manualcontracts.next(manualContracts.concat(vsoftcontract));
    });
  }

  updateMC(vsoftcontract: VsoftContract, Id: string) {
    return this.manualContracts.pipe(
      take(1),
      tap(mcs => {
        const updatedMCIndex = mcs.findIndex(pl => pl.id === Id);
        const updatedContracts = [...mcs];
        updatedContracts[updatedMCIndex] = vsoftcontract;
        this._manualcontracts.next(updatedContracts);
      })
    );
  }
}
