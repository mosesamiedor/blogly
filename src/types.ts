export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface VerifiedUser {
  sub: string;
  email: string;
  username: string;
  role: UserRoles;
  iat: number; //jwt initalised at
}
