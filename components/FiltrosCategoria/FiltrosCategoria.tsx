// components/ProdutoCard/FiltrosCategoria.tsx
'use client';

import useSWR from "swr";

const fetcher = (url: string) => fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`).then(res => res.json());

interface Props {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

/**
 * Painel lateral com checkboxes para filtrar por categoria
 * Inclui opção "Todas as categorias"
 */
export default function FiltrosCategoria({ selectedCategories, onChange }: Props) {
  const { data: categoriesData } = useSWR("https://deisishop.pythonanywhere.com/categories", fetcher);

  // Extrai apenas os nomes das categorias
  const categories = categoriesData
    ? Object.values(categoriesData).map((c: any) => c.name || c).filter(Boolean).sort()
    : [];

  const toggleCategory = (cat: string) => {
    onChange(
      selectedCategories.includes(cat)
        ? selectedCategories.filter(c => c !== cat)
        : [...selectedCategories, cat]
    );
  };

  const toggleAll = () => {
    onChange(selectedCategories.length === categories.length ? [] : [...categories]);
  };

  return (
    <div className="w-full lg:w-72">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
        <h3 className="font-bold text-xl mb-6">Filtrar por categoria</h3>

        {/* Opção "Todas" */}
        <label className="flex items-center gap-3 mb-5 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
          <input
            type="checkbox"
            checked={selectedCategories.length === categories.length}
            onChange={toggleAll}
            className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="font-semibold text-lg">Todas as categorias</span>
        </label>

        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg">{cat}</span>
            </label>
          ))}
        </div>

        {selectedCategories.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="mt-6 text-red-600 hover:underline text-sm font-medium"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    </div>
  );
}