import { getGameLanding, getGameBoxScore, getGamePlayByPlay } from "../api/gamesApi";

function useGameDetails(gameId) {
  const [landing, setLanding] = useState(null);
  const [boxScore, setBoxScore] = useState(null);
  const [playByPlay, setPlayByPlay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGame = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [landingData, boxScoreData, playByPlayData] = await Promise.all([
        getGameLanding(gameId),
        getGameBoxScore(gameId),
        getGamePlayByPlay(gameId),
      ]);

      setLanding(landingData);
      setBoxScore(boxScoreData);
      setPlayByPlay(playByPlayData);
    } catch (error) {
      setError(error.message);
      setLanding(null);
      setBoxScore(null);
      setPlayByPlay(null);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  return {
    landing,
    boxScore,
    playByPlay,
    loading,
    error,
  };
}
