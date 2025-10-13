import { AuthProvider } from "../AuthProvider";
import { AuthResult, ok, fail } from "../AuthResult";

export class SAMLStrategy implements AuthProvider {
  login(email: string, password: string): AuthResult {
    if (email.endsWith("@saml.edu") && password.length > 3) {
      return ok("2", "SAMLUser");
    }
    return fail();
  }
}
