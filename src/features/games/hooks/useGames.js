import { useCallback, useEffect, useState } from "react";
import { getSchedule } from "../api/gamesApi";

function useGames(date) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getSchedule(date);

      const gameWeek = data.gameWeek || [];
      const allGames = gameWeek.flatMap((day) => day.games || []);

      setGames(allGames);
    } catch (error) {
      setError(error.message);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  return {
    games,
    loading,
    error,
  };
}

export default useGames;
