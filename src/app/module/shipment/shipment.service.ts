import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/services/base.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ShipmentModel } from './shipment.model';

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

}
