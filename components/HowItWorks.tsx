import Link from "next/link";

const steps = [
  {
    title: "Elige tus productos",
    description: "Navega la tienda y arma tu carrito con lo que más te guste.",
  },
  {
    title: "Confirma por WhatsApp",
    description: "Envías el detalle del carrito y tus datos para coordinar.",
  },
  {
    title: "Recibe y disfruta",
    description: "Programamos la entrega con empaques kraft y mucho cariño.",
  },
  {
    title: "Paga seguro",
    description: "Elige entre transferencia o pago al recibir tu pedido.",
  },
];

export const HowItWorks = () => (
  <section id="como-funciona" className="container-padding">
    <h2 className="section-title">¿Cómo funciona?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <div key={step.title} className="kraft-card p-6 space-y-3">
          <div className="h-11 w-11 rounded-full bg-primary/15 text-primary flex items-center justify-center font-heading text-lg">
            {index + 1}
          </div>
          <p className="font-heading text-xl text-accent-brown">{step.title}</p>
          <p className="text-sm text-accent-brown/70 leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
    <div className="text-center mt-6">
      <Link href="/tienda" className="button-primary inline-flex">
        Ir a la tienda
      </Link>
    </div>
  </section>
);
