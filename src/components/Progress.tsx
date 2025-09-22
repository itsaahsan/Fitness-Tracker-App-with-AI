import React, { useState, useEffect } from 'react';
import type { Workout } from '../models/workout';
import { mockWorkouts } from '../services/workoutService';
import './Progress.css';

// Simple chart component since we can't install external libraries
const BarChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="chart-container">
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-container">
            <div 
              className="bar" 
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            ></div>
            <div className="bar-label">{item.label}</div>
            <div className="bar-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Progress: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    setWorkouts(mockWorkouts);
    updateChartData();
  }, [timeRange]);

  const updateChartData = () => {
    // Generate mock data for chart based on time range
    let data: { label: string; value: number }[] = [];
    
    switch (timeRange) {
      case 'week':
        data = [
          { label: 'Mon', value: 420 },
          { label: 'Tue', value: 380 },
          { label: 'Wed', value: 510 },
          { label: 'Thu', value: 290 },
          { label: 'Fri', value: 450 },
          { label: 'Sat', value: 620 },
          { label: 'Sun', value: 0 }
        ];
        break;
      case 'month':
        data = [
          { label: 'Week 1', value: 1800 },
          { label: 'Week 2', value: 2100 },
          { label: 'Week 3', value: 1950 },
          { label: 'Week 4', value: 2300 }
        ];
        break;
      case 'year':
        data = [
          { label: 'Jan', value: 8200 },
          { label: 'Feb', value: 7800 },
          { label: 'Mar', value: 9100 },
          { label: 'Apr', value: 8500 }
        ];
        break;
      default:
        data = [];
    }
    
    setChartData(data);
  };

  // Calculate stats
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, workout) => sum + (workout.caloriesBurned || 0), 0);
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  
  const lastWorkout = workouts.length > 0 
    ? [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;

  return (
    <div className="progress">
      <h2>Progress Tracking</h2>
      
      <div className="progress-filters">
        <div className="filter-group">
          <label>Time Range:</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalWorkouts}</h3>
          <p>Workouts</p>
        </div>
        
        <div className="stat-card">
          <h3>{totalDuration}</h3>
          <p>Minutes</p>
        </div>
        
        <div className="stat-card">
          <h3>{totalCalories}</h3>
          <p>Calories Burned</p>
        </div>
        
        <div className="stat-card">
          <h3>{lastWorkout ? new Date(lastWorkout.date).toLocaleDateString() : 'N/A'}</h3>
          <p>Last Workout</p>
        </div>
      </div>
      
      <div className="chart-section">
        <h3>Calories Burned</h3>
        <BarChart data={chartData} />
      </div>
      
      <div className="achievements">
        <h3>Recent Achievements</h3>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">🔥</div>
            <h4>First Workout</h4>
            <p>Completed your first workout</p>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-icon">💪</div>
            <h4>Week Warrior</h4>
            <p>Worked out 5 days in a week</p>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-icon">🏆</div>
            <h4>Calorie Crusher</h4>
            <p>Burned 2000+ calories in a week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;