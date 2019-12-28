import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../_services/toast.service';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  userMessage: string;
  passwordMessage: string;
  passwordMinMessage: string;
  passwordMaxMessage: string;
  validation_messages: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ts: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initTranslateMessages();
    this.loginForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(36)
        ]
      })
    });
  }

  initTranslateMessages() {
    this.translate.get('LOGIN.UsernameMessage').subscribe(value => {
      this.userMessage = value;
    });
    this.translate.get('LOGIN.PasswordMessage').subscribe(value => {
      this.passwordMessage = value;
    });
    this.translate.get('LOGIN.PasswordMinMessage').subscribe(value => {
      this.passwordMinMessage = value;
    });
    this.translate.get('LOGIN.PasswordMaxMessage').subscribe(value => {
      this.passwordMaxMessage = value;
    });

    this.validation_messages = {
      username: [{ type: 'required', message: this.userMessage }],
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

  login() {
    this.isLoading = true;
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      })
      .subscribe(
        data => {
          this.translate.get('LOGIN.LoginSuccess').subscribe(value => {
            this.ts.show(value, 'short');
          });
          this.isLoading = false;
        },
        error => {
          this.translate.get('LOGIN.LoginFailed').subscribe(value => {
            this.ts.show(value, 'short');
          });
          this.isLoading = false;
        },
        () => {
          this.router.navigateByUrl('/member');
        }
      );
  }
}
