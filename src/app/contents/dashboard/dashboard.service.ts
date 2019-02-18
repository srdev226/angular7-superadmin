import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../shared/service/http-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dashboard } from '../shared/model/dashboard/dashboard';
@Injectable()
export class DashboardService {
    dashboardUrl = environment.serverUrl + 'secure/api/v1/admin/dashboard';

    constructor(private httpClient: AppHttpClient) { }

    getData(): Observable<Dashboard> {
        return this.httpClient.get(this.dashboardUrl);
    }
}
