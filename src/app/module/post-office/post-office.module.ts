import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostOfficeComponent } from './post-office.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PostOfficeService } from './post-office.service';
import { AddPostOfficeComponent } from './add-post-office/add-post-office.component';
import { MaterialModule } from 'src/app/common/material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

const routes: Routes = [
  {
    path: '',
    component: PostOfficeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    CdkTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [PostOfficeService],
  declarations: [
    PostOfficeComponent,
    AddPostOfficeComponent
  ],
  exports: [
    PostOfficeComponent
  ],
  entryComponents: [AddPostOfficeComponent]
})
export class PostOfficeModule { }
