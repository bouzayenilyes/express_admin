import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Livreur } from '../../models/livreur.model';

@Component({
  selector: 'app-livreur-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="livreurForm" (ngSubmit)="onSubmit()" class="form">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input id="nom" type="text" formControlName="nom">
      </div>

      <div class="form-group">
        <label for="numero">Numéro</label>
        <input id="numero" type="text" formControlName="numero">
      </div>

      <div class="form-group">
        <label for="specialites">Specialités</label>
        <input id="specialites" type="text" formControlName="specialites">
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" formControlName="description"></textarea>
      </div>

      <div class="form-group">
        <label for="descriptionES">Description ES</label>
        <textarea id="descriptionES" formControlName="descriptionES"></textarea>
      </div>

      <button type="submit" [disabled]="!livreurForm.valid">
        {{ livreur ? 'Modifier' : 'Ajouter' }}
      </button>
    </form>
  `,
  styles: [`
    .form {
      padding: 1rem;
      background: white;
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input, textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: #ccc;
    }
  `]
})
export class LivreurFormComponent {
  @Input() livreur?: Livreur;
  @Output() save = new EventEmitter<Omit<Livreur, 'id'>>();

  livreurForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.livreurForm = this.fb.group({
      nom: ['', Validators.required],
      numero: ['', Validators.required],
      specialites: ['', Validators.required],
      description: ['', Validators.required],
      descriptionES: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.livreur) {
      this.livreurForm.patchValue(this.livreur);
    }
  }

  onSubmit() {
    if (this.livreurForm.valid) {
      this.save.emit(this.livreurForm.value);
    }
  }
}