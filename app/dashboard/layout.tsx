import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link
            href="/dashboard"
            className="text-lg font-semibold tracking-tight"
          >
            MenuBuilder
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
