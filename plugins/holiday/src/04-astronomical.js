import spacetime from 'spacetime'
import calcSeasons from './lib/seasons.js'
import holidays from './holidays/astro-holidays.js'

const astroDates = function (str, normal, year, tz) {
  if (holidays.hasOwnProperty(str) || holidays.hasOwnProperty(normal)) {
    let season = holidays[str] || holidays[normal]
    let seasons = calcSeasons(year)
    if (!season || !seasons || !seasons[season]) {
      return null // couldn't figure it out
    }
    let s = spacetime(seasons[season], tz)
    if (s.isValid()) {
      return s
    }
  }

  return null
}
export default astroDates
