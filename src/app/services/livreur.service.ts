import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Livreur } from '../models/livreur.model';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private livreurs = new BehaviorSubject<Livreur[]>([
    {
      id: 1,
      nom: 'Ahmed Ben Ali',
      numero: '123',
      specialites: 'Livraison express',
      description: 'Expérience de 5 ans',
      descriptionES: '5 años de experiencia'
    },
    {
      id: 2,
      nom: 'Sarah Smith',
      numero: '456',
      specialites: 'Colis fragiles',
      description: 'Spécialiste en manipulation',
      descriptionES: 'Especialista en manipulación'
    }
  ]);

  getLivreurs(): Observable<Livreur[]> {
    return this.livreurs.asObservable();
  }

  addLivreur(livreur: Omit<Livreur, 'id'>): void {
    const currentLivreurs = this.livreurs.value;
    const newId = Math.max(...currentLivreurs.map(l => l.id)) + 1;
    this.livreurs.next([...currentLivreurs, { ...livreur, id: newId }]);
  }

  updateLivreur(livreur: Livreur): void {
    const currentLivreurs = this.livreurs.value;
    const index = currentLivreurs.findIndex(l => l.id === livreur.id);
    if (index !== -1) {
      currentLivreurs[index] = livreur;
      this.livreurs.next([...currentLivreurs]);
    }
  }

  deleteLivreur(id: number): void {
    const currentLivreurs = this.livreurs.value;
    this.livreurs.next(currentLivreurs.filter(l => l.id !== id));
  }
}