import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private ts: TranslateService, private ionicStorage: Storage) {}

  setInitialAppLanguage() {
    const language = this.ts.getBrowserLang();
    this.ts.setDefaultLang(language);

    this.ionicStorage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    return [
      {
        text: 'Nederlands',
        value: 'nl',
        img: 'assets/images/flags/nl_small.png'
      },
      { text: 'English', value: 'en', img: 'assets/images/flags/en_small.png' },
      {
        text: 'Français',
        value: 'fr',
        img: 'assets/images/flags/fr_small.png'
      } /* ,
      {
        text: 'Deutsch',
        value: 'de',
        img: 'assets/images/flags/de_small.png'
      } */
    ];
  }

  setLanguage(lng) {
    this.ts.use(lng);
    this.selected = lng;
    this.ionicStorage.set(LNG_KEY, lng);
  }
}
