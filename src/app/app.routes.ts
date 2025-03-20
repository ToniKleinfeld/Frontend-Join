import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'summary',
        title: 'Summary',
        loadComponent: () => import('./main/summary/summary.component').then(c => c.SummaryComponent),
      },
      {
        path: 'addtask',
        title: 'Add task',
        loadComponent: () => import('./main/addtask/addtask.component').then(c => c.AddtaskComponent),
      },
      {
        path: 'board',
        title: 'Board',
        loadComponent: () => import('./main/board/board.component').then(c => c.BoardComponent),
      },
      {
        path: 'contacts ',
        title: 'Contacts',
        loadComponent: () => import('./main/contacts/contacts.component').then(c => c.ContactsComponent),
      },
    ],
  },
];
