import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ColisService } from '../../services/colis.service';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="statistics-container">
      <h1>Statistiques</h1>
      
      <div class="charts-grid">
        <div class="chart-container">
          <h2>Statut des Colis</h2>
          <canvas #statusChart></canvas>
        </div>
        
        <div class="chart-container">
          <h2>Colis par Mois</h2>
          <canvas #monthlyChart></canvas>
        </div>
        
        <div class="chart-container">
          <h2>Destinations Populaires</h2>
          <canvas #destinationsChart></canvas>
        </div>
        
        <div class="chart-container">
          <h2>Performance des Livreurs</h2>
          <canvas #deliveryChart></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .statistics-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      color: #333;
      margin-bottom: 2rem;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;
    }

    .chart-container {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      color: #555;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    canvas {
      width: 100% !important;
      height: 300px !important;
    }
  `]
})
export class StatistiquesComponent implements OnInit, AfterViewInit {
  @ViewChild('statusChart') statusChartRef!: ElementRef;
  @ViewChild('monthlyChart') monthlyChartRef!: ElementRef;
  @ViewChild('destinationsChart') destinationsChartRef!: ElementRef;
  @ViewChild('deliveryChart') deliveryChartRef!: ElementRef;

  constructor(private colisService: ColisService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initStatusChart();
    this.initMonthlyChart();
    this.initDestinationsChart();
    this.initDeliveryChart();
  }

  initStatusChart() {
    const ctx = this.statusChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['En cours', 'Livré', 'En attente', 'Annulé'],
        datasets: [{
          data: [30, 50, 15, 5],
          backgroundColor: [
            '#2196F3',
            '#4CAF50',
            '#FFC107',
            '#F44336'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  initMonthlyChart() {
    const ctx = this.monthlyChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Nombre de Colis',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#2196F3',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initDestinationsChart() {
    const ctx = this.destinationsChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Gabes'],
        datasets: [{
          label: 'Nombre de Livraisons',
          data: [120, 90, 85, 60, 45],
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initDeliveryChart() {
    const ctx = this.deliveryChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Vitesse', 'Ponctualité', 'Satisfaction', 'Volume', 'Efficacité'],
        datasets: [{
          label: 'Livreur 1',
          data: [85, 90, 88, 75, 92],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.2)'
        }, {
          label: 'Livreur 2',
          data: [78, 85, 90, 80, 85],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}