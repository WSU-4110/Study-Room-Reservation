import { NextResponse } from "next/server";
import { AuthGateway } from "@/lib/auth/AuthGateway";

export async function POST(req: Request) {
  const { schoolCode, email, password } = await req.json();

  const gateway = new AuthGateway();
  const result = gateway.login(schoolCode, email, password);

  return result.isAuthenticated
    ? NextResponse.json(result, { status: 200 })
    : NextResponse.json(result, { status: 401 });
}
