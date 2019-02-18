import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface NotificationData {
  success: boolean;
  name: string;
  message: string;
  lifeTime: number;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationData) {
      setTimeout(() => this.dialogRef.close(), data.lifeTime ? data.lifeTime : 2000);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
