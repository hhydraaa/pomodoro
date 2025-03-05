import en from './en';
import tr from './tr';

export type Locale = typeof en;

export const locales = {
  en,
  tr,
};

export type LocaleKey = keyof typeof locales; 