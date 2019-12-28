import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../_services/toast.service';
import { LanguageService } from '../../../_services/language.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.page.html',
  styleUrls: ['./settings-popover.page.scss']
})
export class SettingsPopoverPage implements OnInit {
  languages = [];
  selected = '';

  toggleLocalOnly: boolean;
  toggleShowCanceled: boolean;
  toggleServerLive: boolean;

  constructor(
    private popoverCtrl: PopoverController,
    private languageService: LanguageService,
    private toastService: ToastService,
    private ts: TranslateService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;

    this.storage.get('LOCALONLY').then(val => {
      if (val === 'TRUE') {
        this.toggleLocalOnly = true;
      } else {
        this.toggleLocalOnly = false;
      }
    });

    this.storage.get('SHOWCANCELED').then(val => {
      if (val === 'TRUE') {
        this.toggleShowCanceled = true;
      } else {
        this.toggleShowCanceled = false;
      }
    });

    this.storage.get('SERVERLIVE').then(val => {
      if (val === 'TRUE') {
        this.toggleServerLive = true;
      } else {
        this.toggleServerLive = false;
      }
    });

    this.ts.get('SETTINGS.MessageAlert').subscribe(value => {
      this.toastService.show(value, 'short');
    });
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.saveSettings();
    this.popoverCtrl.dismiss();
  }

  saveSettings() {
    if (this.toggleLocalOnly) {
      this.storage.set('LOCALONLY', 'TRUE');
    } else {
      this.storage.set('LOCALONLY', 'FALSE');
    }

    if (this.toggleShowCanceled) {
      this.storage.set('SHOWCANCELED', 'TRUE');
    } else {
      this.storage.set('SHOWCANCELED', 'FALSE');
    }

    if (this.toggleServerLive) {
      this.storage.set('SERVERLIVE', 'TRUE');
    } else {
      this.storage.set('SERVERLIVE', 'FALSE');
    }
  }
}
