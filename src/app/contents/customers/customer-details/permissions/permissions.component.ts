import { Component, OnChanges, Input, Output, EventEmitter, AfterViewInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CustomerDetails, EntityRequestBody } from '../../../shared/model/customers/customer-details';
import { CustomersService } from '../../customers.service';
import { LoadScriptsService } from '../../../../shared/service/load-scripts';
import { NotificationComponent } from '../../../../shared/component/notification/notification.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnChanges, AfterViewInit {
  entityRequestBody: EntityRequestBody;

  @Input() customerDetails: CustomerDetails;
  @Input() tenant: number;
  @Input() isEditing: boolean;
  @Output() OnChangeAllowAccess = new EventEmitter<CustomerDetails>();
  constructor(private customersService: CustomersService,
              private loadScriptsService: LoadScriptsService,
              public dialog: MatDialog) { }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    this.loadScriptsService.loadScripts('customer-details');
  }

  // This function specifies allow access status by checking other entities.
  checkDependentEntity(module_index, entity_index) {
    let retval = false;
    this.customerDetails.modules.forEach(_module => {
      _module.entities.forEach(entity => {
        if (entity.enabled && entity.dependencies) {
          const _dependency = entity.dependencies.find(dependency =>
            (dependency.id === this.customerDetails.modules[module_index].entities[entity_index].id)
          );
          if (_dependency) {
            retval = true;
            return;
          }
        }
      });
    });
    return retval;
  }

  // This function check its dependency entities when it is checked.
  toggleAllowAccess(module_index, entity_index) {
    const _customerDetails = this.customerDetails.modules;
    const checked = !this.customerDetails.modules[module_index].entities[entity_index].enabled;
    this.customerDetails.modules[module_index].entities[entity_index].enabled = checked;
    this.entityRequestBody = {entities: []};
    this.entityRequestBody.entities.push({
      enabled: checked,
      id: this.customerDetails.modules[module_index].entities[entity_index].id,
    });
    if (checked) {
      this.checkDependencyEntities(module_index, entity_index);
    }
    this.customersService.setCustomerEntityStatus(this.tenant, this.entityRequestBody).subscribe(res => {
      if (res instanceof HttpErrorResponse) {
        this.openNotification(false, this.customerDetails.organization_details.user.name, ' permissions not updated.');
      } else {
        this.openNotification(true, this.customerDetails.organization_details.user.name, ' permissions updated successfully.');
        this.OnChangeAllowAccess.emit(this.customerDetails);
      }
    });
  }

  checkDependencyEntities(module_index, entity_index) {
    if (this.customerDetails.modules[module_index].entities[entity_index].dependencies) {
      this.customerDetails.modules[module_index].entities[entity_index].dependencies.forEach(dependency => {
        for (let i = 0; i < this.customerDetails.modules.length; i ++) {
          const _entity = this.customerDetails.modules[i].entities.find(entity => (entity.id === dependency.id));
          const _index = this.customerDetails.modules[i].entities.indexOf(_entity);
          if (_index >= 0) {
            if (!this.customerDetails.modules[i].entities[_index].enabled) {
              this.customerDetails.modules[i].entities[_index].enabled = true;
              this.entityRequestBody.entities.push({
                enabled: true,
                id: this.customerDetails.modules[i].entities[_index].id,
              });
              this.checkDependencyEntities(i, _index);
            }
          }
        }
      });
    }
  }

  openNotification(success, name, message) {
    this.dialog.closeAll();
    this.dialog.open(NotificationComponent, {
      width: '400px',
      data: {success: success, name: name, message: message, lifeTime: 2000},
    });
  }
}
