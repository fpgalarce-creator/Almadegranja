"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Categoria, getProducts, Product } from "@/lib/products";
import { getCurrentUser } from "@/lib/auth";

const categorias: Array<Categoria | "Todos"> = [
  "Todos",
  "Huevos",
  "Quesos",
  "Frutos secos",
  "Otros",
];

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<(typeof categorias)[number]>("Todos");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("Recomendados");
  const [user, setUser] = useState(getCurrentUser());
  const searchParams = useSearchParams();

  useEffect(() => {
    setProducts(getProducts());
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam && categorias.includes(categoriaParam as Categoria)) {
      setCategory(categoriaParam as Categoria);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "Todos") {
      list = list.filter((p) => p.categoria === category);
    }
    if (search) {
      list = list.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (order === "Precio: menor a mayor") {
      list.sort((a, b) => a.precio - b.precio);
    } else if (order === "Precio: mayor a menor") {
      list.sort((a, b) => b.precio - a.precio);
    } else {
      list.sort((a, b) => Number(b.popular) - Number(a.popular));
    }
    return list;
  }, [products, category, search, order]);

  return (
    <>
      <Header />
      <main className="container-padding py-10 space-y-8">
        <div className="paper-section botanical-corner p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Catálogo</p>
              <h1 className="font-heading text-4xl text-accent-brown leading-tight">Tienda Alma de Granja</h1>
              <p className="text-accent-brown/70 text-sm">
                Elige categoría, busca por nombre o ordena por precio.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm border transition bg-white/70 ${
                    category === cat
                      ? "bg-primary text-white border-primary"
                      : "border-kraft text-accent-brown hover:border-primary/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-2">
              <input
                placeholder="Buscar productos"
                className="input-field"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="input-field sm:w-64"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option>Recomendados</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
              </select>
            </div>
            <div className="flex items-center text-sm text-accent-brown/70">
              <span className="bg-primary/10 text-primary px-3 py-2 rounded-full border border-primary/20">
                {filtered.length} productos
              </span>
            </div>
          </div>
        </div>

        <ProductsGrid
          products={filtered}
          user={user}
          onAdded={() => setUser(getCurrentUser())}
        />
      </main>
      <Footer />
    </>
  );
}
