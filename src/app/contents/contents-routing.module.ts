import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentsComponent } from './contents.component';
import { AuthGuard } from '../shared/security/auth.guard';
import { AllCustomersComponent } from './customers/all-customers/all-customers.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
const routes: Routes = [{
    path: '',
    component: ContentsComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'customer',
        children: [
          { path: 'all-customers', component: AllCustomersComponent, pathMatch: 'full' },
          { path: 'customer-details/:tenant', component: CustomerDetailsComponent }
        ]
      }
    ],
    canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
