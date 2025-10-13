import { AuthResult } from "./AuthResult";

export interface AuthProvider {
  login(email: string, password: string): AuthResult;
}
