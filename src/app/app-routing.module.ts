import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { NetworkErrorComponent } from './network-error/network-error.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login',
    component: LoginComponent,
    children: [
      { path: '', component: SigninComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent},
    ]
  },
  { path: 'network-error', component: NetworkErrorComponent},
  { path: 'link-expired', component: LinkExpiredComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
