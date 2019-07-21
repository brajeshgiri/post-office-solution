import { TestBed, inject } from '@angular/core/testing';

import { PostOfficeService } from './post-office.service';

describe('PostOfficeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostOfficeService]
    });
  });

  it('should be created', inject([PostOfficeService], (service: PostOfficeService) => {
    expect(service).toBeTruthy();
  }));
});
