import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  
}
