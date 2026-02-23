import { IconSetProvider, IconVariant, iconRegistry } from '../registry';
export const phosphorProvider: IconSetProvider = {
  name: 'ph',
  resolveClass(iconName: string, variant?: IconVariant): string | null {
    const v = (variant || 'regular');
    if (v === 'regular') {
      return `ph ph-${iconName}`;
    }
    return `ph-${v} ph-${iconName}`;
  },
  resolveSvg() {
    return null;
  }
};

export function registerPhosphorProvider() {
  iconRegistry.registerProvider(phosphorProvider);
}
