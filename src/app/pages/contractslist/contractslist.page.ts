import { TranslateService } from '@ngx-translate/core';
import { ManualContractService } from './../../_services/manualcontract.service';
import { ContractdetailComponent } from './contractdetail/contractdetail.component';
import { VsoftContract } from '../../_models/vsoftContract';
import { ActivatedRoute, Router } from '@angular/router';
import { VsoftCustomer } from '../../_models/vsoftCustomer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ModalController,
  IonItemSliding,
  NavController,
  AlertController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { ContractEditComponent } from './contractedit/contractedit.component';
import { ContractNewComponent } from './contractnew/contractnew.component';

@Component({
  selector: 'app-contractslist',
  templateUrl: './contractslist.page.html',
  styleUrls: ['./contractslist.page.scss']
})
export class ContractsListPage implements OnInit, OnDestroy {
  customer: VsoftCustomer;
  manualContractToEdit: VsoftContract;
  servercontracts: VsoftContract[];
  myDocuments = '';
  hasDocumentsDef = false;

  toggleShowCanceled = false;
  toggleLocalOnly = false;
  toggleServerLive = false;

  manualcontracts: VsoftContract[];
  private manualcontractsSub: Subscription;
  isLocalCopy: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private mcService: ManualContractService,
    private ionicStorage: Storage,
    private alertCtrl: AlertController,
    private ts: TranslateService
  ) {}

  ngOnInit() {
    if (this.router.url === '/customerslocalcopy') {
      this.isLocalCopy = true;
      this.ionicStorage.get('SERVERCOPY').then(val => {
        this.customer = JSON.parse(val);
      });
    } else {
      this.isLocalCopy = false;
      this.route.data.subscribe(data => {
        this.customer = data.customer;
      });
    }

    this.ionicStorage.get('SERVERLIVE').then(vals => {
      if (vals === 'TRUE') {
        this.toggleServerLive = true;
      } else {
        this.toggleServerLive = false;
      }
    });

    this.ionicStorage.get('SHOWCANCELED').then(vals => {
      if (vals === 'TRUE') {
        this.toggleShowCanceled = true;
      } else {
        this.toggleShowCanceled = false;
      }
    });

    this.ionicStorage.get('LOCALONLY').then(vall => {
      if (vall === 'TRUE') {
        this.toggleLocalOnly = true;
      } else {
        this.toggleLocalOnly = false;
        this.servercontracts = this.customer.vsoftContracts;

        this.myDocuments = this.customer.v254;
        if (this.myDocuments.length) {
          this.hasDocumentsDef = true;
        }
      }
    });
  }

  ionViewWillEnter() {
    this.manualcontractsSub = this.mcService.manualContracts.subscribe(
      mcontracts => {
        this.manualcontracts = mcontracts;
        const myJSON = JSON.stringify(this.manualcontracts);
        this.ionicStorage.set('MANUALCONTRACTS', myJSON);
      }
    );
  }

  ngOnDestroy() {
    if (this.manualcontractsSub) {
      this.manualcontractsSub.unsubscribe();
    }
  }

  getColor(vs97: string) {
    switch (vs97) {
      default:
        return 'green'; // running
      case '7':
        return 'blue'; // suspended
      case '8':
        return 'blue'; // various
      case '9':
        return 'red'; // canceled
    }
  }

  showServerContractDetail(i: number) {
    this.modalCtrl
      .create({
        component: ContractdetailComponent,
        componentProps: {
          selectedContract: this.servercontracts[i],
          isManual: false,
          localCopy: this.isLocalCopy
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {});
  }

  showManualContractDetail(i: number) {
    this.modalCtrl
      .create({
        component: ContractdetailComponent,
        componentProps: {
          selectedContract: this.manualcontracts[i],
          isManual: true,
          localCopy: this.isLocalCopy
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData);
      });
  }

  onNewManualContract() {
    const mcIndex = this.manualcontracts.length;
    this.modalCtrl
      .create({
        component: ContractNewComponent,
        componentProps: {
          lastId: mcIndex
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {});
  }

  onEditManualContract(mcIndex: number, slidingEl: IonItemSliding) {
    slidingEl.close();

    this.modalCtrl
      .create({
        component: ContractEditComponent,
        componentProps: {
          selectedContract: this.manualcontracts[mcIndex]
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'updated') {
          this.manualcontracts[mcIndex] = resultData.data;
          const myJSON = JSON.stringify(this.manualcontracts);
          this.ionicStorage.set('MANUALCONTRACTS', myJSON);
        }
      });
  }

  onDeleteManualContract(mcId: number, slidingEl: IonItemSliding) {
    slidingEl.close();
  }

  async saveLocalCopy() {
    const alert = await this.alertCtrl.create({
      header: this.ts.instant('ALERT.titleSaveCopy'),
      message:
        this.ts.instant('ALERT.msgSaveCopy') +
        ' <strong>' +
        this.ts.instant('ALERT.msgAreYouSure') +
        '</strong>',
      buttons: [
        {
          text: this.ts.instant('ALERT.btnCancelText'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: this.ts.instant('ALERT.btnOkText'),
          handler: () => {
            const myJSON = JSON.stringify(this.customer);
            this.ionicStorage.set('SERVERCOPY', myJSON);

            const dateOfCopy = new Date();
            this.ionicStorage.set('DATEOFCOPY', dateOfCopy.toISOString());
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.ts.instant('ALERT.titleRefresh'),
      message:
        this.ts.instant('ALERT.msgRefresh') +
        ' <strong>' +
        this.ts.instant('ALERT.msgAreYouSure') +
        '</strong>',
      buttons: [
        {
          text: this.ts.instant('ALERT.btnCancelText'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: this.ts.instant('ALERT.btnOkText'),
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }
}
