import { Product, getProductById } from "./products";
import { User } from "./auth";

export type CartItem = {
  productId: string;
  quantity: number;
};

const CART_KEY_PREFIX = "almadegranja_cart_";
const isBrowser = () => typeof window !== "undefined";

const getKey = (user?: User | null) => {
  const base = user?.email ?? "guest";
  return `${CART_KEY_PREFIX}${base}`;
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
};

export const addToCart = (productId: string, user?: User | null) => {
  const cart = getCart(user);
  const exists = cart.find((item) => item.productId === productId);
  const updated = exists
    ? cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
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
  const cart = getCart(user);
  const updated = cart
    .map((item) =>
      item.productId === productId ? { ...item, quantity } : item
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
