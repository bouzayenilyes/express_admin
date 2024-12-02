import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisService } from '../../services/colis.service';
import { Colis } from '../../models/colis.model';

@Component({
  selector: 'app-colis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Colis par Date</h2>
      
      <div class="calendar">
        <div class="calendar-header">
          <button (click)="previousMonth()">←</button>
          <span>{{currentDate | date:'MMMM yyyy'}}</span>
          <button (click)="nextMonth()">→</button>
        </div>
        
        <div class="calendar-grid">
          <div class="weekday" *ngFor="let day of weekDays">{{day}}</div>
          <div *ngFor="let day of calendarDays" 
               [class.active]="isSelectedDate(day)"
               [class.has-colis]="hasColisForDate(day)"
               (click)="selectDate(day)"
               class="day">
            {{day?.getDate()}}
          </div>
        </div>
      </div>

      <div class="colis-details" *ngIf="selectedDateColis.length > 0">
        <h3>Détail De Colis pour {{selectedDate | date:'dd/MM/yyyy'}} :</h3>
        
        <div class="colis-card" *ngFor="let colis of selectedDateColis">
          <div class="card-header">
            <img src="assets/delivery-person.png" alt="Delivery person" />
            <div class="status" [class]="colis.status">{{colis.status}}</div>
          </div>
          
          <div class="card-content">
            <div class="package-info">
              <img src="assets/package.png" alt="Package" />
              <div class="details">
                <p>Num Colis: {{colis.numero}}</p>
                <p>Poids: {{colis.poids}} kg</p>
                <p>Dimension: {{colis.dimension}}</p>
                <p>Contenu: {{colis.contenu}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      margin: 2rem;
    }

    .calendar {
      margin: 2rem 0;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
    }

    .weekday {
      text-align: center;
      font-weight: bold;
      padding: 0.5rem;
    }

    .day {
      text-align: center;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .day.active {
      background-color: #007bff;
      color: white;
    }

    .day.has-colis {
      border-color: #4CAF50;
      font-weight: bold;
    }

    .colis-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 1rem;
      overflow: hidden;
    }

    .card-header {
      background-color: #004d40;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .status.en_attente { background-color: #ffc107; }
    .status.en_cours { background-color: #007bff; }
    .status.livre { background-color: #28a745; }

    .card-content {
      padding: 1rem;
    }

    .package-info {
      display: flex;
      gap: 1rem;
    }

    .details p {
      margin: 0.25rem 0;
    }
  `]
})
export class ColisComponent implements OnInit {
  weekDays = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
  currentDate = new Date();
  selectedDate = new Date();
  calendarDays: (Date | null)[] = [];
  selectedDateColis: Colis[] = [];
  allColis: Colis[] = [];

  constructor(private colisService: ColisService) {}

  ngOnInit() {
    this.generateCalendarDays();
    this.loadColis();
  }

  loadColis() {
    this.colisService.getColis().subscribe(colis => {
      this.allColis = colis;
      this.updateSelectedDateColis();
    });
  }

  generateCalendarDays() {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    this.calendarDays = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.calendarDays.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i));
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  selectDate(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.updateSelectedDateColis();
    }
  }

  updateSelectedDateColis() {
    this.selectedDateColis = this.allColis.filter(colis => 
      colis.date.toDateString() === this.selectedDate.toDateString()
    );
  }

  isSelectedDate(date: Date | null): boolean {
    return date?.toDateString() === this.selectedDate.toDateString();
  }

  hasColisForDate(date: Date | null): boolean {
    if (!date) return false;
    return this.allColis.some(colis => 
      colis.date.toDateString() === date.toDateString()
    );
  }
}