import { IconSetProvider, iconRegistry } from '../registry';

export const mdiProvider: IconSetProvider = {
  name: 'mdi',
  resolveClass(iconName: string): string | null {
    return `mdi mdi-${iconName}`;
  },
  resolveSvg() {
    return null;
  }
};

export function registerMdiProvider() {
  iconRegistry.registerProvider(mdiProvider);
}

