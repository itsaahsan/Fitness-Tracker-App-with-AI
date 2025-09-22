import React, { useState } from 'react';
import './AIWorkoutGenerator.css';

interface WorkoutData {
  name: string;
  exercises: string[]; // exercise IDs
  duration: number;
  intensity: 'light' | 'moderate' | 'intense';
}

const AIWorkoutGenerator: React.FC = () => {
  const [workoutType, setWorkoutType] = useState<'strength' | 'cardio' | 'flexibility' | 'balanced'>('balanced');
  const [duration, setDuration] = useState<number>(45);
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'intense'>('moderate');
  const [generatedWorkout, setGeneratedWorkout] = useState<WorkoutData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateWorkout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would call the AI service with the parameters
      // For now, we'll simulate it with a mock
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock recommendation based on user inputs
      const mockRecommendation: WorkoutData = {
        name: `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Power Session`,
        exercises: ['1', '2', '3'], // This would be dynamically selected
        duration: duration,
        intensity: intensity
      };
      
      setGeneratedWorkout(mockRecommendation);
    } catch (err) {
      console.error('Error generating workout:', err);
      setError('Failed to generate workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = () => {
    if (generatedWorkout) {
      alert(`Workout "${generatedWorkout.name}" saved to your routine!`);
      // In a real app, this would save to the user's workout plan
    }
  };

  return (
    <div className="ai-workout-generator">
      <h2>AI Workout Generator</h2>
      <p>Generate personalized workouts based on your fitness level and goals</p>
      
      <div className="generator-form">
        <div className="form-group">
          <label>Workout Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="workoutType"
                value="strength"
                checked={workoutType === 'strength'}
                onChange={() => setWorkoutType('strength')}
              />
              Strength
            </label>
            <label>
              <input
                type="radio"
                name="workoutType"
                value="cardio"
                checked={workoutType === 'cardio'}
                onChange={() => setWorkoutType('cardio')}
              />
              Cardio
            </label>
            <label>
              <input
                type="radio"
                name="workoutType"
                value="flexibility"
                checked={workoutType === 'flexibility'}
                onChange={() => setWorkoutType('flexibility')}
              />
              Flexibility
            </label>
            <label>
              <input
                type="radio"
                name="workoutType"
                value="balanced"
                checked={workoutType === 'balanced'}
                onChange={() => setWorkoutType('balanced')}
              />
              Balanced
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            type="range"
            id="duration"
            min="15"
            max="120"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <span className="slider-value">{duration} min</span>
        </div>
        
        <div className="form-group">
          <label>Intensity</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="intensity"
                value="light"
                checked={intensity === 'light'}
                onChange={() => setIntensity('light')}
              />
              Light
            </label>
            <label>
              <input
                type="radio"
                name="intensity"
                value="moderate"
                checked={intensity === 'moderate'}
                onChange={() => setIntensity('moderate')}
              />
              Moderate
            </label>
            <label>
              <input
                type="radio"
                name="intensity"
                value="intense"
                checked={intensity === 'intense'}
                onChange={() => setIntensity('intense')}
              />
              Intense
            </label>
          </div>
        </div>
        
        <button 
          className="btn btn-primary btn-large"
          onClick={generateWorkout}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Workout'}
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {generatedWorkout && (
        <div className="generated-workout">
          <h3>{generatedWorkout.name}</h3>
          <p>A {generatedWorkout.intensity} intensity {workoutType} workout for {generatedWorkout.duration} minutes</p>
          
          <div className="workout-details">
            <div className="detail-card">
              <h4>Duration</h4>
              <p>{generatedWorkout.duration} minutes</p>
            </div>
            
            <div className="detail-card">
              <h4>Intensity</h4>
              <p className={`intensity-${generatedWorkout.intensity}`}>
                {generatedWorkout.intensity}
              </p>
            </div>
            
            <div className="detail-card">
              <h4>Exercises</h4>
              <p>{generatedWorkout.exercises.length} exercises</p>
            </div>
          </div>
          
          <div className="workout-actions">
            <button className="btn btn-primary" onClick={saveWorkout}>
              Save to My Workouts
            </button>
            <button className="btn btn-secondary" onClick={() => setGeneratedWorkout(null)}>
              Generate Another
            </button>
          </div>
        </div>
      )}
      
      <div className="ai-powered">
        <span>🤖 AI-Powered Generation</span>
      </div>
    </div>
  );
};

export default AIWorkoutGenerator;