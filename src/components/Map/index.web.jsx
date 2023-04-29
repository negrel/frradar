import { memo, useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import { propTypes, defaultLat, defaultLng, icons, mapTilerStyleURL, useSpeedCameras } from './lib'

const style = {
  flex: 1,
  alignSelf: 'stretch'
}

Map.propTypes = propTypes
function Map ({ onDragStart, center }) {
  const speedCamerasData = useSpeedCameras(console.error)

  const mapContainer = useRef(null)
  const map = useRef(null)
  // Default to center of France
  const [lng] = useState(defaultLng)
  const [lat] = useState(defaultLat)
  const [zoom] = useState(5)

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapTilerStyleURL,
        center: [lng, lat],
        zoom,
        attributionControl: false
      })
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
      map.current.addControl(new maplibregl.AttributionControl(), 'bottom-left')
      map.current.on('dragstart', onDragStart)
    }

    if (!speedCamerasData) return
    map.current.on('load', () => {
      for (const [key, layer] of Object.entries(speedCamerasData)) {
        map.current.loadImage(icons[key], (err, img) => {
          if (err) throw err

          // Clear image, source and layer
          if (map.current.getLayer(key)) map.current.removeLayer(key)
          if (map.current.getSource(key)) map.current.removeSource(key)
          if (map.current.hasImage(icons[key])) map.current.removeImage(icons[key])

          // Add image
          map.current.addImage(icons[key], img)

          // Add source
          map.current.addSource(key, {
            type: 'geojson',
            data: layer
          })

          // Add layer
          map.current.addLayer({
            id: key,
            type: 'symbol',
            source: key,
            layout: {
              'icon-image': icons[key],
              'icon-size': 0.75,
              'icon-anchor': 'bottom'
            }
          })
        })
      }
    })
  }, [lat, lng, zoom, speedCamerasData, onDragStart])

  if (center) {
    map.current.setCenter(center)
    map.current.zoomTo(18)
  }

  return (
    <div ref={mapContainer} className="map" style={style} />
  )
}

export default memo(Map)
