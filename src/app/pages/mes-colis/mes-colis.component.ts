import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColisService } from '../../services/colis.service';
import { Colis } from '../../models/colis.model';

@Component({
  selector: 'app-mes-colis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="colis-container">
      <div class="search-section">
        <h1>Mes Colis</h1>
        <form [formGroup]="searchForm" class="search-form">
          <div class="search-inputs">
            <div class="form-group">
              <label for="depart">Départ</label>
              <input id="depart" type="text" formControlName="depart">
            </div>
            
            <div class="form-group">
              <label for="destination">Destination</label>
              <input id="destination" type="text" formControlName="destination">
            </div>
            
            <div class="form-group calendar-container">
              <label>Date</label>
              <div class="custom-calendar">
                <div class="calendar-header">
                  <div class="calendar-navigation">
                    <button type="button" (click)="prevMonth()">&lt;</button>
                    <span>{{currentMonth}} {{currentYear}}</span>
                    <button type="button" (click)="nextMonth()">&gt;</button>
                  </div>
                </div>
                <div class="weekdays">
                  <div *ngFor="let day of weekDays">{{day}}</div>
                </div>
                <div class="calendar-days">
                  <div *ngFor="let day of calendarDays" 
                       [class.empty]="!day.date"
                       [class.selected]="isSelectedDate(day.date)"
                       [class.today]="isToday(day.date)"
                       (click)="selectDate(day.date)">
                    {{day.dayNumber}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button type="submit" class="search-btn">Rechercher</button>
        </form>
      </div>

      <div class="tabs">
        <button 
          [class.active]="activeTab === 'pending'"
          (click)="setActiveTab('pending')"
        >
          À Traiter
        </button>
        <button 
          [class.active]="activeTab === 'delivered'"
          (click)="setActiveTab('delivered')"
        >
          Livrés
        </button>
      </div>

      <div class="colis-list">
        @for (colis of filteredColis; track colis.id) {
          <div class="colis-card">
            <div class="card-header" [class]="colis.status">
              <img src="assets/package-icon.png" alt="Package">
              <div class="status-badge">{{colis.status}}</div>
            </div>
            
            <div class="card-content">
              <div class="colis-info">
                <p><strong>Colis N°:</strong> {{colis.numero}}</p>
                <p><strong>Poids:</strong> {{colis.poids}} kg</p>
                <p><strong>Dimension:</strong> {{colis.dimension}}</p>
                <p><strong>Contenu:</strong> {{colis.contenu}}</p>
              </div>
              
              <div class="actions">
                @if (colis.status === 'en_attente') {
                  <button class="btn-accept" (click)="acceptColis(colis.id)">Accepter</button>
                  <button class="btn-reject" (click)="rejectColis(colis.id)">Refuser</button>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding-top: 64px;
    }

    .colis-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .search-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 20px;
    }

    .search-form {
      width: 100%;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .search-inputs {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .form-group {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      margin-bottom: 0.5rem;
      color: #666;
    }

    .form-group input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .search-btn {
      background: #004d40;
      color: white;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .tabs button {
      padding: 0.75rem 2rem;
      border: none;
      background: #f5f5f5;
      border-radius: 4px;
      cursor: pointer;
    }

    .tabs button.active {
      background: #004d40;
      color: white;
    }

    .colis-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .colis-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header.en_attente { background: #ffc107; }
    .card-header.en_cours { background: #2196f3; }
    .card-header.livre { background: #4caf50; }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      color: white;
      font-size: 0.875rem;
    }

    .card-content {
      padding: 1rem;
    }

    .colis-info p {
      margin: 0.5rem 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-accept {
      background: #4caf50;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-reject {
      background: #f44336;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    .calendar-container {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .custom-calendar {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      padding: 1.5rem;
    }

    .calendar-header {
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    .calendar-navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .calendar-navigation button {
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 1.2rem;
      color: #004d40;
      border-radius: 5px;
      transition: background-color 0.2s;
    }

    .calendar-navigation button:hover {
      background-color: #e9ecef;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      margin-bottom: 0.5rem;
      text-align: center;
      font-weight: 500;
      color: #6c757d;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
    }

    .calendar-days div {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s;
      font-size: 0.9rem;
    }

    .calendar-days div:not(.empty):hover {
      background-color: #e9ecef;
    }

    .calendar-days div.selected {
      background-color: #004d40;
      color: white;
    }

    .calendar-days div.today:not(.selected) {
      border: 2px solid #004d40;
    }

    .calendar-days div.empty {
      cursor: default;
    }
  `]
})
export class MesColisComponent implements OnInit {
  searchForm: FormGroup;
  activeTab: 'pending' | 'delivered' = 'pending';
  allColis: Colis[] = [];
  filteredColis: Colis[] = [];
  weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  currentDate = new Date();
  currentMonth = '';
  currentYear = 0;
  calendarDays: Array<{date: Date | null, dayNumber: string}> = [];
  selectedDate: Date | null = null;

  constructor(
    private fb: FormBuilder,
    private colisService: ColisService
  ) {
    this.searchForm = this.fb.group({
      depart: [''],
      destination: [''],
      date: [null]
    });
    
    this.initCalendar();
  }

  ngOnInit() {
    this.colisService.getColis().subscribe(colis => {
      this.allColis = colis;
      this.filterColis();
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.filterColis();
    });
  }

  setActiveTab(tab: 'pending' | 'delivered') {
    this.activeTab = tab;
    this.filterColis();
  }

  filterColis() {
    const { depart, destination, date } = this.searchForm.value;
    
    this.filteredColis = this.allColis.filter(colis => {
      const matchesTab = this.activeTab === 'pending' ? 
        colis.status !== 'livre' : 
        colis.status === 'livre';

      const matchesSearch = (!depart || colis.numero.includes(depart)) &&
        (!destination || colis.contenu.includes(destination)) &&
        (!date || new Date(colis.date).toDateString() === new Date(date).toDateString());

      return matchesTab && matchesSearch;
    });
  }

  acceptColis(id: number) {
    this.colisService.updateColis({
      ...this.allColis.find(c => c.id === id)!,
      status: 'en_cours'
    });
  }

  rejectColis(id: number) {
    if (confirm('Êtes-vous sûr de vouloir refuser ce colis ?')) {
      this.colisService.deleteColis(id);
    }
  }

  initCalendar() {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.months[this.currentDate.getMonth()];
    this.generateCalendarDays(this.currentDate.getMonth(), this.currentYear);
  }

  generateCalendarDays(month: number, year: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    this.calendarDays = [];

    // Add empty days for the beginning of the month
    for (let i = 0; i < startingDay; i++) {
      this.calendarDays.push({ date: null, dayNumber: '' });
    }

    // Add the days of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({ date, dayNumber: i.toString() });
    }
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  updateCalendar() {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.months[this.currentDate.getMonth()];
    this.generateCalendarDays(this.currentDate.getMonth(), this.currentYear);
  }

  selectDate(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.searchForm.patchValue({ date: date.toISOString().split('T')[0] });
      this.filterColis();
    }
  }

  isSelectedDate(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  }
}