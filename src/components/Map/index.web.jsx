import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import { defaultLat, defaultLng, mapTilerStyleURL } from './lib'

const style = {
  flex: 1,
  alignSelf: 'stretch'
}

export function Map () {
  const mapContainer = useRef(null)
  const map = useRef(null)
  // Default to center of France
  const [lng] = useState(defaultLng)
  const [lat] = useState(defaultLat)
  const [zoom] = useState(5)

  useEffect(() => {
    if (map.current) return // stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapTilerStyleURL,
      center: [lng, lat],
      zoom,
      attributionControl: false
    })
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.current.addControl(new maplibregl.AttributionControl(), 'bottom-left')
  })

  return (
    <div ref={mapContainer} className="map" style={style}/>
  )
}
