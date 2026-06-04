import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const apiHost = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const workoutsUrl = `${apiHost}/api/workouts`;

  useEffect(() => {
    fetch(workoutsUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const results =
          Array.isArray(payload) ? payload : payload.results || payload.data || payload.items || [];
        setWorkouts(results);
      })
      .catch((err) => setError(err.message));
  }, [workoutsUrl]);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id ?? workout.id ?? JSON.stringify(workout)}>
                <td>{workout.title}</td>
                <td>{workout.duration}</td>
                <td>{workout.calories}</td>
                <td>{new Date(workout.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Workouts;
