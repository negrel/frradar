import { StyleSheet } from 'react-native'
import MapLibreGL from '@maplibre/maplibre-react-native'
import Constants from 'expo-constants'

import {
  propTypes,
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

Map.propTypes = propTypes
export default function Map ({ onDragStart, center }) {
  const speedCamerasData = useSpeedCameras(console.error)

  console.log(center)

  const speedCameraLayers = []
  for (const [key, layer] of Object.entries(speedCamerasData || {})) {
    speedCameraLayers.push(
      <MapLibreGL.ShapeSource key={key} id={key} shape={layer}>
        <MapLibreGL.SymbolLayer
          key={key}
          id={key}
          style={{
            iconImage: icons[key],
            iconSize: 0.75,
            iconAnchor: 'bottom'
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
        <MapLibreGL.UserLocation />
        <MapLibreGL.Camera
          minZoomLevel={2}
          zoomLevel={defaultZoom}
          centerCoordinate={center || [defaultLng, defaultLat]} />
        {speedCameraLayers}
      </MapLibreGL.MapView>
    </>
  )
}
