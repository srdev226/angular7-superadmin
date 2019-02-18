import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CustomerDetails, Profile } from '../../shared/model/customers/customer-details';
import { CustomersService } from '../customers.service';
import { LoadingStatusService } from '../../../shared/service/loading-status';
import { LoadScriptsService } from '../../../shared/service/load-scripts';
import { NotificationComponent } from '../../../shared/component/notification/notification.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, AfterViewInit {
  tenant: number;
  customerDetails: CustomerDetails;
  isEditing = false;
  isEditingProfile = false;
  isLoading = false;
  tabs = ['Profile', 'Change Password', 'Permissions'];
  currentTab = 'Profile';
  profile: Profile;
  actionOpened = false;
  @ViewChild('elRef', {read: ElementRef}) elRef: ElementRef;
  @HostListener('window:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
        return;
    }
    const clickedInside = this.elRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.actionOpened = false;
    }
    return;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customersService: CustomersService,
              private loadingStatus: LoadingStatusService,
              private loadScriptsService: LoadScriptsService,
              public dialog: MatDialog) {
                router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    //
                  }
                });
              }

  ngOnInit() {
    this.getCustomerDetails();
  }

  ngAfterViewInit() {

  }

  getCustomerDetails() {
    this.loading();
    this.loadingStatus.loading();
    this.tenant = this.route.snapshot.params['tenant'];
    forkJoin(
      this.customersService.getCustomerDetail(this.tenant),
      this.customersService.getProfile(this.tenant)
    ).pipe(
      map(([customerDetails, profile]) => {
        return { customerDetails, profile };
      })
    ).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.customerDetails = res.customerDetails;
        this.profile = res.profile;
      }
      this.loaded();
    });
  }

  loading() {
    // this.loadingStatus.loading();
    this.isLoading = true;
  }

  loaded() {
    // this.loadingStatus.loaded();
    this.isLoading = false;
  }

  onChangeAllowAccess(customerDetails) {
    this.customerDetails = customerDetails;
  }

  onClickTabTitle(title) {
    if (title !== this.currentTab) {
      this.currentTab = title;
      this.isEditing = false;
      this.isEditingProfile = false;
    }
  }

  onClickEdit() {
    this.isEditing = true;
    if (this.currentTab === 'Profile') {
      this.isEditingProfile = true;
    }
  }

  onClose(e = null) {
    this.isEditingProfile = this.isEditing = false;
    this.currentTab = 'Profile';
  }

  onUpdate(e) {
    if (e) {
      this.openNotification(e.success, e.name, e.message);
    }
    this.getCustomerDetails();
    this.onClose();
  }

  openNotification(success, name, message) {
    this.dialog.closeAll();
    this.dialog.open(NotificationComponent, {
      width: '400px',
      data: {success: success, name: name, message: message, lifeTime: 2000},
    });
  }

  toggleAction(e) {
    this.actionOpened = !this.actionOpened;
  }
}
