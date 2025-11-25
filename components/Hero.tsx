import Link from "next/link";
import { Categoria } from "@/lib/products";

type CategoryHighlight = {
  name: Categoria;
  description: string;
  icon: string;
  count: number;
};

export const Hero = ({ categories }: { categories: CategoryHighlight[] }) => {
  return (
    <section className="container-padding pt-10 md:pt-14 lg:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="space-y-6 max-w-2xl lg:col-span-5">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold leaf-accent">
            E-commerce rural de alta gama
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-heading text-accent-brown leading-tight">
              Del campo a tu mesa, con elegancia
            </h1>
            <p className="text-lg text-accent-brown/80 leading-relaxed">
              Huevos, quesos y frutos secos seleccionados directamente de nuestra red de productores. Compra en un
              entorno cálido, ágil y con toda la frescura que esperas de Alma de Granja.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/tienda" className="button-primary text-center text-base shadow-lg">
              Ver productos
            </Link>
            <Link href="#como-funciona" className="button-secondary text-center text-base">
              Cómo funciona
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 pt-2 text-sm text-accent-brown/70">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Envíos coordinados por WhatsApp
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Empaques premium tipo kraft
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Atención personalizada
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-[28px] border border-kraft/60 bg-gradient-to-r from-[#f1e6d5] via-white to-[#e8f0e1] shadow-2xl">
            <div className="absolute inset-0 bg-[url('/destacado-campo.svg')] bg-no-repeat bg-right-bottom opacity-30" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 lg:p-10 items-center relative z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] text-primary font-semibold shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Colección destacada
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-accent-brown/70">Selección gourmet</p>
                  <h3 className="font-heading text-3xl text-accent-brown leading-tight">Sabores del campo</h3>
                  <p className="text-sm md:text-base text-accent-brown/80 leading-relaxed">
                    Acompaña tus desayunos y tablas con ingredientes nobles, frescos y de origen conocido.
                  </p>
                  <ul className="space-y-2 text-sm text-accent-brown/80">
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
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link href="/tienda" className="button-secondary text-sm">
                      Ver catálogo
                    </Link>
                    <span className="badge bg-primary/15 text-primary border border-primary/20">Entrega dedicada</span>
                    <span className="badge bg-[#e8f0e1] text-accent-brown border border-kraft/60">Inspirado en la granja</span>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute -bottom-8 -left-10 h-28 w-28 rounded-full bg-primary/15 blur-2xl" aria-hidden />
                <div className="absolute -top-10 -right-8 h-24 w-24 rounded-full bg-[#647c4c]/15 blur-2xl" aria-hidden />
                <div className="rounded-3xl border border-white/80 shadow-2xl overflow-hidden bg-white/90 backdrop-blur">
                  <img
                    src="/destacado-campo.svg"
                    alt="Productos artesanales de Alma de Granja"
                    className="w-[360px] h-[260px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/tienda?categoria=${encodeURIComponent(category.name)}`}
                className="group relative rounded-2xl border border-kraft/70 bg-white/90 p-5 shadow-card hover:-translate-y-1 transition duration-200 botanical-corner"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                    {category.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {category.count} {category.count === 1 ? "producto" : "productos"}
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-heading text-lg text-accent-brown group-hover:text-primary transition">{category.name}</p>
                  <p className="text-sm text-accent-brown/70 leading-relaxed">{category.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Ver categoría <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
