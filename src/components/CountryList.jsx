import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'

import { useCities } from '../contexts/CitiesProvider'; 

export default function CountryList() {
  const { cities, isLoading } = useCities()

    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message='Add your first city by clicking on a city on the map'/>

    const filteredCountries = []
    const countries = cities.filter(city => !filteredCountries.includes(city.country))
  
    // REVIEW -  more efficient in terms of large datasets and avoids the creation of temporary arrays. However, it's more complex and may be overkill for smaller lists
    // const country = cities.reduce((arr, city) => {
    //     if (!arr.map(el => el.country).includes(city.country)) {
    //       return [...arr, { country: city.country, emoji: city.emoji}]
    //     }
    //     else return arr;
    // }, [])

    return (
    <ul className={styles.countryList}>
        {countries.map(country => <CountryItem country={country} key={country.id}/>)}
    </ul>
  )
}
 