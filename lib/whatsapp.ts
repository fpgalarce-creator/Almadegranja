import { CartItem } from "./cart";
import { Product } from "./products";
import { User } from "./auth";

export type CheckoutData = {
  cart: Array<CartItem & { product: Product }>;
  user?: User | null;
  formaPago?: "Pagar al llegar" | "Transferencia" | string;
};

// Número de WhatsApp centralizado para configurar el contacto del catálogo
// Admin por defecto: admin@almadegranja.cl / Admin123
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56912345678";

export const formatCLP = (value: number) =>
  value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export const buildWhatsAppOrderMessage = ({ cart, user, formaPago }: CheckoutData) => {
  const lines = ["Hola, quiero confirmar mi pedido en Alma de Granja:\n"];

  cart.forEach((item) => {
    lines.push(
      `${item.product.nombre} x ${item.quantity} = ${formatCLP(
        item.product.precio * item.quantity
      )}`
    );
  });

  const total = cart.reduce(
    (acc, item) => acc + item.product.precio * item.quantity,
    0
  );

  lines.push("", `Total: ${formatCLP(total)}`, "");

  lines.push("Mis datos:");
  lines.push(`Nombre: ${user?.nombre || "Por definir"}`);
  lines.push(`Dirección: ${user?.direccion || "Por definir"}`);
  lines.push(`Teléfono: ${user?.telefono || "Por definir"}`);
  lines.push(`Forma de pago: ${formaPago || "Por definir"}`);

  const message = lines.join("\n");
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  return { message, whatsappUrl };
};

export const buildWhatsappMessage = (data: CheckoutData) =>
  buildWhatsAppOrderMessage(data);

// Helper adicional para mensajes generales en el mismo número (contacto rápido)
export const buildWhatsappCustomMessage = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};
