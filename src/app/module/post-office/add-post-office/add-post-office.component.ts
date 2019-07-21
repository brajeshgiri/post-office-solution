import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostOfficeService } from '../post-office.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-post-office',
  templateUrl: './add-post-office.component.html',
  styleUrls: ['./add-post-office.component.css']
})
export class AddPostOfficeComponent implements OnInit {
  postOfficeForm: FormGroup;

  titleAlert: string = 'This field is required';
  constructor(
    private postOfficeService: PostOfficeService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPostOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostOffice
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.postOfficeForm.setValue(this.data);
    }
  }

  createForm() {
    this.postOfficeForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'PLZ': new FormControl('', [Validators.required]),
      'id': [null]
    });
  }

  get name() { return this.postOfficeForm.get('name'); }

  get PLZ() { return this.postOfficeForm.get('PLZ'); }

  onSubmit(value: PostOffice): void {
    if (this.data) {
      this.postOfficeService.udpatePostOffice(value).subscribe(result => {
        console.log("update successfully");
        this.dialogRef.close(true);
      }, err => {
        this.handleError(err);
      })
    } else {
      this.postOfficeService.savePostOffice(value).subscribe(result => {
        console.log("add successfully");
        this.dialogRef.close(true);
      }, err => {
        this.handleError(err)

      })
    }
  }

  handleError(err: any) {
    if (err.status === 200) {
      this.dialogRef.close(true);
    }
    console.log("error in add post office", err);
  }

  onCancel(event: any): void {
    event.sop
    this.dialogRef.close(false);
  }

}
