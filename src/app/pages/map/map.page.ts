import { PlaceLocation } from './../../_models/location';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
  pickedAddress: string;
  pickedLatitude: number;
  pickedLongitude: number;

  constructor() {}

  ngOnInit() {}

  onLocationPicked(location: PlaceLocation) {
    this.pickedAddress = location.address;
    this.pickedLatitude = location.lat;
    this.pickedLongitude = location.lng;
  }
}
