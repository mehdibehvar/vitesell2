import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export const formatPrice = (value: number): string => {
    return new Intl.NumberFormat("fa-IR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Parse formatted input back to number
export const parsePrice = (value: string): number => {
  // normalize Persian digits to Latin before parsing
  const persianMap: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
  };
  const normalized = value.replace(/[۰-۹]/g, (d) => persianMap[d] ?? d);
  const digitsOnly = normalized.replace(/[^\d0-9]/g, "");
  return Number.parseInt(digitsOnly, 10) || 0;
}

/**
 * Convert ASCII digits in a string to Persian (Farsi) digits.
 * Example: toPersianDigits('Price 123') -> 'Price ۱۲۳'
 */
export const toPersianDigits = (s: string): string => {
  const map: Record<string, string> = {
    '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
    '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
  };
  return s.replace(/[0-9]/g, (d) => map[d] ?? d);
}

/**
 * Convert Persian digits to ASCII digits (۰-۹ -> 0-9)
 */
export const toLatinDigits = (s: string): string => {
  const map: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
  };
  return s.replace(/[۰-۹]/g, (d) => map[d] ?? d);
}
