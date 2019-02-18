import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountOpened = false;

  @ViewChild('elRef', {read: ElementRef}) elRef: ElementRef;
  @HostListener('window:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
        return;
    }
    const clickedInside = this.elRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.accountOpened = false;
    }
    return;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  toggleAccount() {
    this.accountOpened = !this.accountOpened;
  }
}
