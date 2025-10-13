import { AuthProvider } from "../AuthProvider";
import { AuthResult, ok, fail } from "../AuthResult";

export class MockStrategy implements AuthProvider {
  login(email: string, password: string): AuthResult {
    return email === "test@mock.com" && password === "pass"
      ? ok("3", "MockUser")
      : fail();
  }
}
