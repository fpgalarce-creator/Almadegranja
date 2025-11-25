# Alma de Granja

E-commerce demostrativo construido con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**. El flujo de compra se confirma por WhatsApp y los datos se guardan en `localStorage` para simular usuarios, autenticación y gestión de productos.

## Scripts

- `npm run dev` – inicia el modo de desarrollo.
- `npm run build` – genera la build de producción.
- `npm run start` – sirve la build generada.
- `npm run lint` – ejecuta ESLint con la configuración de Next.

## Estructura

- `app/` – páginas con el App Router (`/`, `/tienda`, `/login`, `/registro`, `/perfil`, `/admin`, `/olvide-password`).
- `components/` – componentes reutilizables (hero, tarjetas de producto, carrito, etc.).
- `lib/` – utilidades de autenticación, carrito, productos iniciales y WhatsApp.

## Notas

- La autenticación, el carrito y el CRUD de productos funcionan sólo en el navegador mediante `localStorage`.
- Se incluye un usuario administrador por defecto:
  - Email: `admin@almadegranja.cl`
  - Password: `Admin123`
- El botón de checkout genera un mensaje formateado y abre una URL de WhatsApp con el pedido listo para enviar.
