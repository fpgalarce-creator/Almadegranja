"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Footer } from "@/components/Footer";
import { getPopularProducts, Product } from "@/lib/products";
import { getCurrentUser } from "@/lib/auth";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setProducts(getPopularProducts());
    setUser(getCurrentUser());
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="container-padding py-12 md:py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0 text-left">Productos destacados</h2>
            <a href="/tienda" className="button-secondary text-sm">
              Ver todos
            </a>
          </div>
          <ProductsGrid
            products={products}
            user={user}
            onAdded={() => setUser(getCurrentUser())}
          />
        </section>
        <WhyUs />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
