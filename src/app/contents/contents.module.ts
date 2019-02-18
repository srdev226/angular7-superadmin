import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { AllCustomersComponent } from './customers/all-customers/all-customers.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomersService } from './customers/customers.service';
import { ProfileComponent } from './customers/customer-details/profile/profile.component';
import { ChangePasswordComponent } from './customers/customer-details/change-password/change-password.component';
import { PermissionsComponent } from './customers/customer-details/permissions/permissions.component';
import { EditProfileComponent } from './customers/customer-details/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    ContentsComponent,
    DashboardComponent,
    AllCustomersComponent,
    CustomerDetailsComponent,
    ProfileComponent,
    ChangePasswordComponent,
    PermissionsComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    ContentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DashboardService,
    CustomersService,
  ],
  bootstrap: [ContentsComponent]
})
export class ContentsModule { }
