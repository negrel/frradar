import { registerRootComponent } from 'expo'
import { useColorScheme } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'

import { lightTheme, darkTheme } from './src/theme'
import App from './src/App'

function Main () {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'light' ? lightTheme : darkTheme

  return (
    <>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </>
  )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main)
