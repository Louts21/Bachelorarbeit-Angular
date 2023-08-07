import axios from 'axios'

//--Variables--------------------------------------------------------------------------------------------------------------------------------------------

//--Methods----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Fetchs an address due to latitude and longitude
 * @param {string} lat
 * @param {string} lon
 * @returns JSON file
 */
const nominatimReverse = async (lat: string, lon: string) => {
  const url = new URL('https://nominatim.openstreetmap.org/reverse')
  const { data } = await axios.get(url.href + `?lat=${lat}&lon=${lon}&format=json`)
  return data
}

/**
 * Fetchs longitude and latitude due to an address
 * @param {string} streetname required
 * @param {string} housenumber required
 * @param {string} city required
 * @param {string} county
 * @param {string} state
 * @param {string} country
 * @param {string} postalcode
 * @returns JSON file
 */
const nominatim = async (streetname: string, housenumber: string, city: string, county?: string, state?: string, country?: string, postalcode?: string) => {
  const url = new URL('https://nominatim.openstreetmap.org/search?')

  if (housenumber && streetname && city) {
    url.href += `street=${housenumber} ${streetname}&city=${city}`
    if (county) {
      url.href += `&county=${county}`
    }
    if (state) {
      url.href += `&state=${state}`
    }
    if (country) {
      url.href += `&country=${country}`
    }
    if (postalcode) {
      url.href += `&postalcode=${postalcode}`
    }
  } else {
    console.log('Streetname, housenumber and city is required!!!')
    return
  }

  const { data } = await axios.get(url.href + `&format=json`)
  return data
}

/**
 * Fetchs data of a given URL
 * @param {URL} givenUrl string and required
 * @returns JSON file
 */
const getDataOfGivenURL = async (givenUrl?: URL) => {
  let url = null;
  if (givenUrl != null) {
    try {
      url = new URL(givenUrl)
    } catch(e) {
      console.log(e);
    }
  
    if (url) {
      try {
        const { data } = await axios.get(url.href)
        return data
      } catch(e) {
        alert("Could not find DB-URL")
      }
    }
  }
  return {}
}

//--Handler----------------------------------------------------------------------------------------------------------------------------------------------

//--Export-----------------------------------------------------------------------------------------------------------------------------------------------

export { nominatimReverse, nominatim, getDataOfGivenURL }
