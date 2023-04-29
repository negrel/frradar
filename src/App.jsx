import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import Map from './components/Map/index'
import * as Location from 'expo-location'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class GeolocationStatus {
  status = 'unknown'
  location = null

  constructor () {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  get icon () {
    switch (this.status) {
      case 'unknown':
        return 'crosshairs-question'
      case 'known':
        return 'crosshairs'
      case 'known-and-focused':
        return 'crosshairs-gps'
      default:
        throw new Error(`unknown status "${this.status}"`)
    }
  }

  get iconColor () {
    switch (this.status) {
      case 'unknown':
        return 'red'
      case 'known':
      case 'known-and-focused':
        return 'black'
      default:
        throw new Error(`unknown status "${this.status}"`)
    }
  }

  async focus () {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      this.status = 'unknown'
      return
    } else if (this.status === 'unknown') {
      this.status = 'known'
    }

    const location = await Location.getCurrentPositionAsync({})
    if (location) {
      console.log(location)
      this.status = 'known-and-focused'
      this.location = [location.coords.longitude, location.coords.latitude]
    } else {
      this.location = null
    }
  }

  focusLost () {
    if (this.status === 'known-and-focused') {
      this.status = 'known'
    }
  }
}

const geolocationStatus = new GeolocationStatus()

export default observer(() => {
  const iconColor = geolocationStatus.iconColor

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Map
        center={geolocationStatus.location}
        onDragStart={geolocationStatus.focusLost} />
      <FAB
        icon={geolocationStatus.icon}
        style={styles.fab}
        color={iconColor}
        onPress={geolocationStatus.focus} />
    </View>
  )
})

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
