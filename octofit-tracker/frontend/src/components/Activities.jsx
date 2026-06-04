import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const apiHost = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const activitiesUrl = `${apiHost}/api/activities`;

  useEffect(() => {
    fetch(activitiesUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const results =
          Array.isArray(payload) ? payload : payload.results || payload.data || payload.items || [];
        setActivities(results);
      })
      .catch((err) => setError(err.message));
  }, [activitiesUrl]);

  return (
    <section>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? activity.id ?? JSON.stringify(activity)}>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories}</td>
                <td>{new Date(activity.date).toLocaleString()}</td>
                <td>{activity.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;
