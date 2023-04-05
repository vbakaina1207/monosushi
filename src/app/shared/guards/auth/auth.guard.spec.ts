import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should can activate', () => {
    let route!: ActivatedRouteSnapshot, state!: RouterStateSnapshot;
    guard.currentUser = {};
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(route, state);
    expect(guard.canActivate).toHaveBeenCalled();
    expect(guard).toBeTruthy();
  });
});
