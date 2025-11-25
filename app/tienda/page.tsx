"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setProducts(getProducts());
    setUser(getCurrentUser());
  }, []);

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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm border ${
                  category === cat
                    ? "bg-primary text-white border-primary"
                    : "border-kraft text-accent-brown"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
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
