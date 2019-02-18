import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { menus } from './menu';
import { LoadScriptsService } from '../shared/service/load-scripts';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  currentUrl: string;
  menus = menus;
  opened = false;
  constructor(router: Router,
              private loadScriptsService: LoadScriptsService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;

      }
    });
  }

  ngAfterViewInit() {
    $('.app-header .app-bars').click(function() {
      this.opened = !this.opened;
      setTimeout(() => {
        if (!this.opened) {
          $('body').addClass('app-sidebar-closed');
        } else {
          $('body').removeClass('app-sidebar-closed');
        }
      }, 100);
    });
  }

  checkIfActivated(url) {
    if (this.currentUrl === url) {
      return true;
    }
    return false;
  }
}
