"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Footer } from "@/components/Footer";
import { Categoria, getProducts, Product, PRODUCTS_UPDATED_EVENT } from "@/lib/products";
import { getCurrentUser } from "@/lib/auth";
import { buildWhatsappCustomMessage } from "@/lib/whatsapp";

type CategoryHighlight = {
  name: Categoria;
  icon: string;
  description: string;
  count: number;
};

const baseCategories: Record<Categoria, Omit<CategoryHighlight, "count">> = {
  Huevos: {
    name: "Huevos",
    description: "Gallinas libres, alimentación natural y sabor auténtico.",
    icon: "🥚",
  },
  Quesos: {
    name: "Quesos",
    description: "Texturas cremosas y curados artesanales para tus tablas.",
    icon: "🧀",
  },
  "Frutos secos": {
    name: "Frutos secos",
    description: "Tostados suaves para snacks, repostería y picoteos.",
    icon: "🌰",
  },
  Otros: {
    name: "Otros",
    description: "Mieles, mermeladas y preparaciones de temporada.",
    icon: "🍯",
  },
};

export default function HomePage() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [user, setUser] = useState(getCurrentUser());
  const [categories, setCategories] = useState<CategoryHighlight[]>([]);

  const refreshCatalog = useCallback(() => {
    const allProducts = getProducts();
    setPopularProducts(allProducts.filter((product) => product.popular));
    const counts: Record<Categoria, number> = {
      Huevos: 0,
      Quesos: 0,
      "Frutos secos": 0,
      Otros: 0,
    };
    allProducts.forEach((product) => {
      counts[product.categoria] += 1;
    });
    setCategories(
      (Object.keys(baseCategories) as Categoria[]).map((categoria) => ({
        ...baseCategories[categoria],
        count: counts[categoria],
      }))
    );
  }, []);

  useEffect(() => {
    refreshCatalog();
    setUser(getCurrentUser());
    const handleProductsUpdated = () => refreshCatalog();
    const handleStorage = () => refreshCatalog();

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleProductsUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleProductsUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshCatalog]);

  return (
    <>
      <Header />
      <main className="space-y-12 md:space-y-16">
        <Hero categories={categories} />

        {/* Productos populares */}
        <section className="container-padding">
          <div className="paper-section p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="section-title mb-0 text-left">Productos populares</h2>
              <a href="/tienda" className="button-secondary text-sm">
                Ver todos
              </a>
            </div>
            <ProductsGrid
              products={popularProducts}
              user={user}
              onAdded={() => setUser(getCurrentUser())}
            />
          </div>
        </section>

        <HowItWorks />

        {/* Bloque de WhatsApp */}
        <section id="contacto" className="container-padding pb-12 md:pb-16">
          <div className="kraft-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 botanical-corner">
            <div className="flex-1 space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Atención cercana</p>
              <h3 className="font-heading text-3xl text-accent-brown leading-tight">
                ¿Quieres armar tu pedido por WhatsApp?
              </h3>
              <p className="text-accent-brown/70 text-sm md:text-base leading-relaxed">
                Escríbenos y coordinamos tu pedido con los mismos productos y precios del catálogo.
              </p>
            </div>
            <button
              className="button-primary w-full md:w-auto"
              onClick={() => {
                const whatsappUrl = buildWhatsappCustomMessage(
                  "Hola, quiero armar mi pedido de Alma de Granja"
                );
                window.open(whatsappUrl, "_blank");
              }}
            >
              Escribir por WhatsApp
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
