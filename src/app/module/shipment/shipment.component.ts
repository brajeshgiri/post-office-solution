import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipmentService } from './shipment.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ShipmentModel, ShipmentTypeModel, WeightTypeModel } from './shipment.model';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

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
    private shipmentService: ShipmentService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.shipmentService.getShipmentList().subscribe(res => {
      console.log("response", res)
      this.dataSource.data = res;
    });

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
        data.type && !Array.isArray(data.type) && data.type.name.toLowerCase().indexOf(searchTerms.type && searchTerms.type.name || '') !== -1
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

  }

  onUpdate(shipmentModel: ShipmentModel): void {

  }

  onDelete(id: string): void {

  }

}
