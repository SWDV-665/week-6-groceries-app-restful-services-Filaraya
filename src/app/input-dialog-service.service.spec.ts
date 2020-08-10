import { TestBed } from '@angular/core/testing';

import { InputDialogServiceProvider } from './input-dialog-service.service';

describe('InputDialogServiceService', () => {
  let service: InputDialogServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDialogServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
