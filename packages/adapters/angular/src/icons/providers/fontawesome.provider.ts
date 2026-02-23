import { IconSetProvider, IconVariant, iconRegistry } from '../registry';

function mapVariantToFaPrefix(variant?: IconVariant): string {
  switch (variant) {
    case 'regular': return 'far';
    case 'bold': return 'fas';
    case 'light': return 'fal';
    case 'thin': return 'fat';
    case 'duotone': return 'fad';
    case 'fill': return 'fas';
    default: return 'fas';
  }
}

export const fontAwesomeProvider: IconSetProvider = {
  name: 'fa',
  resolveClass(iconName: string, variant?: IconVariant): string | null {
    const prefix = mapVariantToFaPrefix(variant);
    return `${prefix} fa-${iconName}`;
  },
  resolveSvg() {
    return null;
  }
};

export function registerFontAwesomeProvider() {
  iconRegistry.registerProvider(fontAwesomeProvider);
}

