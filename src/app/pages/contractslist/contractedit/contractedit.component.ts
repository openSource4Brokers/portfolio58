import { ManualContractService } from './../../../_services/manualcontract.service';
import { SelectOptions } from '../../../_models/selectOptions';
import { VsoftContract } from '../../../_models/vsoftContract';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contractedit',
  templateUrl: './contractedit.component.html',
  styleUrls: ['./contractedit.component.scss']
})
export class ContractEditComponent implements OnInit {
  @Input() selectedContract: VsoftContract;

  form: FormGroup;

  VS97S: SelectOptions[]; // Actioncode
  A010S: SelectOptions[]; // Insurers
  A325S: SelectOptions[]; // Splitsingcode

  constructor(
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private manualService: ManualContractService
  ) {}

  ionViewDidLoad() {}

  ngOnInit() {
    this.refreshLanguage();
    this.createContractForm();
  }

  createContractForm() {
    this.form = new FormGroup({
      id: new FormControl(this.selectedContract.id, {
        validators: [Validators.required, Validators.maxLength(12)]
      }),
      a010: new FormControl(this.selectedContract.a010, {
        validators: [Validators.required]
      }),
      vs99: new FormControl(this.selectedContract.vs99, {
        validators: [Validators.required, Validators.min(1)]
      }),
      vs98: new FormControl(this.selectedContract.vs98),
      vs97: new FormControl(this.selectedContract.vs97, {
        validators: [Validators.required]
      }),
      aw2: new FormControl(this.selectedContract.aw2, {
        validators: [Validators.required]
      }),
      a325: new FormControl(this.selectedContract.a325, {
        validators: [Validators.required]
      })
    });
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

  onEdit() {
    if (this.form.valid) {
      this.selectedContract = Object.assign({}, this.form.value);
      this.manualService
        .updateMC(this.selectedContract, this.selectedContract.id)
        .subscribe(() => {
          this.form.reset();
          this.modalCtrl.dismiss(this.selectedContract, 'updated');
        });
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
