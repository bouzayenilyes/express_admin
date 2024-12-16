import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100 fade-in" [class.hoverable]="hoverable">
      <div *ngIf="imageUrl" class="card-img-container">
        <img [src]="imageUrl" [alt]="title" class="card-img-top">
      </div>
      <div class="card-body">
        <h5 class="card-title" *ngIf="title">{{title}}</h5>
        <h6 class="card-subtitle mb-2 text-muted" *ngIf="subtitle">{{subtitle}}</h6>
        <ng-content></ng-content>
      </div>
      <div class="card-footer bg-transparent border-top-0" *ngIf="footerTemplate">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card {
      height: 100%;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card.hoverable:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .card-img-container {
      overflow: hidden;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }

    .card-img-top {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .hoverable .card-img-top:hover {
      transform: scale(1.05);
    }

    .card-title {
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .card-subtitle {
      margin-top: -0.375rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 768px) {
      .card-img-top {
        height: 150px;
      }
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() hoverable: boolean = true;
  @Input() footerTemplate?: boolean;
}
