import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../auth';

@Component({
  selector: 'app-private',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './private.html',
  styleUrl: './private.css',
})
export class Private {
  private router = inject(Router);
  private auth = inject(Auth);

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
