import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container-padding pt-12 md:pt-16 lg:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold leaf-accent">
            Frescura curada con cariño
          </p>
          <h1 className="text-4xl md:text-5xl font-heading text-accent-brown leading-tight">
            Del campo a tu mesa
          </h1>
          <p className="text-lg text-accent-brown/80 leading-relaxed">
            Huevos, quesos y frutos secos seleccionados, directo de productores locales. Un catálogo rural con toque elegante.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/tienda" className="button-primary text-center">
              Ver productos
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
              Envíos coordinados por WhatsApp, empaques tipo papel kraft y atención personalizada.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
          <div className="kraft-card botanical-corner relative overflow-hidden p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <span className="h-2 w-2 rounded-full bg-primary" /> Producto destacado
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 sm:gap-6 items-center">
              <div className="sm:col-span-3">
                <h3 className="font-heading text-2xl text-accent-brown">Sabores del campo</h3>
                <p className="text-sm text-accent-brown/70 leading-relaxed mt-2">
                  Una selección cálida de nuestra granja: acompaña tus desayunos y tablas con productos nobles.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-accent-brown/80">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span> Huevos de gallinas libres
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span> Quesos artesanales de campo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span> Frutos secos tostados
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/tienda" className="button-secondary text-sm">
                    Ver catálogo
                  </Link>
                  <span className="badge bg-primary/15 text-primary border border-primary/20">
                    Acento rural
                  </span>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="rounded-2xl border border-kraft overflow-hidden bg-white shadow-card">
                  <img
                    src="/destacado-campo.svg"
                    alt="Productos artesanales de Alma de Granja"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
