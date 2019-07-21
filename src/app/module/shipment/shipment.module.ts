import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './shipment.component';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShipmentService } from './shipment.service';
import { CdkTableModule } from '@angular/cdk/table';
import { MaterialModule } from 'src/app/common/material-module/material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditShipmentComponent } from './add-edit-shipment/add-edit-shipment.component';

const routes: Routes = [
  {
    path: '',
    component: ShipmentComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    CdkTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ShipmentComponent,
    AddEditShipmentComponent
  ],
  providers: [ShipmentService],
  exports: [ShipmentComponent]
})
export class ShipmentModule { }
