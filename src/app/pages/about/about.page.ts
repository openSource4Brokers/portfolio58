import { Component, OnInit } from '@angular/core';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  outputPath = 'https://github.com/openSource4Brokers/Portfolio58';
  version: string = version;

  constructor() {}

  ngOnInit() {}
}
