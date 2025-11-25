"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loginUser, isAdmin } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = loginUser(email, password);
      setError(null);
      router.push(isAdmin(user) ? "/admin" : "/perfil");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Header />
      <main className="container-padding py-10 max-w-2xl mx-auto">
        <h1 className="section-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="kraft-card p-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              required
              className="input-field mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Contraseña</label>
            <input
              type="password"
              required
              className="input-field mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="button-primary w-full">
            Ingresar
          </button>
          <div className="flex justify-between text-sm text-accent-brown/80">
            <a href="/registro" className="hover:text-accent-brown">
              Crear cuenta
            </a>
            <a href="/olvide-password" className="hover:text-accent-brown">
              He olvidado mi contraseña
            </a>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
