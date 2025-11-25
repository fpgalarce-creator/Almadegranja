import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-kraft/60 bg-white/60">
      <div className="container-padding py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-accent-brown/80">
        <div>
          <p className="font-heading text-lg text-accent-brown">Alma de Granja</p>
          <p>Productos de campo a domicilio. Alma de Granja © {year}.</p>
          <p className="text-accent-brown/60">Pedidos y consultas por WhatsApp.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/perfil">Mi cuenta</Link>
        </div>
      </div>
    </footer>
  );
};
