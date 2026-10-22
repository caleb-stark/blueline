export const NHL_TIME_ZONE = "America/New_York"

export function parseDate(value){
  if(typeof value !== "string"){
    return null
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if(!match){
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(Date.UTC(year, month - 1, day))

  if(parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day){
    return null
  }

  return parsed
}

export function isValidDateString(value){
  return parseDate(value) !== null
}

export function formatDate(value = new Date(), timeZone = NHL_TIME_ZONE){
  if(typeof value === "string"){
    if(!isValidDateString(value)){
      return null
    }

    return value
  }

  const date = value instanceof Date ? value : new Date(value)
  if(Number.isNaN(date.getTime())){
    return null
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year:"numeric",
    month:"2-digit",
    day:"2-digit"
  }).formatToParts(date)
  const values = {}

  for(const part of parts){
    if(part.type !== "literal"){
      values[part.type] = part.value
    }
  }

  return `${values.year}-${values.month}-${values.day}`
}

export function getCurrentNhlSeason(value = new Date()){
  const date = formatDate(value)
  if(!date){
    return null
  }

  const parsed = parseDate(date)
  const year = parsed.getUTCFullYear()
  const month = parsed.getUTCMonth() + 1

  if(month >= 10){
    return `${year}${year + 1}`
  }

  return `${year - 1}${year}`
}

export function shiftDate(value, days){
  const parsed = parseDate(value)

  if(!parsed || !Number.isInteger(days)){
    return null
  }

  parsed.setUTCDate(parsed.getUTCDate() + days)
  return formatDate(parsed, "UTC")
}

export function formatGameTime(value){
  if(typeof value !== "string"){
    return "Time unavailable"
  }

  const date = new Date(value)
  if(Number.isNaN(date.getTime())){
    return "Time unavailable"
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone:NHL_TIME_ZONE,
    hour:"numeric",
    minute:"2-digit"
  }).format(date)
}
