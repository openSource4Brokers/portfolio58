import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { InsurerService } from '../../../_services/insurer.service';
import { Insurer } from '../../../_models/insurer';
import { VsoftContract } from '../../../_models/vsoftContract';
import { SelectOptions } from '../../../_models/selectOptions';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-contractdetail',
  templateUrl: './contractdetail.component.html',
  styleUrls: ['./contractdetail.component.scss']
})
export class ContractdetailComponent implements OnInit {
  @Input() selectedContract: VsoftContract;
  @Input() isManual: boolean;

  isAndroid: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIphone: boolean;
  hasPhoneFunction: boolean;

  loadedInsurer: Insurer;
  insurerImage: string;
  defaultSelected: string;
  policie: string;

  closeForMap = true;

  VS97S: SelectOptions[]; // Actioncode

  constructor(
    private platform: Platform,
    private insurerService: InsurerService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private router: Router
  ) {}

  ionViewDidLoad() {}

  refreshLanguage() {
    this.translate
      .get('selectOptions.VS97')
      .subscribe((res: SelectOptions[]) => {
        this.VS97S = res;
      });
  }

  ngOnInit() {
    this.isTablet = this.platform.is('tablet');
    this.isAndroid = this.platform.is('android');
    this.isDesktop = this.platform.is('desktop');
    this.isIphone = this.platform.is('iphone');
    this.hasPhoneFunction = false;

    if (this.isIphone) {
      this.hasPhoneFunction = true;
    } else {
      if (this.isAndroid) {
        if (!this.isTablet) {
          this.hasPhoneFunction = true;
        }
      } else {
        if (this.isDesktop) {
          this.hasPhoneFunction = true;
        }
      }
    }

    this.refreshLanguage();
    this.loadedInsurer = this.insurerService.getInsurer(
      'be_' + this.selectedContract.a010
    );

    this.insurerImage =
      'assets/images/companies/be_' + this.selectedContract.a010 + '.png';
  }

  onCancel(forMap: boolean) {
    if (!forMap) {
      this.modalCtrl.dismiss(null, 'cancel');
    } else {
      this.modalCtrl.dismiss(null, 'cancelForMap');
    }
  }

  async onClipTest(comType: string) {
    Clipboard.write({
      string: comType
    });

    const str = await Clipboard.read({
      type: 'string'
    });
  }

  onCall(comNumber: string) {
    window.open('tel:' + comNumber, '_system');
  }

  onMail(mailAddress: string) {
    if (this.loadedInsurer.id === 'be_0145') {
      this.policie = '$' + this.selectedContract.id + '$';
    } else {
      this.policie = this.selectedContract.id;
    }

    const subject = '?subject=' + this.loadedInsurer.name + ' ' + this.policie;
    const message = 'Gelieve';

    window.open(
      'mailto:' + mailAddress + subject + '&body=' + message,
      '_system'
    );
  }

  loadMapPage() {
    this.router.navigate(['map']);
  }
}
