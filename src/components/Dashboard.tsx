import React, { useState, useEffect } from 'react';
import { mockWorkouts, mockUserProfile, mockExercises } from '../services/workoutService';
import WorkoutTimer from './WorkoutTimer';
import AIRecommendations from './AIRecommendations';
import type { WorkoutExercise, Workout } from '../models/workout';
import type { AIRecommendation } from '../services/fitnessAI';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [workoutCount, setWorkoutCount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [latestWorkout, setLatestWorkout] = useState<Workout | null>(null);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    // Calculate stats
    setWorkoutCount(mockWorkouts.length);
    setExerciseCount(mockExercises.length);
    
    const calories = mockWorkouts.reduce((sum, workout) => sum + (workout.caloriesBurned || 0), 0);
    setTotalCalories(calories);
    
    // Get latest workout
    if (mockWorkouts.length > 0) {
      const sorted = [...mockWorkouts].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setLatestWorkout(sorted[0]);
    }
  }, []);

  const handleSaveWorkout = (exercises: WorkoutExercise[]) => {
    // In a real app, this would save the workout to the backend
    console.log('Workout saved with exercises:', exercises);
    alert('Workout completed and saved!');
  };

  const handleApplyRecommendation = (recommendation: AIRecommendation) => {
    // Handle applying AI recommendations
    console.log('Applying recommendation:', recommendation);
    
    // For demo purposes, we'll just show an alert
    switch (recommendation.type) {
      case 'workout':
        alert(`Recommended workout: ${recommendation.data.name}\nDuration: ${recommendation.data.duration} minutes`);
        break;
      case 'exercise':
        alert(`Try this exercise: ${recommendation.title}\nReason: ${recommendation.data.reason}`);
        break;
      case 'goal':
        alert(`New goal suggestion: ${recommendation.data.title}\nTarget: ${recommendation.data.targetValue} ${recommendation.data.unit}`);
        break;
      default:
        alert(`Recommendation: ${recommendation.title}\n${recommendation.description}`);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="dashboard-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={() => setShowTimer(true)}
        >
          Start New Workout
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{workoutCount}</h3>
          <p>Workouts Completed</p>
        </div>
        
        <div className="stat-card">
          <h3>{totalCalories}</h3>
          <p>Calories Burned</p>
        </div>
        
        <div className="stat-card">
          <h3>{exerciseCount}</h3>
          <p>Exercises Available</p>
        </div>
        
        <div className="stat-card">
          <h3>{mockUserProfile.goals.filter(g => g.achieved).length}</h3>
          <p>Goals Achieved</p>
        </div>
      </div>
      
      <AIRecommendations onApplyRecommendation={handleApplyRecommendation} />
      
      <div className="dashboard-sections">
        <div className="section">
          <h3>Latest Workout</h3>
          {latestWorkout ? (
            <div className="latest-workout">
              <h4>{latestWorkout.name}</h4>
              <p>Date: {new Date(latestWorkout.date).toLocaleDateString()}</p>
              <p>Duration: {latestWorkout.duration} minutes</p>
              <p>Calories Burned: {latestWorkout.caloriesBurned}</p>
              <p>Exercises: {latestWorkout.exercises.length}</p>
            </div>
          ) : (
            <p>No workouts recorded yet.</p>
          )}
        </div>
        
        <div className="section">
          <h3>Your Goals</h3>
          <div className="goals-list">
            {mockUserProfile.goals.map(goal => (
              <div key={goal.id} className="goal-item">
                <h4>{goal.title}</h4>
                <p>{goal.description}</p>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                    ></div>
                  </div>
                  <p>{goal.currentValue} / {goal.targetValue} {goal.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showTimer && (
        <WorkoutTimer 
          onClose={() => setShowTimer(false)}
          onSave={handleSaveWorkout}
        />
      )}
    </div>
  );
};

export default Dashboard;