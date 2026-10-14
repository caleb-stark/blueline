import { useEffect, useState } from "react"
import { getStandings } from "../api/standingsApi"

function useStandings(date = "now"){
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadStandings(){
      setLoading(true)
      setError(null)

      try{
        const data = await getStandings(date, { signal:controller.signal })
        let rows = []

        if(Array.isArray(data?.standings)){
          rows = data.standings
        }

        if(active){
          setStandings(rows)
          setLoading(false)
        }
      }catch(requestError){
        if(requestError?.name === "AbortError"){
          return
        }

        if(active){
          setStandings([])
          setError(requestError?.message || "Unable to load standings")
          setLoading(false)
        }
      }
    }

    loadStandings()

    return () => {
      active = false
      controller.abort()
    }
  }, [date])

  return { standings, loading, error }
}

export default useStandings
