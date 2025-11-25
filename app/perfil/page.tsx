"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCurrentUser, getUsers, saveUsers, setCurrentUser, User, logoutUser } from "@/lib/auth";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const current = getCurrentUser();
    if (!current) {
      router.push("/login");
      return;
    }
    setUser(current);
    setTelefono(current.telefono);
    setDireccion(current.direccion);
  }, [router]);

  const handleSave = () => {
    if (!user) return;
    const users = getUsers().map((u) =>
      u.id === user.id ? { ...u, telefono, direccion } : u
    );
    saveUsers(users);
    const updatedUser = { ...user, telefono, direccion };
    setCurrentUser(updatedUser);
    setUser(updatedUser);
    setMessage("Datos actualizados correctamente");
    setTimeout(() => setMessage(null), 1500);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="container-padding py-10 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="section-title mb-0 text-left">Mi perfil</h1>
          <button onClick={handleLogout} className="button-secondary">Cerrar sesión</button>
        </div>
        <div className="kraft-card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="label">Nombre</p>
              <p className="mt-1 font-semibold text-accent-brown">{user.nombre}</p>
            </div>
            <div>
              <p className="label">Email</p>
              <p className="mt-1 font-semibold text-accent-brown">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Teléfono</label>
              <input
                className="input-field mt-1"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Dirección</label>
              <input
                className="input-field mt-1"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleSave} className="button-primary">Guardar cambios</button>
          {message && <p className="text-green-700 text-sm">{message}</p>}
        </div>
        <div className="kraft-card p-6">
          <p className="font-heading text-lg text-accent-brown mb-2">Resumen</p>
          <p className="text-sm text-accent-brown/70">
            Aún no registramos pedidos, pero aquí verás tus últimas compras cuando confirmes por WhatsApp.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
