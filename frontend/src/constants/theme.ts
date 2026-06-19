/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    // Purple & Pink Theme
    primary: '#8B5CF6',        // Vibrant Purple
    primaryLight: '#E9D5FF',   // Pale Purple
    accent: '#EC4899',         // Hot Pink
    accentLight: '#FCE7F3',    // Pale Pink
    softWhite: '#FAFBFF',      // Slightly blue-tinted white
    textDark: '#5B21B6',       // Deep Purple
    border: '#D8BFD8',         // Thistle (soft purple)
    success: '#10B981',        // Green
    error: '#EF4444',          // Red
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    // Purple & Pink Theme (Dark Mode)
    primary: '#A78BFA',        // Lighter Purple
    primaryLight: '#7C3AED',   // Darker Purple
    accent: '#F472B6',         // Light Pink
    accentLight: '#831843',    // Deep Pink
    softWhite: '#1F1F2E',      // Dark purple-tinted
    textDark: '#E9D5FF',       // Pale Purple text
    border: '#6B21A8',         // Dark Purple
    success: '#10B981',        // Green
    error: '#FCA5A5',          // Light Red
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
