import { AuthProvider } from "./AuthProvider";
import { OAuthStrategy } from "./strategies/OAuthStrategy";
import { SAMLStrategy } from "./strategies/SAMLStrategy";
import { MockStrategy } from "./strategies/MockStrategy";

export class AuthStrategyFactory {
  static getStrategy(schoolCode: string): AuthProvider {
    switch (schoolCode.toLowerCase()) {
      case "oauth":
        return new OAuthStrategy();
      case "saml":
        return new SAMLStrategy();
      default:
        return new MockStrategy();
    }
  }
}
