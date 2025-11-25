"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductForm } from "@/components/Admin/ProductForm";
import { ProductTable } from "@/components/Admin/ProductTable";
import { deleteProduct, getProducts, Product, saveProducts, upsertProduct } from "@/lib/products";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
      router.push("/login");
      return;
    }
    setProducts(getProducts());
  }, [router]);

  const resumen = useMemo(() => {
    const sinStock = products.filter((p) => p.stock === 0).length;
    const populares = products.filter((p) => p.popular).length;
    return {
      total: products.length,
      sinStock,
      populares,
    };
  }, [products]);

  const handleSubmit = (product: Product) => {
    const updated = upsertProduct(product);
    setProducts(updated);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    const updated = deleteProduct(id);
    setProducts(updated);
  };

  const togglePopular = (id: string, value: boolean) => {
    const updated = products.map((p) => (p.id === id ? { ...p, popular: value } : p));
    setProducts(updated);
    saveProducts(updated);
  };

  return (
    <>
      <Header />
      <main className="container-padding py-10 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="section-title mb-0 text-left">Panel administrador</h1>
          <p className="text-sm text-accent-brown/70">Gestiona productos y destacados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="kraft-card p-4">
            <p className="text-sm text-accent-brown/70">Productos totales</p>
            <p className="text-3xl font-heading text-accent-brown">{resumen.total}</p>
          </div>
          <div className="kraft-card p-4">
            <p className="text-sm text-accent-brown/70">Sin stock</p>
            <p className="text-3xl font-heading text-accent-brown">{resumen.sinStock}</p>
          </div>
          <div className="kraft-card p-4">
            <p className="text-sm text-accent-brown/70">Populares</p>
            <p className="text-3xl font-heading text-accent-brown">{resumen.populares}</p>
          </div>
        </div>

        <ProductForm product={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />

        <ProductTable
          products={products}
          onEdit={(product) => setEditing(product)}
          onDelete={handleDelete}
          onTogglePopular={togglePopular}
        />
      </main>
      <Footer />
    </>
  );
}
