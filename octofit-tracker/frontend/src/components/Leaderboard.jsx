import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const apiHost = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const leaderboardUrl = `${apiHost}/api/leaderboard`;

  useEffect(() => {
    fetch(leaderboardUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload.results || payload.data || payload.items || [];
        if (data.length > 0 && Array.isArray(data[0].entries)) {
          setEntries(data[0].entries);
        } else {
          setEntries(data);
        }
      })
      .catch((err) => setError(err.message));
  }, [leaderboardUrl]);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.user}-${entry.rank}`}>
                <td>{entry.rank}</td>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaderboard;
