export const DEFAULT_COUNTRY = 'KE'

export const COUNTRIES = [
  { code: 'KE', label: 'Kenya', flag: '🇰🇪' },
  { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
  { code: 'ZA', label: 'South Africa', flag: '🇿🇦' },
  { code: 'TZ', label: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', label: 'Uganda', flag: '🇺🇬' },
  { code: 'RW', label: 'Rwanda', flag: '🇷🇼' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'DE', label: 'Germany', flag: '🇩🇪' },
  { code: 'AE', label: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'IN', label: 'India', flag: '🇮🇳' },
  { code: 'CN', label: 'China', flag: '🇨🇳' },
] as const

export type CountryCode = (typeof COUNTRIES)[number]['code']

export function isKenya(country: string | undefined | null): boolean {
  return !country || country === DEFAULT_COUNTRY
}

export function getCountryInfo(code: string | undefined | null) {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0]
}

export function getCountryFromCookies(cookieHeader: string | null): string {
  if (!cookieHeader) return DEFAULT_COUNTRY
  const match = cookieHeader.match(/(?:^|;\s*)country=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : DEFAULT_COUNTRY
}
