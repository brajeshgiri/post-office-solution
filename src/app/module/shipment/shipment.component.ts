import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipmentService } from './shipment.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ShipmentModel, ShipmentTypeModel, WeightTypeModel } from './shipment.model';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { AddEditShipmentComponent } from './add-edit-shipment/add-edit-shipment.component';
import { ShipmentSaveModel } from './shipment-save.model';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  @ViewChild(MatPaginator, { read: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: false }) sort: MatSort;


  typeFilter = new FormControl('');
  originFilter = new FormControl('');
  deliveredFilter = new FormControl('');
  destinationFilter = new FormControl('');
  weightFilter = new FormControl('');
  officeFilter = new FormControl('');


  dataSource = new MatTableDataSource<ShipmentModel>([]);
  displayedColumns = ["type", "origin", "destination", "delivered", "weight", "office", "actions"];

  filterValues = {
    type: null,
    origin: null,
    destination: null,
    delivered: null,
    weight: null,
    office: null
  };
  constructor(
    private shipmentService: ShipmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllShipment();

    this.applyColumnsFilter();
    // this.dataSource.filterPredicate = (data, filter) => {
    //   let dataStr = data.origin + data.type.name + data.weight.desc;
    //   if (dataStr) {
    //     dataStr = dataStr.toLowerCase();
    //   }
    //   return dataStr.indexOf(filter) != -1;
    // }


    this.dataSource.filterPredicate = this.createFilter();

  }

  getAllShipment(): void {

    this.shipmentService.getShipmentList().subscribe(res => {
      console.log("response", res)
      this.dataSource.data = res;
    });
  }

  applyColumnsFilter() {

    this.typeFilter.valueChanges
      .subscribe(
        name => {
          if (name) {
            this.filterValues.type = { name };
          } else {
            this.filterValues.type = null;
          }
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );

    this.originFilter.valueChanges
      .subscribe(
        origin => {
          this.filterValues.origin = origin;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.destinationFilter.valueChanges
      .subscribe(
        destination => {
          this.filterValues.destination = destination;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.deliveredFilter.valueChanges
      .subscribe(
        delivered => {
          this.filterValues.delivered = delivered;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.weightFilter.valueChanges
      .subscribe(
        desc => {
          this.filterValues.weight = { desc };
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.officeFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.office = { name };
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log("search ter", searchTerms);
      return (
        data.type && data.type.length > 0 && data.type[0].name.toLowerCase().indexOf(searchTerms.type && searchTerms.type.name || '') !== -1
        || (isNullOrUndefined(data.type) && isNullOrUndefined(searchTerms.type))
      )
        && (
          data.weight && data.weight.desc.toLowerCase().indexOf(searchTerms.weight && searchTerms.weight.desc || '') !== -1
          ||
          (isNullOrUndefined(data.weight) && isNullOrUndefined(searchTerms.weight))
        )
        &&
        (
          data.office && data.office.name.toLowerCase().indexOf(searchTerms.office && searchTerms.office.name || '') !== -1
          ||
          (
            isNullOrUndefined(data.office) && isNullOrUndefined(searchTerms.office)
          )
        )
        &&

        (data.origin === searchTerms.origin || isNullOrUndefined(searchTerms.origin)) &&
        (data.destination === searchTerms.destination || isNullOrUndefined(searchTerms.destination)) &&
        (data.delivered === searchTerms.delivered || isNullOrUndefined(searchTerms.delivered));


    }
    return filterFunction;
  }

  onAdd(): void {
    const config = new MatDialogConfig();
    config.maxWidth = "500px";
    config.panelClass = "add-office-popup"
    config.position = {}
    this.dialog.open(AddEditShipmentComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.getAllShipment();
      }
    });

  }

  onUpdate(shipmentModel: ShipmentModel): void {
    const config = new MatDialogConfig();
    const data = Object.assign({}, shipmentModel,
      {
        office: shipmentModel.office.id,
        weight: shipmentModel.weight.id,
        type: 0
      });
    if (Array.isArray(shipmentModel.type) && shipmentModel.type.length) {
      data.type = shipmentModel.type[0].id;
    } else if (shipmentModel.type) {
      data.type = shipmentModel.type.id as any;
    }
    // data.type = 
    config.maxWidth = "500px";
    config.data = data;
    config.panelClass = "add-office-popup"
    config.position = {}
    this.dialog.open(AddEditShipmentComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.getAllShipment();
      }
    });

  }

  onDelete(id: string): void {
    this.shipmentService.deleteShipment(id).subscribe(res => {
      this.getAllShipment();
    },
      err => {
        this.handleError(err);
      }
    )
  }

  handleError(err) {
    if (err.status === 200) {
      this.getAllShipment();
    }
  }

}
