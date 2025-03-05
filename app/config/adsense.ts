const isProduction = process.env.NODE_ENV === 'production';
const hasAdsenseId = !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const ADSENSE_CONFIG = {
  isEnabled: isProduction && hasAdsenseId,
  getClient: () => {
    if (!isProduction) {
      return 'ca-pub-xxxxxxxxxxxxxxxx'; // Test ID for development
    }
    return process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  }
}; 