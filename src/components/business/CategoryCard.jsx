import React from 'react';
import {
  Utensils,
  ShoppingBag,
  Stethoscope,
  Wrench,
  Car,
  Scissors,
  Dumbbell,
  Smartphone,
  GraduationCap,
  ShoppingCart,
  Building2,
} from 'lucide-react';

const iconMap = {
  Utensils,
  ShoppingBag,
  Stethoscope,
  Wrench,
  Car,
  Scissors,
  Dumbbell,
  Smartphone,
  GraduationCap,
  ShoppingCart,
  Building2,
};

// Pure display card — parent controls click behavior (button or Link)
export const CategoryCard = ({ category, active = false }) => {
  const IconComponent = iconMap[category.icon] || Building2;

  return (
    <div
      className={`group flex flex-col items-center p-4 rounded-2xl border transition-all duration-200 ${
        active
          ? 'bg-primary text-on-primary border-primary shadow-md'
          : 'bg-surface border-outline-variant/30 hover:shadow-md hover:border-primary/40'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
          active
            ? 'bg-white/20'
            : 'bg-primary/10 group-hover:bg-primary group-hover:text-on-primary'
        }`}
      >
        <IconComponent
          className={`w-6 h-6 transition-colors ${
            active
              ? 'text-on-primary'
              : 'text-primary group-hover:text-on-primary'
          }`}
        />
      </div>
      <span
        className={`font-sans text-xs md:text-sm font-semibold text-center line-clamp-1 ${
          active ? 'text-on-primary' : 'text-on-surface'
        }`}
      >
        {category.name}
      </span>
      {category.count && (
        <span
          className={`text-[11px] mt-0.5 font-sans ${
            active ? 'text-on-primary/70' : 'text-outline'
          }`}
        >
          {category.count} listings
        </span>
      )}
    </div>
  );
};
