import { ImagePickerComponent } from './image-picker/image-picker.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LocationPickerComponent,
    MapModalComponent,
    ImagePickerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ],
  exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
