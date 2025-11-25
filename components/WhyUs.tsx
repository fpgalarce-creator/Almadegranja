const items = [
  {
    title: "Origen local",
    description: "Seleccionamos productores cercanos para garantizar frescura.",
    icon: "📍",
  },
  {
    title: "Productos seleccionados",
    description: "Cada lote es probado para asegurar sabor y calidad constante.",
    icon: "🌿",
  },
  {
    title: "Entrega flexible",
    description: "Coordinamos horarios y puntos de entrega que te acomoden.",
    icon: "🚚",
  },
  {
    title: "Atención por WhatsApp",
    description: "Resolviendo tus pedidos y dudas con trato cercano.",
    icon: "💬",
  },
];

export const WhyUs = () => (
  <section className="container-padding py-12 md:py-16">
    <h2 className="section-title">¿Por qué elegirnos?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.title} className="kraft-card p-6 text-center space-y-3">
          <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary">
            {item.icon}
          </div>
          <p className="font-heading text-lg text-accent-brown">{item.title}</p>
          <p className="text-sm text-accent-brown/70">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);
