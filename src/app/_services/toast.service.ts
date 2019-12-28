import { Injectable } from '@angular/core';

import { Toast } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {}

  async show(message: string, waiting: 'short' | 'long') {
    await Toast.show({
      text: message,
      duration: waiting
    });
  }
}
