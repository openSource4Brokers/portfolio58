import { Platform } from '@ionic/angular';
import { InsurerService } from '../../../_services/insurer.service';
import { Insurer } from '../../../_models/insurer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-insurer-detail',
  templateUrl: './insurer-detail.page.html',
  styleUrls: ['./insurer-detail.page.scss']
})
export class InsurerDetailPage implements OnInit {
  isAndroid: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasPhoneFunction: boolean;

  loadedInsurer: Insurer;

  constructor(
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private insurerService: InsurerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isTablet = this.platform.is('tablet');
    this.isAndroid = this.platform.is('android');
    this.isDesktop = this.platform.is('desktop');
    this.hasPhoneFunction = false;
    if (this.isAndroid) {
      if (!this.isTablet) {
        this.hasPhoneFunction = true;
      }
    } else {
      if (this.isDesktop) {
        this.hasPhoneFunction = true;
      }
    }

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('insurerId')) {
        // redirect
        this.router.navigate(['/insurers']);
        return;
      }
      const insurerId = paramMap.get('insurerId');
      this.loadedInsurer = this.insurerService.getInsurer(insurerId);
    });
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

  onMail(address: string) {
    const subject = '?subject=' + this.loadedInsurer.name;
    window.open('mailto:' + address + subject, '_system');
  }
}
