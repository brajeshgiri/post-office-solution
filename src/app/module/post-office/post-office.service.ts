import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/services/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostOfficeService extends BaseService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getPostOfficeList(): Observable<PostOffice[]> {
    return this.get(environment.urls.postOfficeListUrl, "");
  }

  deleteOffice(id: string): Observable<any> {
    return this.post(environment.urls.deleteOffice, "", { id });

  }

  savePostOffice(officeData: PostOffice): Observable<any> {
    return this.post(environment.urls.postOfficeSaveUrl, "", officeData);
  }

  udpatePostOffice(officeData: PostOffice): Observable<any> {
    return this.post(environment.urls.postOfficeUpdateUrl, "", officeData);
  }
}
