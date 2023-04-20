import { useState, useEffect } from 'react'

import secrets from '../../../secrets.json'
import iconFixes from '../../../assets/speed-cameras/fixes.png'
import iconFeux from '../../../assets/speed-cameras/feux.png'
import iconNiveaux from '../../../assets/speed-cameras/niveaux.png'
import iconTroncons from '../../../assets/speed-cameras/troncons.png'
import iconItineraire from '../../../assets/speed-cameras/itineraire.png'
import iconDiscriminants from '../../../assets/speed-cameras/discriminants.png'
import { Platform } from 'react-native'

export const mapTilerStyleURL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${secrets.MAP_TILER_APIKEY}`

export const defaultLat = 46.2192649
export const defaultLng = 2.0517
export const defaultZoom = 5

export const icons = {
  fixes: iconFixes,
  feux: iconFeux,
  niveaux: iconNiveaux,
  troncons: iconTroncons,
  itineraire: iconItineraire,
  discriminants: iconDiscriminants
}

const speedCamerasEndpoint = Platform.OS === 'web'
  ? 'http://localhost:8080/radars/all?_format=json'
  : 'http://radars.securite-routiere.gouv.fr/radars/all?_format=json'

export async function fetchSpeedCameras () {
  const response = await fetch(speedCamerasEndpoint)
  if (response.status !== 200) {
    throw Error(`failed to fetch speedCameras: ${response.statusText}`)
  }

  const speedCameras = await response.json()

  return { lastUpdate: response.headers.get('last-modified'), speedCameras }
}

export function speedCamerasToShapeSource (speedCameras = []) {
  const features = speedCameras.map((speedCamera) => ({
    type: 'Feature',
    id: speedCamera.id,
    properties: {
      icon: speedCamera.type,
      text: speedCamera.typeLabel
    },
    geometry: {
      type: 'Point',
      coordinates: [speedCamera.lng, speedCamera.lat]
    }
  }))

  return {
    type: 'FeatureCollection',
    features
  }
}

export function useSpeedCameras (errorHandler) {
  const [speedCamerasData, setSpeedCamerasData] = useState(null)

  useEffect(() => {
    fetchSpeedCameras().then(data =>
      setSpeedCamerasData({
        fixes: speedCamerasToShapeSource(data.speedCameras.filter(r => r.type === 'fixes')),
        feux: speedCamerasToShapeSource(data.speedCameras.filter(r => r.type === 'feux')),
        itineraire: speedCamerasToShapeSource(data.speedCameras.filter(r => r.type === 'itineraire')),
        niveaux: speedCamerasToShapeSource(data.speedCameras.filter(r => r.type === 'niveaux')),
        troncons: speedCamerasToShapeSource(data.speedCameras.filter(r => r.type === 'troncons')),
        discriminants: speedCamerasToShapeSource(data.speedCameras.filter(r => r.type === 'discriminants'))
      })
    ).catch(errorHandler)
  }, [errorHandler])

  return speedCamerasData
}
