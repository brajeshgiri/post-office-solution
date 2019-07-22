import { Component, OnInit, Inject } from '@angular/core';
import { ShipmentTypeModel, WeightTypeModel } from "../shipment.model.js";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ShipmentSaveModel } from "../shipment-save.model.js";
import { ShipmentService } from "../shipment.service.js";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PostOfficeService } from '../../post-office/post-office.service.js';


@Component({
  selector: 'app-add-edit-shipment',
  templateUrl: './add-edit-shipment.component.html',
  styleUrls: ['./add-edit-shipment.component.css']
})
export class AddEditShipmentComponent implements OnInit {

  shipmentTypes: ShipmentTypeModel[] = [];
  weightTypes: WeightTypeModel[] = [];
  postOfficeLst: PostOffice[] = [];
  statusLst: any[] = []

  shipmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public shipmentService: ShipmentService,
    public postOfficeService: PostOfficeService,
    public dialogRef: MatDialogRef<AddEditShipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostOffice
  ) { }

  ngOnInit() {

    this.shipmentService.loadShipmentTypes().subscribe(res => {
      this.shipmentTypes = res;
    });
    this.shipmentService.loadWeightTypes().subscribe(res => {
      this.weightTypes = res;
    });
    this.shipmentService.loadStatusTypes().subscribe(res => {
      this.statusLst = res;
    });
    this.getAllPostOffice();
    this.createForm();
    if (this.data) {
      this.shipmentForm.setValue(this.data);
    }

  }

  getAllPostOffice() {
    this.postOfficeService.getPostOfficeList().subscribe(res => {
      this.postOfficeLst = res;
    })
  }


  createForm() {
    this.shipmentForm = this.fb.group({
      'type': new FormControl('', [Validators.required]),
      'origin': new FormControl('', [Validators.required]),
      'destination': new FormControl('', [Validators.required]),
      'delivered': new FormControl('', [Validators.required]),
      'weight': new FormControl('', [Validators.required]),
      'office': new FormControl('', [Validators.required]),
      'id': [null]
    });
  }

  get type() { return this.shipmentForm.get('type'); }
  get origin() { return this.shipmentForm.get('origin'); }
  get destination() { return this.shipmentForm.get('destination'); }
  get delivered() { return this.shipmentForm.get('delivered'); }
  get weight() { return this.shipmentForm.get('weight'); }
  get office() { return this.shipmentForm.get('office'); }

  onCancel(event): void {
    this.dialogRef.close(false);
  }

  onSubmit(values: ShipmentSaveModel) {
    console.log("Values", values);
    this.shipmentService.saveShipment(values).subscribe(res => {
      this.dialogRef.close(true);
    },
      err => {
        if (err.status === 200) {
          this.dialogRef.close(true);
        }
      }
    )
  }

}
