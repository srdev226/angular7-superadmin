import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../shared/service/http-client';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../shared/model/customers/customer';
import { CustomerDetails, EntityRequestBody, Profile } from '../shared/model/customers/customer-details';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class CustomersService {
    customersUrl = environment.serverUrl + 'secure/api/v1/admin/';

    constructor(private httpClient: AppHttpClient) { }

    getAllCustomers(pageNumber: number, pageSize: number): Observable<Customer[]> {
        const _customersUrl = this.customersUrl + 'tenants/?' +
            'pageNumber=' + pageNumber +
            '&pageSize=' + pageSize;
        return this.httpClient.get(_customersUrl);
    }

    getCustomerDetail(tenant: number): Observable<CustomerDetails> {
        const _customersUrl = this.customersUrl + 'modules/' + tenant;
        return this.httpClient.get(_customersUrl);
    }

    setCustomerEntityStatus(tenant: number, requestBody: EntityRequestBody): Observable<any> {
        const _customersUrl = this.customersUrl + 'entities/' + tenant;
        return this.httpClient.put(_customersUrl, requestBody)
            .pipe(
                catchError(err => of('error')),
            );
    }

    changePassword(password: string, tenant: number) {
        const _customersUrl = this.customersUrl + 'customers/%7Bpassword%7D';
        return this.httpClient.patch(_customersUrl, {password: password, tenant: tenant});
    }

    getProfile(tenant: number) {
        const _customersUrl = this.customersUrl + 'customers/' + tenant + '/tenant';
        return this.httpClient.get(_customersUrl);
    }

    updateProfile(profile: Profile) {
        const _customersUrl = this.customersUrl + 'customers/profile';
        return this.httpClient.put(_customersUrl, profile);
    }
}
