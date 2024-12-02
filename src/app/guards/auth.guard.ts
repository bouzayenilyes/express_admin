import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}