import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './common/components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private dialog: MatDialog) { }

  confirmation(msg: string, okHandlerCallBck: any, cancelHandlerCallBck: any): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px"
    dialogConfig.position = {
    };
    dialogConfig.data = msg
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog close", result)
      if (result) {
        okHandlerCallBck()
      } else {
        cancelHandlerCallBck()
      }
    },
      err => {
        okHandlerCallBck();
      }
    );
  }

}
