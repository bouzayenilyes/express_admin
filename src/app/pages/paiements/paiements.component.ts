import { Component } from '@angular/core';

@Component({
  selector: 'app-paiements',
  standalone: true,
  template: `
    <div class="container">
      <h2>Paiements</h2>
      <!-- Placeholder for payments page -->
      <p>Page des paiements en construction...</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      margin: 2rem;
    }
  `]
})
export class PaiementsComponent {}