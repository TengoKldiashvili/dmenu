import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { ratelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

const handler = NextAuth(authOptions);

export { handler as GET };

export async function POST(req: Request) {

    if (req.url.includes("callback/credentials")) {
        const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";

        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return new Response(JSON.stringify({ error: "Too many login attempts" }), {
                status: 429,
                headers: { "Content-Type": "application/json" }
            });
        }
    }

    return handler(req);
}