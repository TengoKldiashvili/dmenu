"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Create account
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Start building your digital menu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-[1px]">
            Name <span className="text-gray-400">(optional)</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              text-gray-900 placeholder:text-gray-400
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-[1px]">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              text-gray-900 placeholder:text-gray-400
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-[1px]">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              text-gray-900 placeholder:text-gray-400
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full bg-black text-white text-sm font-medium
            py-2.5 rounded-lg
            hover:bg-gray-800 transition
            disabled:opacity-50
          "
        >
          {loading ? "Creating…" : "Create account"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline hover:text-black"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
