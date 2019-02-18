import { Component } from '@angular/core';
import { AuthService } from './shared/security/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingStatusService } from './shared/service/loading-status';
import { LoadScriptsService } from './shared/service/load-scripts';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  _loadingStatus: boolean;
  hideHeaderAndSidebarPages = [
    '/login',
    '/network-error',
    '/link-expired',
  ];
  constructor(private authService: AuthService,
              private router: Router,
              private loadingStatus: LoadingStatusService,
              private loadScriptsService: LoadScriptsService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    this.loadingStatus.loadingStatus().subscribe(status => {
      debounceTime(2000),
      distinctUntilChanged();
      this._loadingStatus = status;
    });
  }

  // isLoggedIn() {
  //   if (!this.currentUrl) {
  //     return false;
  //   }
  //   if (this.currentUrl.indexOf('/login') >= 0) {
  //     return false;
  //   }
  //   return this.authService.isAuthenticated();
  // }

  hideHeaderAndSidebar() {
    let retval = false;
    if (!this.currentUrl) {
      return true;
    }
    this.hideHeaderAndSidebarPages.forEach(pageTitle => {
      if (this.currentUrl.indexOf(pageTitle) >= 0) {
        retval = true;
        return;
      }
    });
    if (retval) {
      return retval;
    }
    return !this.authService.isAuthenticated();
  }
}
