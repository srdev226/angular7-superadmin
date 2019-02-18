import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { LoadScriptsService } from '../../shared/service/load-scripts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  customers: number;
  users: number;

  constructor(private dashboardService: DashboardService,
              private loadScriptsService: LoadScriptsService) { }

  ngAfterViewInit() {
    // this.loadScriptsService.loadScripts('sidebar');
  }

  ngOnInit() {
    this.dashboardService.getData().subscribe(response => {
      this.customers = response.customers;
      this.users = response.users;
    });
  }


}
