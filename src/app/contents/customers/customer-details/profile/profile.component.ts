import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CustomerDetails, Profile } from '../../../shared/model/customers/customer-details';
import { LoadScriptsService } from 'src/app/shared/service/load-scripts';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @Input() tenant: number;
  @Input() profile: Profile;
  @Input() customerDetails: CustomerDetails;
  constructor(private loadScriptsService: LoadScriptsService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadScriptsService.loadScripts('customer-details');
  }
}
