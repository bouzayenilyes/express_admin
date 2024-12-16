import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="main-content">
        <div class="container-fluid py-4">
          <router-outlet></router-outlet>
        </div>
      </main>

      <footer class="footer">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-6">
              <p class="mb-0"> 2024 ExpressTN. All rights reserved.</p>
            </div>
            <div class="col-md-6 text-md-end">
              <a href="#" class="text-muted me-3">Privacy Policy</a>
              <a href="#" class="text-muted">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      padding-top: 64px; /* Height of the header */
      background-color: var(--background-color);
    }

    .footer {
      background-color: white;
      padding: 1rem 0;
      box-shadow: 0 -1px 3px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .main-content {
        padding-top: 56px; /* Smaller header height for mobile */
      }

      .footer {
        padding: 0.5rem 0;
        font-size: 0.875rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'ExpressTN';
}