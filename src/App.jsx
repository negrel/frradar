import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { Map } from './components/Map/index'

export default function App () {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Map />
      <FAB
        icon="crosshairs-question"
        style={styles.fab}
        onPress={() => {}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 99
  }
})
