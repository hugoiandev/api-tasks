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

export interface GameInterface {
  name: string;
  locale: string;
  date: Date;
  value: number;
}
