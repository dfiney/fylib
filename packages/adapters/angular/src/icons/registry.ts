export type IconVariant = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface IconSetProvider {
  name: string;
  resolveClass?(iconName: string, variant?: IconVariant): string | null;
  resolveSvg?(iconName: string, variant?: IconVariant): { viewBox?: string; svg: string } | null;
}

class IconRegistry {
  private providers = new Map<string, IconSetProvider>();

  registerProvider(provider: IconSetProvider) {
    this.providers.set(provider.name, provider);
  }

  getProvider(name: string): IconSetProvider | undefined {
    return this.providers.get(name);
  }
}

export const iconRegistry = new IconRegistry();

export interface IconNameMap {
  ph: string;
  fa: string;
  mdi: string;
}

export type IconSetKey = keyof IconNameMap;
