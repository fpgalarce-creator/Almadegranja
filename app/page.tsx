"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Footer } from "@/components/Footer";
import { getPopularProducts, Product } from "@/lib/products";
import { getCurrentUser } from "@/lib/auth";
import { buildWhatsappCustomMessage } from "@/lib/whatsapp";

export default function HomePage() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setPopularProducts(getPopularProducts());
    setUser(getCurrentUser());
  }, []);

  return (
    <>
      <Header />
      <main className="space-y-12 md:space-y-16">
        <Hero />

        {/* Categorías principales */}
        <section id="categorias" className="container-padding">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0 text-left">Explora por categoría</h2>
            <a href="/tienda" className="button-secondary text-sm">
              Ver tienda
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Huevos", "Quesos", "Frutos secos", "Otros"].map((categoria) => (
              <div key={categoria} className="kraft-card p-6 space-y-4 flex flex-col">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                  {categoria === "Huevos" && "🥚"}
                  {categoria === "Quesos" && "🧀"}
                  {categoria === "Frutos secos" && "🌰"}
                  {categoria === "Otros" && "🍯"}
                </div>
                <div className="space-y-2 flex-1">
                  <p className="font-heading text-xl text-accent-brown">{categoria}</p>
                  <p className="text-sm text-accent-brown/70 leading-relaxed">
                    {categoria === "Huevos" && "Gallinas libres y alimentación natural."}
                    {categoria === "Quesos" && "Texturas cremosas y curados artesanales."}
                    {categoria === "Frutos secos" && "Tostados suaves, listos para tus tablas."}
                    {categoria === "Otros" && "Miel, mermeladas y sabores de temporada."}
                  </p>
                </div>
                <a
                  href={`/tienda?categoria=${encodeURIComponent(categoria)}`}
                  className="button-secondary text-center"
                >
                  Ver categoría
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Productos populares */}
        <section className="container-padding">
          <div className="flex items-center justify-between mb-6">
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
        </section>

        <HowItWorks />

        {/* Bloque de WhatsApp */}
        <section id="contacto" className="container-padding pb-12 md:pb-16">
          <div className="kraft-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
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
