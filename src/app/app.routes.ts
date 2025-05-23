import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { authGuard } from './guard/auth.guard';
import { noauthGuard } from './guard/noauth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    canActivate: [noauthGuard],
    component: LoginComponent,
  },
  {
    path: 'puplic',
    title: 'puplic',
    canActivate: [noauthGuard],
    loadComponent: () =>
      import('./puplic/puplic.component').then((c) => c.PuplicComponent),
    children: [
      {
        path: 'legal',
        title: 'Legal Notice',
        canActivate: [noauthGuard],
        loadComponent: () =>
          import('./shared/components/legal/legal.component').then(
            (c) => c.LegalComponent
          ),
      },
      {
        path: 'privacy',
        title: 'Privacy Policy',
        canActivate: [noauthGuard],
        loadComponent: () =>
          import('./shared/components/privacy/privacy.component').then(
            (c) => c.PrivacyComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'summary',
        title: 'Summary',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./main/summary/summary.component').then(
            (c) => c.SummaryComponent
          ),
      },
      {
        path: 'addtask',
        title: 'Add task',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./main/addtask/addtask.component').then(
            (c) => c.AddtaskComponent
          ),
      },
      {
        path: 'board',
        title: 'Board',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./main/board/board.component').then((c) => c.BoardComponent),
      },
      {
        path: 'contacts',
        title: 'Contacts',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./main/contacts/contacts.component').then(
            (c) => c.ContactsComponent
          ),
      },
      {
        path: 'legal',
        title: 'Legal Notice',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./shared/components/legal/legal.component').then(
            (c) => c.LegalComponent
          ),
      },
      {
        path: 'privacy',
        title: 'Privacy Policy',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./shared/components/privacy/privacy.component').then(
            (c) => c.PrivacyComponent
          ),
      },
      {
        path: 'help',
        title: 'Help',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./shared/components/help/help.component').then(
            (c) => c.HelpComponent
          ),
      },
      { path: '**', redirectTo: 'summary' },
    ],
  },
  { path: '**', redirectTo: 'summary' },
];
