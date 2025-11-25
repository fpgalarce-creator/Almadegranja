import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container-padding pt-10 md:pt-16 lg:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
            Frescura y cariño rural
          </p>
          <h1 className="text-4xl md:text-5xl font-heading text-accent-brown leading-tight">
            Del campo a tu mesa
          </h1>
          <p className="text-lg text-accent-brown/80 leading-relaxed">
            Huevos, quesos y frutos secos seleccionados, directo de la granja a tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/tienda" className="button-primary text-center">
              Ver tienda
            </Link>
            <Link href="#como-funciona" className="button-secondary text-center">
              Cómo funciona
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
              🥚
            </div>
            <p className="text-sm text-accent-brown/70 max-w-md">
              Productos de campo en tu mesa, con la frescura y el cariño de la granja.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
          <div className="kraft-card relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1200&q=80"
              alt="Productos de campo"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent-brown/80 to-transparent p-6 text-white">
              <p className="font-heading text-2xl">Alma de Granja</p>
              <p className="text-sm">Calidad artesanal con atención cercana.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
