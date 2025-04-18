// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cacheService: CacheService) {}

  canActivate(): boolean {
    console.log('AuthGuard cache check - user:', this.cacheService.getCache('user'));
    const user = this.cacheService.getCache('user');
    //console.log('AuthGuard check - user:', user);
    if (user) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
