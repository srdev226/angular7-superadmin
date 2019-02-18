import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard/dashboard.service';
import { CustomersService } from '../customers.service';
import { Customer } from '../../shared/model/customers/customer';
import { LoadingStatusService } from '../../../shared/service/loading-status';
import { LoadScriptsService } from '../../../shared/service/load-scripts';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit, AfterViewInit {
  pageNumber = 0;
  pageSize = 18;
  customersCount: number;
  allCustomers: Customer[] = [];
  reached = false;
  isLoading = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.isLoading === false) {
        this.getNextPage(1);
      }
    }
  }

  constructor(private router: Router,
              private dashboardService: DashboardService,
              private customersService: CustomersService,
              private loadingStatus: LoadingStatusService,
              private loadScriptsService: LoadScriptsService
              ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadingStatus.loading();
    this.isLoading = true;
    this.dashboardService.getData().subscribe(dashbaord => {
      this.customersCount = dashbaord.customers;
      this.getNextPage(2);
    });
  }

  ngAfterViewInit() {
    // this.loadScriptsService.loadScripts('sidebar');
  }

  getNextPage(multi = 1) {
    if (!this.reached) {
      this.loading();
      this.customersService.getAllCustomers(this.pageNumber, this.pageSize * multi).subscribe(customers => {
        this.allCustomers = this.allCustomers.concat(customers);
        this.pageNumber += multi;
        if (this.pageNumber * this.pageSize >= this.customersCount) {
          this.reached = true;
        }
        this.loaded();
      });
    }
  }

  loading() {
    this.loadingStatus.loading();
    this.isLoading = true;
  }

  loaded() {
    this.loadingStatus.loaded();
    this.isLoading = false;
  }

  onSelectCustomer(tenant) {
    this.router.navigate(['/customer/customer-details/', tenant]);
  }
}
