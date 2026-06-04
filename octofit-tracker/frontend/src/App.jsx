import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">OctoFit Tracker</h1>
        <p className="text-muted">
          Frontend configured with React Router and Codespaces-aware API URLs.
          <br />
          The app uses the Codespaces base URL when <code>VITE_CODESPACE_NAME</code> is defined.
        </p>
      </header>

      <nav className="nav nav-pills mb-4 flex-wrap">
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/users" className="nav-link">
          Users
        </NavLink>
        <NavLink to="/teams" className="nav-link">
          Teams
        </NavLink>
        <NavLink to="/activities" className="nav-link">
          Activities
        </NavLink>
        <NavLink to="/workouts" className="nav-link">
          Workouts
        </NavLink>
        <NavLink to="/leaderboard" className="nav-link">
          Leaderboard
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="mb-4">
                <h2>Welcome</h2>
                <p>
                  This React presentation tier uses `react-router-dom` and environment-aware API URLs.
                  To use Codespaces mode, define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>.
                </p>
                <p>
                  If the Codespaces name is unset, the app falls back to{' '}
                  <code>http://localhost:8000</code>.
                </p>
              </section>
            </main>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
