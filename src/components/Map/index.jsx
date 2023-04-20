import { StyleSheet } from 'react-native'
import MapLibreGL from '@maplibre/maplibre-react-native'
import Constants from 'expo-constants'

import {
  useSpeedCameras,
  defaultZoom,
  defaultLng,
  defaultLat,
  icons,
  mapTilerStyleURL
} from './lib'

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null)

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch'
  }
})

export default function Map () {
  const speedCamerasData = useSpeedCameras(console.error)

  const speedCameraLayers = []
  for (const [key, layer] of Object.entries(speedCamerasData || {})) {
    speedCameraLayers.push(
      <MapLibreGL.ShapeSource id={key} shape={layer}>
        <MapLibreGL.SymbolLayer
          id={key}
          style={{
            iconImage: icons[key],
            iconSize: 0.75
          }}
        />
      </MapLibreGL.ShapeSource>
    )
  }

  return (
    <>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        attributionPosition={{ bottom: 8, left: 8 }}
        compassViewMargins={{ x: 16, y: Constants.statusBarHeight }}
        styleURL={mapTilerStyleURL}
      >
        <MapLibreGL.Camera
          minZoomLevel={2}
          zoomLevel={defaultZoom}
          centerCoordinate={[defaultLng, defaultLat]} />
        {speedCameraLayers}
      </MapLibreGL.MapView>
    </>
  )
}
