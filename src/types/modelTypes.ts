export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

export interface SessionInterface {
  email: string;
  password: string;
}

export interface MatchInterface {
  name: string;
  locale: string;
  date: string;
  value: number;
  receiver: string;
  players: string[];
  userId: any;
}
