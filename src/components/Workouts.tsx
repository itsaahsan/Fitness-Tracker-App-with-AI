import React, { useState, useEffect } from 'react';
import type { Workout } from '../models/workout';
import { mockWorkouts, mockExercises, getWorkouts, deleteWorkout } from '../services/workoutService';
import CreateWorkout from './CreateWorkout';
import './Workouts.css';

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Error loading workouts:', error);
      setWorkouts(mockWorkouts); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(id);
        loadWorkouts();
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  const openWorkoutDetail = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const closeWorkoutDetail = () => {
    setSelectedWorkout(null);
  };

  const handleWorkoutCreated = (workout: Workout) => {
    setWorkouts([workout, ...workouts]);
  };

  if (loading) {
    return <div className="workouts">Loading workouts...</div>;
  }

  return (
    <div className="workouts">
      <div className="workouts-header">
        <h2>Workouts</h2>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          Add New Workout
        </button>
      </div>
      
      {workouts.length === 0 ? (
        <p>No workouts found. Create your first workout!</p>
      ) : (
        <div className="workouts-grid">
          {workouts.map(workout => (
            <div key={workout.id} className="workout-card">
              <h3>{workout.name}</h3>
              <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Exercises:</strong> {workout.exercises.length}</p>
              {workout.caloriesBurned && (
                <p><strong>Calories:</strong> {workout.caloriesBurned}</p>
              )}
              <div className="workout-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => openWorkoutDetail(workout)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(workout.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showCreateModal && (
        <CreateWorkout 
          onClose={() => setShowCreateModal(false)}
          onWorkoutCreated={handleWorkoutCreated}
        />
      )}
      
      {selectedWorkout && (
        <div className="modal-overlay" onClick={closeWorkoutDetail}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedWorkout.name} Details</h2>
              <button className="close-button" onClick={closeWorkoutDetail}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Date:</strong> {new Date(selectedWorkout.date).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {selectedWorkout.duration} minutes</p>
              <p><strong>Calories Burned:</strong> {selectedWorkout.caloriesBurned || 'N/A'}</p>
              
              <h3>Exercises</h3>
              <div className="exercises-list">
                {selectedWorkout.exercises.map((workoutExercise) => {
                  const exercise = mockExercises.find((e: any) => e.id === workoutExercise.exerciseId);
                  return (
                    <div key={workoutExercise.id} className="exercise-item">
                      <h4>{exercise?.name || 'Unknown Exercise'}</h4>
                      <div className="sets">
                        {workoutExercise.sets.map((set, setIndex) => (
                          <div key={set.id} className="set">
                            <span>Set {setIndex + 1}:</span>
                            <span>{set.reps} reps</span>
                            {set.weight && <span>{set.weight} kg</span>}
                            {set.duration && <span>{set.duration} sec</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {selectedWorkout.notes && (
                <div className="workout-notes">
                  <h3>Notes</h3>
                  <p>{selectedWorkout.notes}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeWorkoutDetail}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;