import { Product } from "@/lib/products";
import { formatCLP } from "@/lib/whatsapp";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onTogglePopular: (id: string, value: boolean) => void;
}

export const ProductTable = ({ products, onEdit, onDelete, onTogglePopular }: Props) => {
  return (
    <div className="kraft-card p-4 overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b border-kraft/70">
            <th className="table-header py-3">Nombre</th>
            <th className="table-header py-3">Categoría</th>
            <th className="table-header py-3">Precio</th>
            <th className="table-header py-3">Stock</th>
            <th className="table-header py-3">Popular</th>
            <th className="table-header py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-kraft/50">
              <td className="table-cell py-3 font-semibold">{product.nombre}</td>
              <td className="table-cell py-3">{product.categoria}</td>
              <td className="table-cell py-3">{formatCLP(product.precio)}</td>
              <td className="table-cell py-3">{product.stock}</td>
              <td className="table-cell py-3">
                <input
                  type="checkbox"
                  checked={product.popular}
                  onChange={(e) => onTogglePopular(product.id, e.target.checked)}
                />
              </td>
              <td className="table-cell py-3 space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="text-primary hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
