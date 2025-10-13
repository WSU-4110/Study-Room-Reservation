export type AuthResult = {
  isAuthenticated: boolean;
  userId?: string;
  displayName?: string;
  errorMessage?: string;
};

export const ok = (userId: string, name: string): AuthResult => ({
  isAuthenticated: true,
  userId,
  displayName: name,
});

export const fail = (msg = "Invalid credentials"): AuthResult => ({
  isAuthenticated: false,
  errorMessage: msg,
});
