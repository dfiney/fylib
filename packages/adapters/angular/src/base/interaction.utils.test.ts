import { describe, it, expect, vi } from 'vitest';
import { animationClasses, styleString } from './interaction.utils';

describe('interaction.utils', () => {
  describe('animationClasses', () => {
    it('should return empty string for no names', () => {
      expect(animationClasses()).toBe('');
    });

    it('should compose animation classes with prefix', () => {
      expect(animationClasses('fade-in', 'slide-up')).toBe(' fy-anim-fade-in fy-anim-slide-up');
    });

    it('should ignore undefined or empty names', () => {
      expect(animationClasses('fade-in', undefined, '')).toBe(' fy-anim-fade-in');
    });
  });

  describe('styleString', () => {
    it('should return empty string for null/undefined', () => {
      expect(styleString(null)).toBe('');
      expect(styleString(undefined)).toBe('');
    });

    it('should convert object to style string', () => {
      const styles = { color: 'red', 'font-size': '12px' };
      expect(styleString(styles)).toBe('color: red; font-size: 12px');
    });
  });
});
