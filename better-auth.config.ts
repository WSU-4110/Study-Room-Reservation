import { betterAuth } from "better-auth";
import { microsoft } from "better-auth/providers/microsoft";

export const auth = betterAuth({
  providers: [
    microsoft({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
});
