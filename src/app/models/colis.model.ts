export interface Colis {
  id: number;
  numero: string;
  poids: number;
  dimension: string;
  contenu: string;
  date: Date;
  status: 'en_attente' | 'en_cours' | 'livre';
  livreurId: number;
}