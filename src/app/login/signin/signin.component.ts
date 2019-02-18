import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadScriptsService } from '../../shared/service/load-scripts';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isFormValid = true;
  errorMessage = '';
  passwordType = 'password';
  constructor(private loginService: LoginService,
              private router: Router,
              private loadScriptsService: LoadScriptsService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.errorMessage = res.error.message;
          this.isFormValid = false;
          Object.keys(this.loginForm.controls).forEach(field => {
            const control = this.loginForm.get(field);
            control.markAsUntouched({ onlySelf: true });
          });
        } else {
          this.router.navigate(['/dashboard']);
          // setTimeout(() => location.reload(), 100);
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  toggleEyeButton() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  onSignUp() {
    window.location.href = 'https://dev.getfieldtitan.com';
  }
}
