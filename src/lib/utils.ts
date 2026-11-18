import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ACADEMY_IMAGES = {
  heroGrand: '/src/assets/images/hero_concert_grand_1794917759322.jpg',
  harpsichord: '/src/assets/images/history_harpsichord_1794917759089.jpg',
  fortepiano: '/src/assets/images/history_fortepiano_1794917759088.jpg',
  upright: '/src/assets/images/piano_upright_studio_1794917760197.jpg',
  digitalStage: '/src/assets/images/piano_digital_stage_1794917760740.jpg',
} as const;
