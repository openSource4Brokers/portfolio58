import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const KEY_LOCALONLY = 'LOCALONLY';
const KEY_SHOWCANCELED = 'SHOWCANCELED';
const KEY_SERVERLIVE = 'SERVERLIVE';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  selected = '';

  constructor(private storage: Storage) {}

  setInitialAppSettings() {
    this.storage.get(KEY_LOCALONLY).then(val => {
      if (!val) {
        this.setSetting(KEY_LOCALONLY, 'FALSE');
        this.setSetting(KEY_SHOWCANCELED, 'FALSE');
        this.setSetting(KEY_SERVERLIVE, 'FALSE');
      }
    });
  }

  getAppSetting(KEY: 'LOCALONLY' | 'YEARLYCHECKUP' | 'SERVERLIVE') {
    this.storage.get(KEY).then(val => {
      return val;
    });
  }

  setSetting(KEY: string, option: string) {
    this.storage.set(KEY, option);
  }
}
