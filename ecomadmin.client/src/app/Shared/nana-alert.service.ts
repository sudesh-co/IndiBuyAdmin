import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
export interface AlertMessage {
  type: 'success' | 'error' | 'info';
  message: string;
}
@Injectable({ providedIn: 'root' })
export class NanaAlertService {
  private alertSubject = new Subject<AlertMessage>();

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  get alerts$(): Observable<AlertMessage> {
    return this.alertSubject.asObservable();
  }



  success(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['snack-success']
    });
    this.alertSubject.next({ type: 'success', message }); // 🔁 notify global

  }

  error(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      panelClass: ['snack-error']
    });
    this.alertSubject.next({ type: 'error', message });

  }

  info(message: string): void {
    this.snackBar.open(message, 'Got it', {
      duration: 5000,
      panelClass: ['snack-info']
    });
    this.alertSubject.next({ type: 'info', message });

  }

  confirm(message: string, title = 'Confirm'): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message },
      width: '350px',
      disableClose: true
    });
    return dialogRef.afterClosed();
  }
}
