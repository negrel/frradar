import { StyleSheet } from 'react-native'
import MapLibreGL from '@maplibre/maplibre-react-native'
import Constants from 'expo-constants'
import { defaultLat, defaultLng, defaultZoom, mapTilerStyleURL } from './lib'

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null)

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch'
  }
})

export function Map () {
  return (
    <>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        attributionPosition={{ bottom: 8, right: 8 }}
        compassViewMargins={{ x: 16, y: Constants.statusBarHeight }}
        styleURL={mapTilerStyleURL}
      >
        <MapLibreGL.Camera
          minZoomLevel={2}
          zoomLevel={defaultZoom}
          centerCoordinate={[defaultLng, defaultLat]} />
      </MapLibreGL.MapView>
    </>
  )
}
