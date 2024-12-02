import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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