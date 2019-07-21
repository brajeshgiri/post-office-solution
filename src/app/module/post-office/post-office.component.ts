import { Component, OnInit, ViewChild } from '@angular/core';
import { PostOfficeService } from './post-office.service';
import { AppService } from 'src/app/app.service';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AddPostOfficeComponent } from './add-post-office/add-post-office.component';

@Component({
  selector: 'app-post-office',
  templateUrl: './post-office.component.html',
  styleUrls: ['./post-office.component.css']
})
export class PostOfficeComponent implements OnInit {
  @ViewChild(MatPaginator, { read: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: false }) sort: MatSort;

  dataSource = new MatTableDataSource<PostOffice>([]);
  displayedColumns = ['name', 'PLZ', 'actions'];
  constructor(private postOfficeService: PostOfficeService,
    private appService: AppService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllPostOffice();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPostOffice() {
    this.postOfficeService.getPostOfficeList().subscribe(res => {
      this.dataSource.data = res;
    })
  }

  onDeleteOffice(id: string): void {
    this.appService.confirmation("Are you sure you want to delete post office?",
      () => {
        this.postOfficeService.deleteOffice(id).subscribe(res => {
          this.getAllPostOffice();
        }, err => {

          if (err.status === 200) {
            console.log("error", err);
            this.getAllPostOffice();
          }
        });
      },
      () => {
      }
    )
  }

  onAddOffice(): void {
    const config = new MatDialogConfig();
    config.maxWidth = "500px";
    config.panelClass = "add-office-popup"
    config.position = {}
    this.dialog.open(AddPostOfficeComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.getAllPostOffice();
      }
    })
  }
  onUpdate(office: PostOffice): void {
    const config = new MatDialogConfig();
    config.maxWidth = "500px";
    config.panelClass = "add-office-popup"
    config.position = {}
    config.data = office;
    this.dialog.open(AddPostOfficeComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.getAllPostOffice();
      }
    })
  }


}
