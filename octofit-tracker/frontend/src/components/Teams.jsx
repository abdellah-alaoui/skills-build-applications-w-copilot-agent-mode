import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const apiHost = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const teamsUrl = `${apiHost}/api/teams`;

  useEffect(() => {
    fetch(teamsUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const results =
          Array.isArray(payload) ? payload : payload.results || payload.data || payload.items || [];
        setTeams(results);
      })
      .catch((err) => setError(err.message));
  }, [teamsUrl]);

  return (
    <section>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.id ?? JSON.stringify(team)}>
                <td>{team.name}</td>
                <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
                <td>{team.score ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Teams;
