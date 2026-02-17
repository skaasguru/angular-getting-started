import { Routes } from '@angular/router';
import { Public } from './layout/public/public';
import { Private } from './layout/private/private';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: Public,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },
      { path: 'register', loadComponent:  () => import('./components/register/register').then(m => m.Register) },
    ],
  },
  {
    path: '',
    component: Private,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard) },
      {
        path: 'template-form',
        loadComponent: () =>
          import('./components/template-driven-form/template-driven-form').then(m => m.TemplateDrivenForm),
      },
      {
        path: 'reactive-form',
        loadComponent: () => import('./components/reactive-form/reactive-form').then(m => m.ReactiveForm),
      },
      {
        path: 'rxjs-demo',
        loadComponent: () => import('./components/rxjs-demo/rxjs-demo').then(m => m.RxjsDemo),
      },
      {
        path: 'user/:id',
        loadComponent: () => import('./components/user/user').then(m => m.User),
        data: {
          key: 'value'
        },
        resolve: {
          userInfo: () => Promise.resolve({id: 1, name: 'github'})
        }
      }
    ]
  },
  { path: '**', component: PageNotFound }
];
