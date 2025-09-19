import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, includeCommas = true): string {
  if (includeCommas) {
    return new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount).replace('JMD', '').trim();
  }
  return '$' + amount.toFixed(2);
}
