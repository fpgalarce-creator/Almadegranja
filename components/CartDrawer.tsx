"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartItem,
  addToCart,
  clearCart,
  getCart,
  getCartTotal,
  getCartWithDetails,
  removeFromCart,
  updateQuantity,
} from "@/lib/cart";
import { buildWhatsappMessage, formatCLP } from "@/lib/whatsapp";
import { User } from "@/lib/auth";
import { Product } from "@/lib/products";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  onCartChange?: (items: CartItem[]) => void;
}

// Drawer de carrito con operaciones básicas y enlace a WhatsApp
export const CartDrawer = ({ isOpen, onClose, user, onCartChange }: CartDrawerProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formaPago, setFormaPago] = useState<"Pagar al llegar" | "Transferencia">(
    "Pagar al llegar"
  );

  useEffect(() => {
    if (isOpen) {
      const current = getCart(user);
      setCart(current);
      onCartChange?.(current);
    }
  }, [isOpen, user, onCartChange]);

  const detailedCart = useMemo(() => getCartWithDetails(cart), [cart]);
  const total = useMemo(() => getCartTotal(cart), [cart]);

  const handleUpdate = (items: CartItem[]) => {
    setCart(items);
    onCartChange?.(items);
  };

  const changeQuantity = (productId: string, quantity: number) => {
    const updated = updateQuantity(productId, quantity, user);
    handleUpdate(updated);
  };

  const removeItem = (productId: string) => {
    const updated = removeFromCart(productId, user);
    handleUpdate(updated);
  };

  const increment = (productId: string) => {
    const updated = addToCart(productId, user);
    handleUpdate(updated);
  };

  const handleClear = () => {
    clearCart(user);
    handleUpdate([]);
  };

  const handleCheckout = () => {
    const cartWithProducts = detailedCart as Array<CartItem & { product: Product }>;
    if (cartWithProducts.length === 0) return;
    const { whatsappUrl } = buildWhatsappMessage({ cart: cartWithProducts, user, formaPago });
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/20 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-kraft/60">
          <div>
            <p className="text-lg font-heading text-accent-brown">Tu carrito</p>
            <p className="text-sm text-accent-brown/70">
              {cart.length === 0 ? "Aún no agregas productos" : `${cart.length} artículos`}
            </p>
          </div>
          <button onClick={onClose} className="text-accent-brown/80 hover:text-accent-brown">
            ✕
          </button>
        </div>

        <div className="h-[calc(100%-200px)] overflow-y-auto p-6 space-y-4">
          {detailedCart.length === 0 && (
            <p className="text-sm text-accent-brown/70">Tu carrito está vacío.</p>
          )}

          {detailedCart.map((item) => (
            <div key={item.productId} className="flex gap-4 items-start border-b pb-4 border-kraft/60">
              <img
                src={item.product.imagenUrl}
                alt={item.product.nombre}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-accent-brown">{item.product.nombre}</p>
                    <p className="text-sm text-accent-brown/60">{item.product.categoria}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="h-8 w-8 rounded-full border border-kraft text-accent-brown"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold px-2">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.productId)}
                      className="h-8 w-8 rounded-full border border-kraft text-accent-brown"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-accent-brown">
                    {formatCLP(item.product.precio * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-kraft/60 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-sm text-accent-brown/70">Forma de pago</span>
            <select
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value as typeof formaPago)}
            >
              <option value="Pagar al llegar">Pagar al llegar</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-accent-brown">Total</span>
            <span className="text-lg font-heading">{formatCLP(total)}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 border border-kraft text-accent-brown rounded-full py-3 text-sm hover:bg-kraft/70"
              disabled={cart.length === 0}
            >
              Vaciar
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
            >
              Confirmar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
