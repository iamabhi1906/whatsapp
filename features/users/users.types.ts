export enum UserStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  userName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string;
}

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
