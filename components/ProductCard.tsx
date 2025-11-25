"use client";

import { addToCart } from "@/lib/cart";
import { formatCLP } from "@/lib/whatsapp";
import { Product } from "@/lib/products";
import { User } from "@/lib/auth";
import { useState } from "react";

interface Props {
  product: Product;
  user?: User | null;
  onAdded?: () => void;
}

export const ProductCard = ({ product, user, onAdded }: Props) => {
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (product.stock === 0) return;
    setAdding(true);
    addToCart(product.id, user);
    onAdded?.();
    setTimeout(() => setAdding(false), 400);
  };

  return (
    <div className="kraft-card p-4 flex flex-col">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.imagenUrl}
          alt={product.nombre}
          className="h-48 w-full object-cover"
        />
        {product.popular && (
          <span className="absolute left-3 top-3 badge">Popular</span>
        )}
        {product.stock === 0 && (
          <span className="absolute right-3 top-3 bg-accent-brown text-white text-xs px-3 py-1 rounded-full">
            Sin stock
          </span>
        )}
      </div>
      <div className="flex-1 pt-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-heading text-lg text-accent-brown">{product.nombre}</p>
            <p className="text-sm text-accent-brown/70">{product.categoria}</p>
          </div>
          <p className="font-semibold text-accent-brown">{formatCLP(product.precio)}</p>
        </div>
        <p className="text-sm text-accent-brown/70 leading-relaxed">
          {product.descripcion}
        </p>
        <p className="text-xs text-accent-brown/60">{product.stock} en stock</p>
      </div>
      <button
        onClick={handleAdd}
        disabled={product.stock === 0 || adding}
        className="mt-4 button-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {product.stock === 0 ? "Sin stock" : adding ? "Agregando..." : "Agregar al carrito"}
      </button>
    </div>
  );
};
