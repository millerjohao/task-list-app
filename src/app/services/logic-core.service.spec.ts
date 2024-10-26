import { TestBed } from '@angular/core/testing';

import { LogicCoreService } from './logic-core.service';

describe('LogicCoreService', () => {
  let service: LogicCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
