import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [JsonPipe],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  route = inject(ActivatedRoute);
  router = inject(Router);

  userId = this.route.snapshot.paramMap.get('id');
  query = this.route.snapshot.queryParams;
  data = this.route.data;

  getBack() {
  }
}
