import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Injectable()
export class LoadingStatusService {

  _isLoading: BehaviorSubject<boolean>;

  constructor() {
    this._isLoading = new BehaviorSubject<boolean>(false);
  }

  loading() {
    setTimeout(() => this._isLoading.next(true), 100);
  }

  loaded() {
    setTimeout(() => this._isLoading.next(false), 100);
  }

  loadingStatus(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
}
