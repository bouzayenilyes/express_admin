import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <h1 class="logo">ExpressTN</h1>
      <nav>
        <a routerLink="/livreur" routerLinkActive="active">Livreur</a>
        <a routerLink="/paiements" routerLinkActive="active">Paiements</a>
        <a routerLink="/statistiques" routerLinkActive="active">Statistiques</a>
        <a routerLink="/mes-colis" routerLinkActive="active">Colis</a>
      </nav>
      <div class="user-profile">
        <img src="assets/user.png" alt="User profile" />
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      height: 64px;
    }

    .header {
      background-color: #333;
      color: white;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      z-index: 1000;
    }

    .logo {
      font-size: 1.5rem;
      margin: 0;
    }

    nav {
      display: flex;
      gap: 2rem;
    }

    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }

    nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    nav a.active {
      background-color: #555;
    }

    .user-profile img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {}