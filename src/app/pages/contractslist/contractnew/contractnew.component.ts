import { SelectOptions } from '../../../_models/selectOptions';
import { ManualContractService } from './../../../_services/manualcontract.service';
import { ToastService } from './../../../_services/toast.service';
import { VsoftContract } from '../../../_models/vsoftContract';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contractnew',
  templateUrl: './contractnew.component.html',
  styleUrls: ['./contractnew.component.scss']
})
export class ContractNewComponent implements OnInit {
  @Input() lastId: number;

  form: FormGroup;
  vsoftContract: VsoftContract;

  VS97S: SelectOptions[]; // Actioncode
  A010S: SelectOptions[]; // Insurers
  A325S: SelectOptions[]; // Splitsingcode

  constructor(
    private toast: ToastService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private mcService: ManualContractService
  ) {}

  ngOnInit() {
    this.refreshLanguage();
    this.createContractForm();
  }

  ionViewDidEnter() {
    const message =
      'Uw manueel ingebrachte contracten worden uitsluitend bewaard op dit toestel!';

    this.toast.show(message, 'long');
  }

  createContractForm() {
    this.form = new FormGroup({
      id: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(12)]
      }),
      a010: new FormControl('', {
        validators: [Validators.required]
      }),
      vs99: new FormControl('', {
        validators: [Validators.required, Validators.min(1)]
      }),
      vs98: new FormControl(''),
      vs97: new FormControl('1', {
        validators: [Validators.required]
      }),
      aw2: new FormControl('', {
        validators: [Validators.required]
      }),
      a325: new FormControl('1', {
        validators: [Validators.required]
      })
    });
  }

  onCreate() {
    if (this.form.valid) {
      this.vsoftContract = Object.assign({}, this.form.value);
      this.mcService.addMC(this.vsoftContract);
      this.form.reset();
      this.modalCtrl.dismiss(this.vsoftContract, 'added');
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  refreshLanguage() {
    this.translate
      .get('selectOptions.VS97')
      .subscribe((res: SelectOptions[]) => {
        this.VS97S = res;
      });

    this.translate
      .get('selectOptions.A010')
      .subscribe((res: SelectOptions[]) => {
        this.A010S = res;
      });

    this.translate
      .get('selectOptions.A325')
      .subscribe((res: SelectOptions[]) => {
        this.A325S = res;
      });
  }
}
