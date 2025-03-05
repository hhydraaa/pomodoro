export const ADSENSE_CONFIG = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  isEnabled: process.env.NODE_ENV === 'production'
}; 