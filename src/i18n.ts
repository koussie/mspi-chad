export const locales = ['fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
