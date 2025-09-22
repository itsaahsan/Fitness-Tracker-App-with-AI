import React, { useState, useEffect, useRef } from 'react';
import type { WorkoutExercise, WorkoutSet } from '../models/workout';
import { mockExercises } from '../services/workoutService';
import './WorkoutTimer.css';

interface WorkoutTimerProps {
  onClose: () => void;
  onSave: (exercises: WorkoutExercise[]) => void;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ onClose, onSave }) => {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [currentExerciseId, setCurrentExerciseId] = useState('');
  const [currentSets, setCurrentSets] = useState<WorkoutSet[]>([]);
  const [activeSetIndex, setActiveSetIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const restIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (restIntervalRef.current) {
        clearInterval(restIntervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (isResting && restTime > 0) {
      restIntervalRef.current = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restIntervalRef.current) {
      clearInterval(restIntervalRef.current);
    }

    return () => {
      if (restIntervalRef.current) {
        clearInterval(restIntervalRef.current);
      }
    };
  }, [isResting, restTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startWorkout = () => {
    setIsRunning(true);
  };

  const pauseWorkout = () => {
    setIsRunning(false);
  };

  const resetWorkout = () => {
    setIsRunning(false);
    setTimer(0);
    setExercises([]);
    setCurrentExerciseId('');
    setCurrentSets([]);
    setActiveSetIndex(null);
  };

  const addExercise = () => {
    if (currentExerciseId && currentSets.length > 0) {
      const newExercise: WorkoutExercise = {
        id: `we${Date.now()}`,
        exerciseId: currentExerciseId,
        sets: [...currentSets]
      };
      setExercises([...exercises, newExercise]);
      setCurrentExerciseId('');
      setCurrentSets([]);
      setActiveSetIndex(null);
    }
  };

  const addSet = () => {
    const newSet: WorkoutSet = {
      id: `set${Date.now()}`,
      reps: 10
    };
    setCurrentSets([...currentSets, newSet]);
  };

  const updateSet = (index: number, field: keyof WorkoutSet, value: any) => {
    const updatedSets = [...currentSets];
    updatedSets[index] = { ...updatedSets[index], [field]: value };
    setCurrentSets(updatedSets);
  };

  const removeSet = (index: number) => {
    if (currentSets.length > 1) {
      const updatedSets = [...currentSets];
      updatedSets.splice(index, 1);
      setCurrentSets(updatedSets);
    }
  };

  const startSet = (index: number) => {
    setActiveSetIndex(index);
    setIsRunning(true);
  };

  const completeSet = (index: number) => {
    if (activeSetIndex === index) {
      setIsRunning(false);
      setActiveSetIndex(null);
      
      // Start rest timer if not the last set
      if (currentSets[index]?.restTime) {
        setRestTime(currentSets[index].restTime || 60);
        setIsResting(true);
      }
    }
  };

  const saveWorkout = () => {
    onSave(exercises);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content workout-timer-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Workout Timer</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="workout-timer-content">
          <div className="timer-display">
            <div className="timer-main">
              {isResting ? (
                <div className="rest-timer">
                  <h3>Rest Time</h3>
                  <div className="time">{formatTime(restTime)}</div>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setIsResting(false)}
                  >
                    Skip Rest
                  </button>
                </div>
              ) : (
                <>
                  <div className="time">{formatTime(timer)}</div>
                  <div className="timer-controls">
                    {!isRunning ? (
                      <button className="btn btn-primary" onClick={startWorkout}>
                        Start Workout
                      </button>
                    ) : (
                      <button className="btn btn-secondary" onClick={pauseWorkout}>
                        Pause
                      </button>
                    )}
                    <button className="btn btn-danger" onClick={resetWorkout}>
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="workout-builder">
            <h3>Add Exercise</h3>
            <div className="form-group">
              <select
                value={currentExerciseId}
                onChange={(e) => setCurrentExerciseId(e.target.value)}
              >
                <option value="">Select an exercise</option>
                {mockExercises.map(exercise => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>
            
            {currentExerciseId && (
              <div className="sets-builder">
                <h4>Sets</h4>
                {currentSets.map((set, index) => (
                  <div key={set.id} className="set-row">
                    <span>Set {index + 1}:</span>
                    <input
                      type="number"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(e) => updateSet(index, 'reps', Number(e.target.value))}
                      min="1"
                    />
                    <input
                      type="number"
                      placeholder="Weight (kg)"
                      value={set.weight || ''}
                      onChange={(e) => updateSet(index, 'weight', Number(e.target.value) || undefined)}
                      min="0"
                      step="0.5"
                    />
                    <input
                      type="number"
                      placeholder="Rest (sec)"
                      value={set.restTime || ''}
                      onChange={(e) => updateSet(index, 'restTime', Number(e.target.value) || undefined)}
                      min="0"
                    />
                    {activeSetIndex === index ? (
                      <button 
                        type="button" 
                        className="btn btn-success"
                        onClick={() => completeSet(index)}
                      >
                        Complete
                      </button>
                    ) : (
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => startSet(index)}
                      >
                        Start
                      </button>
                    )}
                    <button 
                      type="button" 
                      className="btn btn-danger btn-small"
                      onClick={() => removeSet(index)}
                      disabled={currentSets.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={addSet}
                >
                  Add Set
                </button>
              </div>
            )}
            
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={addExercise}
              disabled={!currentExerciseId || currentSets.length === 0}
            >
              Add Exercise to Workout
            </button>
          </div>
          
          <div className="current-workout">
            <h3>Current Workout</h3>
            {exercises.length === 0 ? (
              <p>No exercises added yet</p>
            ) : (
              <div className="exercises-list">
                {exercises.map((workoutExercise) => {
                  const exercise = mockExercises.find(e => e.id === workoutExercise.exerciseId);
                  return (
                    <div key={workoutExercise.id} className="exercise-item">
                      <h4>{exercise?.name || 'Unknown Exercise'}</h4>
                      <ul>
                        {workoutExercise.sets.map((set, setIndex) => (
                          <li key={set.id}>
                            Set {setIndex + 1}: {set.reps} reps
                            {set.weight && ` - ${set.weight} kg`}
                            {set.restTime && ` - Rest: ${set.restTime} sec`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={saveWorkout}
            disabled={exercises.length === 0}
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;