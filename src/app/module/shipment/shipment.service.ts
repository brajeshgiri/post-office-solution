import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/services/base.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ShipmentModel, ShipmentTypeModel } from './shipment.model';
import { ShipmentSaveModel } from './shipment-save.model';
const API_JSON_URL = environment.jsonBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class ShipmentService extends BaseService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getShipmentList(): Observable<ShipmentModel[]> {
    return this.get(environment.urls.getShipmentListUrl, "");
  }

  deleteShipment(id: string): Observable<any> {
    return this.post(environment.urls.deleteShipmentUrl, "", { id });
  }

  updateShipment(formValue: ShipmentSaveModel): Observable<any> {
    return this.post(environment.urls.udpateShipmentUrl, "", formValue);
  }

  saveShipment(formValue: ShipmentSaveModel): Observable<any> {
    return this.post(environment.urls.saveShipmentUrl, "", formValue);
  }

  // getPostOfficeList(): Observable<PostOffice[]> {
  //   return this.get(environment.urls.postOfficeListUrl, "");
  // }

  loadShipmentTypes(): Observable<any> {
    return this._http.get(API_JSON_URL + environment.urls.shipmentTypesJsonUrl);
  }

  loadWeightTypes(): Observable<any> {
    return this._http.get(API_JSON_URL + environment.urls.weightTypesJsonUrl);
  }


  loadStatusTypes(): Observable<any> {
    return this._http.get(API_JSON_URL + environment.urls.statusTypesJsonUrl);
  }

}
