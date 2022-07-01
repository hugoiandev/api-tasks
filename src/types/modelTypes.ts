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

export interface TaskInterface {
  name: string;
  description: string;
  finished: boolean;
  userId: any;
}
