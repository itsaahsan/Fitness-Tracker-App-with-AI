import React, { useState } from 'react';
import type { Workout, WorkoutExercise, WorkoutSet } from '../models/workout';
import { mockExercises } from '../services/workoutService';
import { createWorkout } from '../services/workoutService';
import './CreateWorkout.css';

interface CreateWorkoutProps {
  onClose: () => void;
  onWorkoutCreated: (workout: Workout) => void;
}

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ onClose, onWorkoutCreated }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [currentSets, setCurrentSets] = useState<WorkoutSet[]>([{ id: 'set1', reps: 10 }]);

  const addExercise = () => {
    if (selectedExerciseId) {
      const newExercise: WorkoutExercise = {
        id: `we${Date.now()}`,
        exerciseId: selectedExerciseId,
        sets: [...currentSets]
      };
      setExercises([...exercises, newExercise]);
      setSelectedExerciseId('');
      setCurrentSets([{ id: 'set1', reps: 10 }]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || exercises.length === 0) {
      alert('Please provide a workout name and at least one exercise');
      return;
    }
    
    const workoutData: Omit<Workout, 'id'> = {
      name,
      date: new Date(date),
      duration,
      exercises,
      notes,
      caloriesBurned: Math.round(duration * 5) // Simple calculation
    };
    
    try {
      const newWorkout = await createWorkout(workoutData);
      onWorkoutCreated(newWorkout);
      onClose();
    } catch (error) {
      console.error('Error creating workout:', error);
      alert('Failed to create workout');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-workout-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Workout</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Workout Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Add Exercise</label>
            <div className="exercise-selector">
              <select
                value={selectedExerciseId}
                onChange={(e) => setSelectedExerciseId(e.target.value)}
              >
                <option value="">Select an exercise</option>
                {mockExercises.map(exercise => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
              
              {selectedExerciseId && (
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
                disabled={!selectedExerciseId}
              >
                Add Exercise
              </button>
            </div>
          </div>
          
          {exercises.length > 0 && (
            <div className="added-exercises">
              <h3>Added Exercises</h3>
              {exercises.map((workoutExercise) => {
                const exercise = mockExercises.find(e => e.id === workoutExercise.exerciseId);
                return (
                  <div key={workoutExercise.id} className="added-exercise">
                    <h4>{exercise?.name || 'Unknown Exercise'}</h4>
                    <ul>
                      {workoutExercise.sets.map((set, setIndex) => (
                        <li key={set.id}>
                          Set {setIndex + 1}: {set.reps} reps
                          {set.weight && ` - ${set.weight} kg`}
                          {set.duration && ` - ${set.duration} sec`}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkout;