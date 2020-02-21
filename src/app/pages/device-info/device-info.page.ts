import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';

import {
  Plugins,
  Capacitor,
  CameraResultType,
  CameraSource
} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { StoragePhoto } from 'src/app/_models/storagePhoto';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const { App, BackgroundTask } = Plugins;

App.addListener('appStateChange', state => {
  if (!state.isActive) {
    // The app has become inactive. We should check if we have some work left to do, and, if so,
    // execute a background task that will allow us to finish that work before the OS
    // suspends or terminates our app:
    console.log('state');

    const taskId = BackgroundTask.beforeExit(async () => {
      // In this function We might finish an upload, let a network request
      // finish, persist some data, or perform some other task

      // Example of long task
      const start = new Date().getTime();
      for (let i = 0; i < 1e18; i++) {
        if (new Date().getTime() - start > 20000) {
          break;
        }
      }
      // Must call in order to end our task otherwise
      // we risk our app being terminated, and possibly
      // being labeled as impacting battery life
      BackgroundTask.finish({
        taskId
      });
    });
  }
});

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.page.html',
  styleUrls: ['./device-info.page.scss']
})
export class DeviceInfoPage implements OnInit {
  photo: SafeResourceUrl;
  public photos: StoragePhoto[] = [];
  myPossibleDevices: string[];

  constructor(
    private sanitizer: DomSanitizer,
    private ionicStorage: Storage,
    private platform: Platform,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadSavedPhotos();
    this.myPossibleDevices = this.platform.platforms();
  }

  loadSavedPhotos() {
    this.ionicStorage.get('photos').then(photos => {
      this.photos = photos || [];
    });
  }

  async takePicture() {
    /* const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    ); */

    const isAvailable = Capacitor.isPluginAvailable('Camera');

    if (!isAvailable) {
      // this.filePickerRef.nativeElement.click();
      console.log('no camera, fallback to openfile');
      return;
    } else {
      // Otherwise, make the call:
      Plugins.Camera.getPhoto({
        quality: 100,
        source: CameraSource.Prompt,
        correctOrientation: true,
        // height: 320,
        // width: 200,
        resultType: CameraResultType.DataUrl
      })
        .then(image => {
          this.photos.unshift({
            data: image.dataUrl
          });
          // Save all photos for later viewing
          this.ionicStorage.set('photos', this.photos);
          // console.log(this.imgData);
          // console.log('image.webPath: ' + image.webPath);
          // console.log('image.path: ' + image.path);
          console.log('image.format: ' + image.format);
          // console.log('image.exif: ' + image.exif);
          // console.log('image.base64String: ' + image.base64String);
          console.log('image.dataUrl: ' + image.dataUrl);
        })
        .catch(error => {
          console.log(error);
          console.log('error with camera, fallback to use a filepicker');
          // this.filePickerRef.nativeElement.click();

          return false;
        });
    }
  }

  async deletePhotos() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERT.titleDeletePhotos'),
      message:
        this.translate.instant('ALERT.msgDeletePhotos') +
        ' <strong>' +
        this.translate.instant('ALERT.msgAreYouSure') +
        '</strong>',
      buttons: [
        {
          text: this.translate.instant('ALERT.btnCancelText'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: this.translate.instant('ALERT.btnOkText'),
          handler: () => {
            this.ionicStorage.remove('photos');
            this.loadSavedPhotos();
          }
        }
      ]
    });

    await alert.present();
  }
}
