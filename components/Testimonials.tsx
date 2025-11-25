const testimonials = [
  {
    quote: "Los huevos son realmente frescos y el sabor se nota. Atención muy cercana.",
    name: "Paula, Ñuñoa",
  },
  {
    quote: "Me encanta poder pedir por WhatsApp y coordinar la entrega fácil y rápido.",
    name: "Diego, Providencia",
  },
  {
    quote: "Los quesos son una delicia, especialmente el de oveja. Repetiré pronto.",
    name: "Camila, La Reina",
  },
];

export const Testimonials = () => (
  <section className="container-padding py-12 md:py-16">
    <h2 className="section-title">Testimonios</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((item) => (
        <div key={item.name} className="kraft-card p-6 space-y-4">
          <p className="text-accent-brown/80 leading-relaxed">“{item.quote}”</p>
          <p className="font-heading text-accent-brown">{item.name}</p>
        </div>
      ))}
    </div>
  </section>
);
