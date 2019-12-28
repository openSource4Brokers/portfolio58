import { Insurer } from '../../_models/insurer';
import { InsurerService } from '../../_services/insurer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurers',
  templateUrl: './insurers.page.html',
  styleUrls: ['./insurers.page.scss']
})
export class InsurersPage implements OnInit {
  insurers: Insurer[];

  constructor(private insurerService: InsurerService) {}

  ngOnInit() {
    this.insurers = this.insurerService.getAllInsurers();
  }
}
