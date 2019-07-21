import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostOfficeComponent } from './add-post-office.component';

describe('AddPostOfficeComponent', () => {
  let component: AddPostOfficeComponent;
  let fixture: ComponentFixture<AddPostOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
