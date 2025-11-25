export type Categoria = "Huevos" | "Quesos" | "Frutos secos" | "Otros";

export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  precio: number;
  stock: number;
  popular: boolean;
  imagenUrl: string;
};

const STORAGE_KEY = "almadegranja_products";

const defaultProducts: Product[] = [
  {
    id: "huevos-camperos",
    nombre: "Huevos camperos frescos",
    descripcion: "Docena de huevos de gallinas libres, sabor auténtico del campo.",
    categoria: "Huevos",
    precio: 6990,
    stock: 25,
    popular: true,
    imagenUrl: "https://images.unsplash.com/photo-1588167865097-75aebe5f9be8?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "huevos-organicos",
    nombre: "Huevos orgánicos",
    descripcion: "Docena certificada, alimentación natural sin químicos.",
    categoria: "Huevos",
    precio: 7990,
    stock: 8,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "queso-cabra",
    nombre: "Queso de cabra artesanal",
    descripcion: "Sabor suave, ideal para tablas y ensaladas frescas.",
    categoria: "Quesos",
    precio: 10990,
    stock: 12,
    popular: true,
    imagenUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "queso-mantecoso",
    nombre: "Queso mantecoso de campo",
    descripcion: "Textura cremosa y sabor profundo para tus desayunos.",
    categoria: "Quesos",
    precio: 9990,
    stock: 0,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "queso-oveja",
    nombre: "Queso curado de oveja",
    descripcion: "Afinado por 6 meses, notas a frutos secos y mantequilla.",
    categoria: "Quesos",
    precio: 12490,
    stock: 6,
    popular: true,
    imagenUrl: "https://images.unsplash.com/photo-1585238341986-55bb76861391?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "mix-frutos-secos",
    nombre: "Mix premium de frutos secos",
    descripcion: "Nueces, almendras, avellanas y castañas tostadas.",
    categoria: "Frutos secos",
    precio: 8990,
    stock: 18,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "almendras",
    nombre: "Almendras tostadas",
    descripcion: "Bolsa de 500g, tostado suave para snack saludable.",
    categoria: "Frutos secos",
    precio: 7490,
    stock: 20,
    popular: true,
    imagenUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "nueces",
    nombre: "Nueces mariposa",
    descripcion: "Bolsa de 500g, seleccionadas y sin cáscara.",
    categoria: "Frutos secos",
    precio: 8290,
    stock: 15,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1585238342029-4c01753777a0?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "miel",
    nombre: "Miel multifloral",
    descripcion: "Frasco de 500g, cosecha local sin aditivos.",
    categoria: "Otros",
    precio: 6990,
    stock: 10,
    popular: true,
    imagenUrl: "https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "mermelada",
    nombre: "Mermelada de berries",
    descripcion: "Receta casera con frutos rojos de temporada.",
    categoria: "Otros",
    precio: 5990,
    stock: 14,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "manjar-campo",
    nombre: "Manjar de campo",
    descripcion: "Sabor tradicional chileno, textura cremosa.",
    categoria: "Otros",
    precio: 5490,
    stock: 7,
    popular: false,
    imagenUrl: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "granola",
    nombre: "Granola artesanal",
    descripcion: "Avena, frutos secos y miel para tus desayunos.",
    categoria: "Frutos secos",
    precio: 6490,
    stock: 9,
    popular: true,
    imagenUrl: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=900&q=60",
  },
];

const isBrowser = () => typeof window !== "undefined";

export const getProducts = (): Product[] => {
  if (!isBrowser()) return defaultProducts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Product[];
      return parsed;
    } catch (error) {
      console.error("Error al leer productos", error);
    }
  }
  return defaultProducts;
};

export const saveProducts = (products: Product[]) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const upsertProduct = (product: Product) => {
  const products = getProducts();
  const exists = products.some((p) => p.id === product.id);
  const updated = exists
    ? products.map((p) => (p.id === product.id ? product : p))
    : [...products, product];
  saveProducts(updated);
  return updated;
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
  return products;
};

export const getPopularProducts = () => getProducts().filter((p) => p.popular);

export const getProductById = (id: string) => getProducts().find((p) => p.id === id);
