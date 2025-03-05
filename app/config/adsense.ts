export const ADSENSE_CONFIG = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'your-adsense-client-id',
  isEnabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT
}; 