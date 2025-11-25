"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCart } from "@/lib/cart";
import { getCurrentUser, logoutUser, User } from "@/lib/auth";
import { CartDrawer } from "./CartDrawer";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setCartCount(getCart(current).reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  const isAdmin = useMemo(() => user?.rol === "admin", [user]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-30 bg-body/90 backdrop-blur border-b border-kraft/60">
      <div className="flex items-center justify-between container-padding py-4">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-accent-brown"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-heading text-xl text-accent-brown">Alma de Granja</span>
            <span className="text-xs text-accent-brown/70">Del campo a tu mesa</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-accent-brown/80">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent-brown">
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/perfil" className="hover:text-accent-brown">
                Mi cuenta
              </Link>
              {isAdmin && (
                <Link href="/admin" className="hover:text-accent-brown">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-accent-brown">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent-brown">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="hover:text-accent-brown">
                Registrarse
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tienda"
            className="hidden sm:inline-flex button-secondary text-xs px-4 py-2"
          >
            Ver tienda
          </Link>
          <button
            className="relative h-11 w-11 rounded-full bg-white shadow-card flex items-center justify-center border border-kraft"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="lg:hidden bg-body border-t border-kraft/60 px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-accent-brown">
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/perfil" className="block py-2 text-accent-brown">
                Mi cuenta
              </Link>
              {isAdmin && (
                <Link href="/admin" className="block py-2 text-accent-brown">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="block py-2 text-left text-accent-brown">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2 text-accent-brown">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="block py-2 text-accent-brown">
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        user={user}
        onCartChange={(items) =>
          setCartCount(items.reduce((acc, item) => acc + item.quantity, 0))
        }
      />
    </header>
  );
};
