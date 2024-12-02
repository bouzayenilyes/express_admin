import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreurService } from '../../services/livreur.service';
import { Livreur } from '../../models/livreur.model';
import { LivreurFormComponent } from '../../components/livreur-form/livreur-form.component';

@Component({
  selector: 'app-livreur',
  standalone: true,
  imports: [CommonModule, LivreurFormComponent],
  template: `
    <div class="container">
      <div class="add-button">
        <button (click)="showForm = !showForm">
          {{ showForm ? '- Fermer' : '+ Ajouter' }}
        </button>
      </div>

      <app-livreur-form
        *ngIf="showForm"
        [livreur]="selectedLivreur"
        (save)="onSaveLivreur($event)"
        class="form-container"
      ></app-livreur-form>
      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Numéro</th>
            <th>Specialités</th>
            <th>Description</th>
            <th>Description ES</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let livreur of livreurs">
            <td>{{livreur.nom}}</td>
            <td>{{livreur.numero}}</td>
            <td>{{livreur.specialites}}</td>
            <td>{{livreur.description}}</td>
            <td>{{livreur.descriptionES}}</td>
            <td>
              <button class="edit" (click)="editLivreur(livreur)">✏️</button>
              <button class="delete" (click)="deleteLivreur(livreur.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      margin: 2rem;
    }

    .form-container {
      margin-bottom: 2rem;
    }

    .add-button {
      margin-bottom: 1rem;
    }

    .add-button button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f5f5f5;
    }

    .edit, .delete {
      border: none;
      background: none;
      cursor: pointer;
      margin: 0 0.25rem;
    }
  `]
})
export class LivreurComponent implements OnInit {
  livreurs: Livreur[] = [];
  showForm = false;
  selectedLivreur?: Livreur;

  constructor(private livreurService: LivreurService) {}

  ngOnInit() {
    this.livreurService.getLivreurs().subscribe(
      livreurs => this.livreurs = livreurs
    );
  }

  onSaveLivreur(livreur: Omit<Livreur, 'id'>) {
    if (this.selectedLivreur) {
      this.livreurService.updateLivreur({
        ...livreur,
        id: this.selectedLivreur.id
      });
    } else {
      this.livreurService.addLivreur(livreur);
    }
    this.showForm = false;
    this.selectedLivreur = undefined;
  }

  editLivreur(livreur: Livreur) {
    this.selectedLivreur = livreur;
    this.showForm = true;
  }

  deleteLivreur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      this.livreurService.deleteLivreur(id);
    }
  }
}