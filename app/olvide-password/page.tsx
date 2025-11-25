"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getUsers, resetPassword } from "@/lib/auth";

export default function OlvidePasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = () => {
    const userExists = getUsers().some((u) => u.email === email);
    if (userExists) {
      setError(null);
      setStep(2);
    } else {
      setError("No encontramos ese email en nuestros registros");
    }
  };

  const handleReset = () => {
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      resetPassword(email, password);
      setSuccess("Contraseña actualizada. Redirigiendo a inicio de sesión...");
      setError(null);
      setTimeout(() => router.push("/login"), 900);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Header />
      <main className="container-padding py-10 max-w-2xl mx-auto">
        <h1 className="section-title">Recuperar contraseña</h1>
        <div className="kraft-card p-6 space-y-4">
          {step === 1 && (
            <>
              <p className="text-accent-brown/80 text-sm">
                Ingresa tu email y validaremos si existe en nuestra base demo.
              </p>
              <input
                type="email"
                className="input-field"
                placeholder="tuemail@correo.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="button-primary w-full" onClick={validateEmail}>
                Continuar
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-accent-brown/80">Email: {email}</p>
              <input
                type="password"
                className="input-field"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="input-field"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="button-primary w-full" onClick={handleReset}>
                Guardar nueva contraseña
              </button>
            </>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-700 text-sm">{success}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
