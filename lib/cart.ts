import { Product, getProductById } from "./products";
import { User } from "./auth";

export type CartItem = {
  productId: string;
  quantity: number;
};

const CART_KEY_PREFIX = "almadegranja_cart_";
export const CART_UPDATED_EVENT = "cart:updated";
const isBrowser = () => typeof window !== "undefined";

const getKey = (user?: User | null) => {
  const base = user?.email ?? "guest";
  return `${CART_KEY_PREFIX}${base}`;
};

// Notifica a la UI que el carrito cambió (para contadores, drawer, etc.)
const emitCartEvent = (items: CartItem[], user?: User | null) => {
  if (!isBrowser()) return;
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, {
      detail: { items, userEmail: user?.email ?? "guest" },
    })
  );
};

export const getCart = (user?: User | null): CartItem[] => {
  if (!isBrowser()) return [];
  const stored = localStorage.getItem(getKey(user));
  if (stored) {
    try {
      return JSON.parse(stored) as CartItem[];
    } catch (error) {
      console.error("Error al leer carrito", error);
    }
  }
  return [];
};

const persist = (items: CartItem[], user?: User | null) => {
  if (!isBrowser()) return;
  localStorage.setItem(getKey(user), JSON.stringify(items));
  emitCartEvent(items, user);
};

export const addToCart = (productId: string, user?: User | null) => {
  const product = getProductById(productId);
  if (!product || product.stock <= 0) return getCart(user);

  const cart = getCart(user);
  const exists = cart.find((item) => item.productId === productId);
  const nextQuantity = Math.min(
    (exists?.quantity ?? 0) + 1,
    product.stock // Respetamos el stock disponible
  );
  const updated = exists
    ? cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: nextQuantity }
          : item
      )
    : [...cart, { productId, quantity: 1 }];
  persist(updated, user);
  return updated;
};

export const updateQuantity = (
  productId: string,
  quantity: number,
  user?: User | null
) => {
  const product = getProductById(productId);
  if (!product) return getCart(user);
  const safeQuantity = Math.min(Math.max(quantity, 0), product.stock || 0);
  const cart = getCart(user);
  const updated = cart
    .map((item) =>
      item.productId === productId ? { ...item, quantity: safeQuantity } : item
    )
    .filter((item) => item.quantity > 0);
  persist(updated, user);
  return updated;
};

export const removeFromCart = (productId: string, user?: User | null) => {
  const cart = getCart(user).filter((item) => item.productId !== productId);
  persist(cart, user);
  return cart;
};

export const clearCart = (user?: User | null) => {
  persist([], user);
  return [];
};

export const getCartTotal = (cart: CartItem[]) =>
  cart.reduce((acc, item) => {
    const product = getProductById(item.productId) as Product | undefined;
    if (!product) return acc;
    return acc + product.precio * item.quantity;
  }, 0);

export const getCartWithDetails = (cart: CartItem[]) =>
  cart
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as Array<CartItem & { product: Product }>;
