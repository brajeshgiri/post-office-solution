import * as shipmentTypeData from "../../../json/shipmentTypes.json"
import * as weightTypeData from "../../../json/weightTypes.json"

import { Component, OnInit } from '@angular/core';
import { ShipmentTypeModel, WeightTypeModel } from "../shipment.model.js";

@Component({
  selector: 'app-add-edit-shipment',
  templateUrl: './add-edit-shipment.component.html',
  styleUrls: ['./add-edit-shipment.component.css']
})
export class AddEditShipmentComponent implements OnInit {

  shipmentTypes: ShipmentTypeModel[] = [];
  weightTypes: WeightTypeModel[] = [];

  constructor() { }

  ngOnInit() {

    this.shipmentTypes = shipmentTypeData as any;
    this.weightTypes = weightTypeData as any;

  }

}
