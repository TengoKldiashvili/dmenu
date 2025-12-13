import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4">
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          ← Back to home
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
