export interface User {
  id: number;
  email: string;
  name: string;
  role: 'client' | 'livreur' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}