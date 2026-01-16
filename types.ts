
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'healer';
  timestamp: number;
}

export interface HealingSession {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  problemDescription: string;
  photoUrl: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  energyLevel: number; // 0-100
  createdAt: number;
}

export interface UserContext {
  name: string;
  email: string;
  isAuthenticated: boolean;
}
