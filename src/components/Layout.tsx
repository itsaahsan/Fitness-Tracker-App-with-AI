import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <h1>Fitness Tracker</h1>
          <nav className="main-nav">
            <Link to="/">Dashboard</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/exercises">Exercises</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/ai-generator">AI Generator</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Fitness Tracker App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;