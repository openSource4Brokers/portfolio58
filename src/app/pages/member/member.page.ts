import { AlertController } from '@ionic/angular';
import { ToastService } from './../../_services/toast.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import { StoragePhoto } from 'src/app/_models/storagePhoto';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss']
})
export class MemberPage implements OnInit {
  public photos: StoragePhoto[] = [];

  editForm: FormGroup;
  // @ViewChild('editForm')
  user: User;
  imgData: any;

  searchClient: string;
  hasClientNumber: boolean;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: ToastService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.isLoading = false;
  }

  ionViewDidEnter() {
    if (!this.hasClientNumber) {
      // clientNumberWarning
      const msg =
        // tslint:disable-next-line:max-line-length
        'Contracten via ons kantoor zijn spoedig raadpleegbaar. U kan deze melding uitschakelen indien U enkel met eigen inbreng wenst te werken';
      this.ts.show(msg, 'long');
    }
  }

  ngOnInit() {
    this.loadSavedPhotos();
    this.route.data.subscribe(data => {
      this.user = data.user;

      if (this.user.clientNumber === null) {
        this.hasClientNumber = false;
      } else {
        this.hasClientNumber = true;
      }
    });
  }

  onImagePicked(imageData: string | File) {
    let imageFile: any;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.imgData = imageFile;
    this.photos.unshift({
      data: imageData
    });

    // Save all photos for later viewing
    this.storage.set('photos', this.photos);
    // console.log(this.imgData);
  }

  loadClientData(clientId: string) {
    this.isLoading = true;
    this.router.navigate(['/customers', clientId]);
  }

  fakeClientNumber(clientId: string) {
    this.isLoading = true;
    this.router.navigate(['/customers', this.searchClient]);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERT.titlePageRefresh'),
      message:
        this.translate.instant('ALERT.msgPartOne') +
        ' <strong>' +
        this.translate.instant('ALERT.msgPartTwo') +
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
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

  loadSavedPhotos() {
    this.storage.get('photos').then(photos => {
      this.photos = photos || [];
    });
  }
}
