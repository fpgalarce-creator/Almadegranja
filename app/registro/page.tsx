"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { registerUser } from "@/lib/auth";

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      registerUser({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        password: form.password,
        rol: "cliente",
      });
      setError(null);
      setSuccess("Cuenta creada con éxito. Redirigiendo...");
      setTimeout(() => router.push("/perfil"), 800);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Header />
      <main className="container-padding py-10 max-w-3xl mx-auto">
        <h1 className="section-title">Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="kraft-card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Nombre</label>
              <input
                className="input-field mt-1"
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field mt-1"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Teléfono</label>
              <input
                className="input-field mt-1"
                value={form.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Dirección</label>
              <input
                className="input-field mt-1"
                value={form.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contraseña</label>
              <input
                type="password"
                className="input-field mt-1"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Confirmar contraseña</label>
              <input
                type="password"
                className="input-field mt-1"
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-700 text-sm">{success}</p>}
          <button type="submit" className="button-primary w-full">
            Crear cuenta
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
