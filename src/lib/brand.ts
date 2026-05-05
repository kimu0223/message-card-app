export const brandName = '贈りことば'
export const brandNameEn = 'OkuriKotoba'
export const brandDisplayName = `${brandName} | ${brandNameEn}`
export const brandTagline = '心ふるえる、一通の手紙を。'

export function withBrandName(title: string) {
  return `${title} | ${brandName}`
}
