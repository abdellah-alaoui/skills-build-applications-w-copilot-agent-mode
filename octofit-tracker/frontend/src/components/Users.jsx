import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const apiHost = import.meta.env.VITE_CODESPACE_NAME || 'http://localhost:8000';
  const usersUrl = `${apiHost}/-8000.app.github.dev/api/users`;

  useEffect(() => {
    fetch(usersUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const results =
          Array.isArray(payload) ? payload : payload.results || payload.data || payload.items || [];
        setUsers(results);
      })
      .catch((err) => setError(err.message));
  }, [usersUrl]);

  return (
    <section>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th>Calories</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.id ?? JSON.stringify(user)}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.team}</td>
                <td>{user.totalCalories ?? '—'}</td>
                <td>{user.totalDuration ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Users;
