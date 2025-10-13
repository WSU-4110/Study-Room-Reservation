import { AuthStrategyFactory } from "./AuthStrategyFactory";
import { AuthResult } from "./AuthResult";

export class AuthGateway {
  login(schoolCode: string, email: string, password: string): AuthResult {
    const strategy = AuthStrategyFactory.getStrategy(schoolCode);
    return strategy.login(email, password);
  }
}
