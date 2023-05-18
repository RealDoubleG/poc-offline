import { extendTheme } from 'native-base';
import { fonts } from './Fonts';

export const THEME = extendTheme({
  colors: {
    purple: {
      200: '#BB86FC',
      700: '#3700B3'
    },
    white: '#FFFFFF',
    red: {
      5000: '#F75A68'
    },
    background: {
      dark: '#121212'
    }
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  },
  sizes: {
    14: 56,
    33: 148
  },
  fontConfig: {
    Montserrat: {
      100: fonts.thin100,
      200: fonts.extraLight200,
      300: fonts.light300,
      400: fonts.regular400,
      500: fonts.medium500,
      700: fonts.bold700,
      800: fonts.extraBold800,
      900: fonts.black900
    }
  },
  fonts: {
    body: 'Montserrat',
    heading: 'Montserrat',
    mono: 'Montserrat'
  }
});

type CustomThemeType = typeof THEME;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
