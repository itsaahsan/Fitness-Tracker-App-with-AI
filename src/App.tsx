import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Exercises from './components/Exercises';
import Progress from './components/Progress';
import Profile from './components/Profile';
import AIWorkoutGenerator from './components/AIWorkoutGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ai-generator" element={<AIWorkoutGenerator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;