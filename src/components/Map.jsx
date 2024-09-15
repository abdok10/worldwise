import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesProvider'
import Button from './Button'
import { useGeolocation } from '../hooks/useGeoLocation'
import { useUrlPosition } from '../hooks/useUrlPosition'

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()
  const  { 
    isLoading: isLoadingPosition, 
    position: geoLocationPosition, 
    getPosition 
  } = useGeolocation()
  
  // const [searchParams, setSearchParams] = useSearchParams()
  const [ mapLat, mapLng ]  = useUrlPosition()
  
  useEffect(
    function() {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    } 
    ,[mapLat, mapLng]
  )

  useEffect(
    function() {
      if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    } 
    ,[geoLocationPosition]
  )
  
  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map} center={mapPosition} zoom={10} scrollWheelZoom={true}>
       
       {!geoLocationPosition && 
          <Button type='position' onClick={getPosition}>
            {isLoadingPosition ? 'Loading...' : 'use your position'}
          </Button>
        }
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => {
            return (
              <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                  <span>{city.emoji}</span>
                  <span>{city.cityName}</span>
                </Popup>
              </Marker>
            )
          })
        }
        <ChangeCenter position={mapPosition}/>
        <DetectClick />
      </MapContainer>

    </div>
  )
}

function ChangeCenter({position}) {
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => {
      // console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}