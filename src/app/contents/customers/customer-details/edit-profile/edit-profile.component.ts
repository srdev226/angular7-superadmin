import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CustomerDetails, Profile } from '../../../shared/model/customers/customer-details';
import { LoadScriptsService } from '../../../../shared/service/load-scripts';
import { CustomersService } from '../../customers.service';
import { NotificationComponent, NotificationData } from '../../../../shared/component/notification/notification.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup;
  errorMsg = '';
  @Input() tenant: number;
  @Input() profile: Profile;
  @Output() OnCancel = new EventEmitter();
  @Output() OnUpdate = new EventEmitter<NotificationData>();
  constructor(private loadScriptsService: LoadScriptsService,
              private customersService: CustomersService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      salutation: new FormControl(this.profile ? this.profile.salutation || '' : 'Mr.'),
      firstName: new FormControl(this.profile ? this.profile.first_name || '' : '', [Validators.required]),
      lastName: new FormControl(this.profile ? this.profile.last_name || '' : '', [Validators.required]),
      businessEmail: new FormControl(this.profile ? this.profile.email || '' : '', [Validators.email]),
      countryCode: new FormControl(
        this.profile ? parseInt((this.profile.phone.substring(0, this.profile.phone.indexOf('-'))).substring(1), 10) : 1),
      businessPhone: new FormControl(
        this.profile ? this.profile.phone.substring(this.profile.phone.indexOf('-') + 1) || '' : '', [Validators.minLength(5)]),
      portalAccess: new FormControl(this.profile ? this.profile.status || 'Active' : 'Active'),
    });
  }

  ngAfterViewInit() {
    this.loadScriptsService.loadScripts('customer-details');
  }

  onCancel() {
    this.OnCancel.emit();
  }

  onUpdate() {
    const profile: Profile = {
      salutation: this.profileForm.value.salutation,
      first_name: this.profileForm.value.firstName,
      last_name: this.profileForm.value.lastName,
      status: this.profileForm.value.portalAccess,
      tenant: this.tenant,
    };
    if (this.profileForm.value.businessEmail) {
      profile.email = this.profileForm.value.businessEmail;
    }
    if (this.profileForm.value.businessPhone) {
      profile.phone = '+' + this.profileForm.value.countryCode + '-' + this.profileForm.value.businessPhone;
    }
    this.customersService.updateProfile(profile).subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        this.errorMsg = res.error.message;
      } else {
        this.OnUpdate.emit({success: true, name: 'Profile', message: ' updated Successfully.', lifeTime: 2000});
      }
    });
  }

  openNotification(success, name, message) {
    this.dialog.closeAll();
    this.dialog.open(NotificationComponent, {
      width: '400px',
      data: {success: success, name: name, message: message, lifeTime: 2000},
    });
  }
}
