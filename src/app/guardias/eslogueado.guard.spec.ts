import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { eslogueadoGuard } from './eslogueado.guard';

describe('eslogueadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => eslogueadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
