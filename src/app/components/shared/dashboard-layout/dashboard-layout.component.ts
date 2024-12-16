import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="dashboard-header mb-4">
        <div class="row align-items-center">
          <div class="col">
            <h1 class="dashboard-title">{{title}}</h1>
            <p class="dashboard-subtitle text-muted mb-0" *ngIf="subtitle">{{subtitle}}</p>
          </div>
          <div class="col-auto">
            <ng-content select="[actions]"></ng-content>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="dashboard-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .dashboard-container {
      padding: 1.5rem;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }

    .dashboard-title {
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-color);
    }

    .dashboard-subtitle {
      font-size: 1rem;
      margin-top: 0.25rem;
    }

    .dashboard-content {
      margin-top: 1.5rem;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .dashboard-title {
        font-size: 1.5rem;
      }

      .dashboard-subtitle {
        font-size: 0.875rem;
      }

      .dashboard-content {
        margin-top: 1rem;
      }
    }
  `]
})
export class DashboardLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}
