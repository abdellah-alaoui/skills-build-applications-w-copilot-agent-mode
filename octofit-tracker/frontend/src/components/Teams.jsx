import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

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
