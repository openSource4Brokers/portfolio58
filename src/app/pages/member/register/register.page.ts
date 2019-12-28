import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { User } from '../../../_models/user';
import { AuthService } from './../../../_services/auth.service';
import { ToastService } from './../../../_services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  user: User;
  maxDate: Date;
  maxAge: string;

  isLoading = false;

  userMessage: string;
  emailMessage: string;
  emailPattern: string;
  dateOfBirthMessage: string;
  berNumberMessage: string;
  berNumberMinMaxMessage: string;
  passwordMessage: string;
  passwordMinMessage: string;
  passwordMaxMessage: string;
  validation_messages: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private ts: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initTranslateMessages();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
    this.maxAge = this.maxDate.toISOString();
    this.maxAge = this.maxAge.slice(0, 10);
    this.createRegisterForm();
  }

  initTranslateMessages() {
    this.translate.get('REGISTER.UsernameMessage').subscribe(value => {
      this.userMessage = value;
    });
    this.translate.get('REGISTER.EmailMessage').subscribe(value => {
      this.emailMessage = value;
    });
    this.translate.get('REGISTER.EmailPattern').subscribe(value => {
      this.emailPattern = value;
    });
    this.translate.get('REGISTER.DateOfBirthMessage').subscribe(value => {
      this.dateOfBirthMessage = value;
    });
    this.translate.get('REGISTER.BerNumberMessage').subscribe(value => {
      this.berNumberMessage = value;
    });
    this.translate.get('REGISTER.BerNumberMinMaxMessage').subscribe(value => {
      this.berNumberMinMaxMessage = value;
    });
    this.translate.get('REGISTER.PasswordMessage').subscribe(value => {
      this.passwordMessage = value;
    });
    this.translate.get('REGISTER.PasswordMinMessage').subscribe(value => {
      this.passwordMinMessage = value;
    });
    this.translate.get('REGISTER.PasswordMaxMessage').subscribe(value => {
      this.passwordMaxMessage = value;
    });

    this.validation_messages = {
      username: [{ type: 'required', message: this.userMessage }],
      email: [
        { type: 'required', message: this.emailMessage },
        { type: 'pattern', message: this.emailPattern }
      ],
      dateOfBirth: [{ type: 'required', message: this.dateOfBirthMessage }],
      berNumber: [
        { type: 'required', message: this.berNumberMessage },
        {
          type: 'minlength',
          message: this.berNumberMinMaxMessage
        },
        {
          type: 'maxlength',
          message: this.berNumberMinMaxMessage
        }
      ],
      password: [
        { type: 'required', message: this.passwordMessage },
        {
          type: 'minlength',
          message: this.passwordMinMessage
        },
        {
          type: 'maxlength',
          message: this.passwordMaxMessage
        }
      ]
    };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        berNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11)
          ]
        ],
        gender: ['male'],
        knownAs: ['user220750', Validators.required],
        clientNumber: ['220750'],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ],
        city: ['Herdersem', Validators.required],
        country: ['Belgium', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(36)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.isLoading = true;
      this.authService.register(this.user).subscribe(
        () => {
          this.isLoading = false;
          this.translate.get('REGISTER.RegisterSuccess').subscribe(value => {
            this.ts.show(value, 'long');
          });
        },
        error => {
          this.isLoading = false;
          this.translate.get('REGISTER.RegisterFailed').subscribe(value => {
            this.ts.show(value, 'short');
          });
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/member']);
          });
        }
      );
    }
  }
}
