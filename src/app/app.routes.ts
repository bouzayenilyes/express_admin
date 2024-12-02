import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mes-colis',
        loadComponent: () => import('./pages/mes-colis/mes-colis.component').then(m => m.MesColisComponent)
      },
      {
        path: 'livreur',
        loadComponent: () => import('./pages/livreur/livreur.component').then(m => m.LivreurComponent)
      },
      {
        path: 'paiements',
        loadComponent: () => import('./pages/paiements/paiements.component').then(m => m.PaiementsComponent)
      },
      {
        path: 'statistiques',
        loadComponent: () => import('./pages/statistiques/statistiques.component').then(m => m.StatistiquesComponent)
      },
      {
        path: '',
        redirectTo: '/mes-colis',
        pathMatch: 'full'
      }
    ]
  }
];