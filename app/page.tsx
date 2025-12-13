import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* NAV */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-tight">
          MenuBuilder
        </h1>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="
              text-sm font-medium
              px-4 py-2 rounded-lg
              bg-black text-white
              hover:bg-gray-800 transition
            "
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="max-w-5xl mx-auto px-6 py-32 text-center">
        <h2 className="text-5xl font-semibold tracking-tight mb-6">
          Digital menus, done right
        </h2>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
          Create clean, modern digital menus for your restaurant.
          Share them instantly with a QR code — no apps, no hassle.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="
              px-8 py-3 rounded-lg
              bg-black text-white
              text-base font-medium
              hover:bg-gray-800 transition
            "
          >
            Create your menu
          </Link>

          <Link
            href="/login"
            className="
              px-8 py-3 rounded-lg
              border border-gray-300
              text-base font-medium
              hover:border-gray-900 transition
            "
          >
            Sign in
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-400 pb-8">
        © {new Date().getFullYear()} MenuBuilder
      </footer>
    </div>
  );
}
