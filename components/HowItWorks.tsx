import Link from "next/link";

const steps = [
  {
    title: "Elige tus productos",
    description: "Navega la tienda y arma tu carrito con lo que más te guste.",
  },
  {
    title: "Confirmas por WhatsApp",
    description: "Compartes tu pedido, datos y forma de pago para coordinar.",
  },
  {
    title: "Recibes con cariño",
    description: "Entregamos en tu horario y medio preferido, con atención cercana.",
  },
];

export const HowItWorks = () => (
  <section id="como-funciona" className="container-padding py-12 md:py-16">
    <h2 className="section-title">¿Cómo funciona?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div key={step.title} className="kraft-card p-6 space-y-3">
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-heading text-lg">
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
