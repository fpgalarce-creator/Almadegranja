import { CartItem } from "./cart";
import { Product } from "./products";
import { User } from "./auth";

export type CheckoutData = {
  cart: Array<CartItem & { product: Product }>;
  user?: User | null;
  formaPago: "Pagar al llegar" | "Transferencia";
};

export const formatCLP = (value: number) =>
  value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export const buildWhatsappMessage = ({ cart, user, formaPago }: CheckoutData) => {
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

  lines.push("", `Total: ${formatCLP(total)}`, "", "Mis datos:");
  lines.push(`Nombre: ${user?.nombre ?? "(por confirmar)"}`);
  lines.push(`Dirección: ${user?.direccion ?? "(por confirmar)"}`);
  lines.push(`Teléfono: ${user?.telefono ?? "(por confirmar)"}`);
  lines.push(`Forma de pago: ${formaPago}`);

  const message = lines.join("\n");
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/56911111111?text=${encoded}`;

  return { message, whatsappUrl };
};
