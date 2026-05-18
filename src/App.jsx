import { useEffect, useState } from "react";
import { getNhlSchedule, getNhlScores } from "./utils/api";

function App() {
  const [schedule, setSchedule] = useState(null);
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const scheduleData = await getNhlSchedule();
        const scoresData = await getNhlScores();
        setSchedule(scheduleData);
        setScores(scoresData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <p>Loading BlueLine...</p>;
  }

  return (
    <main>
      <h1>BlueLine</h1>
      <p>NHL stats and betting probability dashboard.</p>

      {error && <p>Error: {error}</p>}

      <section>
        <h2>Today's Games</h2>

        {schedule?.gameWeek?.[0]?.games?.map((game) => (
          <div key={game.id}>
            <p>
              {game.awayTeam.abbrev} @ {game.homeTeam.abbrev}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2>Scores</h2>

        {scores?.games?.map((game) => (
          <div key={game.id}>
            <p>
              {game.awayTeam.abbrev.default} {game.awayTeam.score} -{" "}
              {game.homeTeam.score} {game.homeTeam.abbrev.default}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
