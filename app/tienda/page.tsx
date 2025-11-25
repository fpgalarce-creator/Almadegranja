import { Suspense } from "react";
import TiendaPageClient from "./TiendaPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Cargando productos...</div>}>
      <TiendaPageClient />
    </Suspense>
  );
}
