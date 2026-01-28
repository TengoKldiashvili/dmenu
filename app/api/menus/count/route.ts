import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const count = await db.menu.count({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ count });
    
  } catch (error) {
    console.error("[MENU_COUNT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}