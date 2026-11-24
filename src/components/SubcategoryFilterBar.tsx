import React from 'react';

export interface SubcategoryOption<T extends string = string> {
  id: T;
  label: string;
}

interface SubcategoryFilterBarProps<T extends string = string> {
  categories: Array<SubcategoryOption<T>>;
  counts: Record<string, number>;
  activeId: T;
  onSelect: (id: T) => void;
  ariaLabel: string;
}

export function SubcategoryFilterBar<T extends string>({
  categories,
  counts,
  activeId,
  onSelect,
  ariaLabel,
}: SubcategoryFilterBarProps<T>) {
  const visibleCategories = categories.filter(
    (cat) => cat.id === 'todos' || (counts[cat.id] ?? 0) > 0
  );

  if (visibleCategories.length <= 1) return null;

  return (
    <div className="mb-6 sm:mb-8 animate-in fade-in duration-200">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex items-center gap-2 overflow-x-auto pb-2 flex-nowrap scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
      >
        {visibleCategories.map((cat) => {
          const isActive = activeId === cat.id;
          const count = counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#38432a] text-[#faf8f5] shadow-xs'
                  : 'bg-[#f5f1e8] text-[#38432a] border border-[#748a54]/20 hover:bg-[#e8e3d7]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive
                    ? 'bg-[#c29d59]/30 text-[#faf8f5]'
                    : 'bg-[#748a54]/15 text-[#5d6650]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
