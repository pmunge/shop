import { User } from './User';

export interface AuthResponseTs {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
}
