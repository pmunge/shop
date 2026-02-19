import { Role }  from './roles.enum'

export interface RegisterRequest {
  fisrtName: string;
  secondName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


export interface AuthResponse {
  message: string;
  data: {
    user: RegisterRequest;
    token: string;
    role: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RegisterResponse{
  success: boolean;
  message: string;
  data: string;
}

