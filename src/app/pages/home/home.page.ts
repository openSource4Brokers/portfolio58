import { ManualContractService } from './../../_services/manualcontract.service';
import { SettingsPopoverPage } from './settings-popover/settings-popover.page';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  memberLoading = false;
  toggleServerLive = false;
  toggleLocalOnly = false;

  dateOfCopy: Date;

  constructor(
    private router: Router,
    private authService: AuthService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private mc: ManualContractService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('LOCALONLY').then(val => {
      if (val === 'TRUE') {
        this.toggleLocalOnly = true;
      } else {
        this.toggleLocalOnly = false;
      }
    });
    this.checkForLive();
  }

  ionViewWillEnter() {
    this.mc.loadManualContracts();
    this.memberLoading = false;
    if (this.authService.currentUser) {
    }
  }

  checkForLive() {
    this.storage.get('SERVERLIVE').then(vals => {
      if (vals === 'TRUE') {
        this.toggleServerLive = true;
      } else {
        this.storage.get('DATEOFCOPY').then(val => {
          if (!val) {
            this.storage.set('SERVERLIVE', 'TRUE');
            this.toggleServerLive = true;
          } else {
            this.dateOfCopy = new Date(val);
            this.toggleServerLive = false;
          }
        });
      }
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  showMemberPage() {
    this.memberLoading = true;
    this.router.navigateByUrl('/member');
  }

  loadLocalData() {
    this.router.navigate(['/customerslocalcopy']);
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERT.header'),
      message: this.translate.instant('ALERT.msg'),
      buttons: ['OK']
    });
    alert.present();
  }

  async openSettingsPopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: SettingsPopoverPage,
      event: ev
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    this.checkForLive();
    this.storage.get('LOCALONLY').then(val => {
      if (val === 'TRUE') {
        this.toggleLocalOnly = true;
      } else {
        this.toggleLocalOnly = false;
      }
    });
  }
}
