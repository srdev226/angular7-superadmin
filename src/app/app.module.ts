import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// modules
import { AppRoutingModule } from './app-routing.module';
import { ContentsModule } from './contents/contents.module';
import { MaterialModule } from './material';
// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';

// services
import { AuthGuard } from './shared/security/auth.guard';
import { AuthService } from './shared/security/auth.service';
import { AppHttpClient } from './shared/service/http-client';
import { LoadScriptsService } from './shared/service/load-scripts';
import { LoadingStatusService } from './shared/service/loading-status';
import { LoginService } from './login/login.service';
import { SigninComponent } from './login/signin/signin.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { NotificationComponent } from './shared/component/notification/notification.component';
import { NetworkErrorComponent } from './network-error/network-error.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    SigninComponent,
    ForgotPasswordComponent,
    NotificationComponent,
    NetworkErrorComponent,
    LinkExpiredComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ContentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [
    NotificationComponent
  ],
  entryComponents: [
    NotificationComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    AppHttpClient,
    LoadingStatusService,
    LoadScriptsService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
