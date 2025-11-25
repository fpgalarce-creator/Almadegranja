"use client";

import { useEffect, useState } from "react";
import { Categoria, Product } from "@/lib/products";

interface Props {
  product?: Product | null;
  onSubmit: (product: Product) => void;
  onCancel?: () => void;
}

const categorias: Categoria[] = ["Huevos", "Quesos", "Frutos secos", "Otros"];

export const ProductForm = ({ product, onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState<Omit<Product, "id">>({
    nombre: "",
    descripcion: "",
    categoria: "Huevos",
    precio: 0,
    stock: 0,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1585238342029-4c01753777a0?auto=format&fit=crop&w=900&q=60",
  });

  useEffect(() => {
    if (product) {
      const { id, ...rest } = product;
      setForm(rest);
    }
  }, [product]);

  const handleChange = (key: keyof typeof form, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Product = {
      id: product?.id ?? crypto.randomUUID(),
      ...form,
    };
    onSubmit(newProduct);
    setForm({
      nombre: "",
      descripcion: "",
      categoria: "Huevos",
      precio: 0,
      stock: 0,
      popular: false,
      imagenUrl: "https://images.unsplash.com/photo-1585238342029-4c01753777a0?auto=format&fit=crop&w=900&q=60",
    });
  };

  return (
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
          <label className="label">Categoría</label>
          <select
            className="input-field mt-1"
            value={form.categoria}
            onChange={(e) => handleChange("categoria", e.target.value as Categoria)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Precio (CLP)</label>
          <input
            type="number"
            min={0}
            className="input-field mt-1"
            value={form.precio}
            onChange={(e) => handleChange("precio", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="label">Stock</label>
          <input
            type="number"
            min={0}
            className="input-field mt-1"
            value={form.stock}
            onChange={(e) => handleChange("stock", Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div>
        <label className="label">Descripción</label>
        <textarea
          className="input-field mt-1"
          rows={3}
          value={form.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        />
      </div>
      <div>
        <label className="label">URL de imagen</label>
        <input
          className="input-field mt-1"
          value={form.imagenUrl}
          onChange={(e) => handleChange("imagenUrl", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="popular"
          type="checkbox"
          checked={form.popular}
          onChange={(e) => handleChange("popular", e.target.checked)}
          className="h-4 w-4 text-primary focus:ring-primary"
        />
        <label htmlFor="popular" className="text-sm text-accent-brown">
          Marcar como popular
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="button-primary">
          {product ? "Actualizar producto" : "Crear producto"}
        </button>
        {product && (
          <button type="button" onClick={onCancel} className="button-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
