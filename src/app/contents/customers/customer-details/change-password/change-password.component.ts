import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CustomersService } from '../../customers.service';
import { NotificationComponent, NotificationData } from '../../../../shared/component/notification/notification.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  @Input() tenant: number;
  @Output() OnCancel = new EventEmitter();
  @Output() OnUpdate = new EventEmitter<NotificationData>();
  constructor(private customersService: CustomersService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onCancel() {
    this.OnCancel.emit();
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.customersService.changePassword(this.passwordForm.value.password, this.tenant).subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.openNotification(false, 'Password', ' not updated.');
        }
        this.OnUpdate.emit({success: true, name: 'Password', message: ' updated Successfully.', lifeTime: 2000});
      });
    } else {
      Object.keys(this.passwordForm.controls).forEach(field => {
        const control = this.passwordForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  confirmValidation() {
    return this.passwordForm.value.password !== this.passwordForm.value.passwordConfirm && this.passwordForm.get('passwordConfirm').dirty;
  }

  openNotification(success, name, message) {
    this.dialog.closeAll();
    this.dialog.open(NotificationComponent, {
      width: '400px',
      data: {success: success, name: name, message: message, lifeTime: 2000},
    });
  }
}
