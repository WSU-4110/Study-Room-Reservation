import { AuthProvider } from "../AuthProvider";
import { AuthResult, ok, fail } from "../AuthResult";

export class OAuthStrategy implements AuthProvider {
  login(email: string, password: string): AuthResult {
    if (email.endsWith("@oauth.com") && password === "1234") {
      return ok("1", "OAuthUser");
    }
    return fail();
  }
}
