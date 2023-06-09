import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper'

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(121, 89, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 223, 160)',
    onPrimaryContainer: 'rgb(38, 26, 0)',
    secondary: 'rgb(71, 85, 182)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(223, 224, 255)',
    onSecondaryContainer: 'rgb(0, 13, 95)',
    tertiary: 'rgb(0, 107, 94)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(118, 248, 226)',
    onTertiaryContainer: 'rgb(0, 32, 27)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(30, 27, 22)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(30, 27, 22)',
    surfaceVariant: 'rgb(237, 225, 207)',
    onSurfaceVariant: 'rgb(77, 70, 57)',
    outline: 'rgb(127, 118, 103)',
    outlineVariant: 'rgb(208, 197, 180)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(52, 48, 42)',
    inverseOnSurface: 'rgb(248, 239, 231)',
    inversePrimary: 'rgb(248, 189, 42)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 243, 242)',
      level2: 'rgb(244, 238, 235)',
      level3: 'rgb(240, 233, 227)',
      level4: 'rgb(239, 232, 224)',
      level5: 'rgb(236, 228, 219)'
    },
    surfaceDisabled: 'rgba(30, 27, 22, 0.12)',
    onSurfaceDisabled: 'rgba(30, 27, 22, 0.38)',
    backdrop: 'rgba(54, 48, 36, 0.4)'
  }
}

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(248, 189, 42)',
    onPrimary: 'rgb(64, 45, 0)',
    primaryContainer: 'rgb(92, 67, 0)',
    onPrimaryContainer: 'rgb(255, 223, 160)',
    secondary: 'rgb(187, 195, 255)',
    onSecondary: 'rgb(17, 34, 134)',
    secondaryContainer: 'rgb(45, 60, 156)',
    onSecondaryContainer: 'rgb(223, 224, 255)',
    tertiary: 'rgb(85, 219, 198)',
    onTertiary: 'rgb(0, 55, 48)',
    tertiaryContainer: 'rgb(0, 80, 71)',
    onTertiaryContainer: 'rgb(118, 248, 226)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(30, 27, 22)',
    onBackground: 'rgb(233, 225, 216)',
    surface: 'rgb(30, 27, 22)',
    onSurface: 'rgb(233, 225, 216)',
    surfaceVariant: 'rgb(77, 70, 57)',
    onSurfaceVariant: 'rgb(208, 197, 180)',
    outline: 'rgb(153, 143, 128)',
    outlineVariant: 'rgb(77, 70, 57)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(233, 225, 216)',
    inverseOnSurface: 'rgb(52, 48, 42)',
    inversePrimary: 'rgb(121, 89, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(41, 35, 23)',
      level2: 'rgb(47, 40, 24)',
      level3: 'rgb(54, 45, 24)',
      level4: 'rgb(56, 46, 24)',
      level5: 'rgb(61, 50, 25)'
    },
    surfaceDisabled: 'rgba(233, 225, 216, 0.12)',
    onSurfaceDisabled: 'rgba(233, 225, 216, 0.38)',
    backdrop: 'rgba(54, 48, 36, 0.4)'
  }
}
