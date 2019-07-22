import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { PostOfficeComponent } from './module/post-office/post-office.component';
import { ShipmentComponent } from './module/shipment/shipment.component';
import { PageNotFoundComponent } from './module/page-not-found/page-not-found.component';
import { PostOfficeModule } from './module/post-office/post-office.module';
import { ShipmentModule } from './module/shipment/shipment.module';
import { PageNotFoundModule } from './module/page-not-found/page-not-found.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './common/components/shared/confirmation-dialog/confirmation-dialog.component';
import { AppService } from './app.service';
import { MaterialModule } from './common/material-module/material-module.module';
import { SidenavListComponent } from './common/components/shared/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './common/components/shared/navigation/header/header.component';
import { PostOfficeService } from './module/post-office/post-office.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: 'post-office',

    loadChildren: './module/post-office/post-office.module#PostOfficeModule'
  },
  {
    path: 'shipment',

    loadChildren: './module/shipment/shipment.module#ShipmentModule'
  },
  {
    path: '',
    redirectTo: '/post-office',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    SidenavListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

    HttpClientModule,
    PageNotFoundModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )

  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
