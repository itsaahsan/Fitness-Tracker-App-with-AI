import React, { useState, useEffect } from 'react';
import type { Exercise } from '../models/workout';
import { mockExercises, getExercises } from '../services/workoutService';
import './Exercises.css';

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await getExercises();
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
      setExercises(mockExercises); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(mockExercises.map(e => e.category)))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const openExerciseDetail = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const closeExerciseDetail = () => {
    setSelectedExercise(null);
  };

  if (loading) {
    return <div className="exercises">Loading exercises...</div>;
  }

  return (
    <div className="exercises">
      <h2>Exercise Library</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="exercises-grid">
        {filteredExercises.length === 0 ? (
          <p>No exercises found matching your criteria.</p>
        ) : (
          filteredExercises.map(exercise => (
            <div key={exercise.id} className="exercise-card">
              <h3>{exercise.name}</h3>
              <p className="exercise-category">{exercise.category}</p>
              <p>{exercise.description}</p>
              <div className="exercise-meta">
                <span className={`difficulty difficulty-${exercise.difficulty}`}>
                  {exercise.difficulty}
                </span>
                {exercise.equipment && exercise.equipment.length > 0 && (
                  <span className="equipment">
                    Equipment: {exercise.equipment.join(', ')}
                  </span>
                )}
              </div>
              <div className="exercise-muscles">
                <strong>Muscles:</strong> {exercise.muscles.join(', ')}
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => openExerciseDetail(exercise)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
      
      {selectedExercise && (
        <div className="modal-overlay" onClick={closeExerciseDetail}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedExercise.name}</h2>
              <button className="close-button" onClick={closeExerciseDetail}>×</button>
            </div>
            <div className="modal-body">
              <div className="exercise-detail-meta">
                <span className={`difficulty difficulty-${selectedExercise.difficulty}`}>
                  {selectedExercise.difficulty.charAt(0).toUpperCase() + selectedExercise.difficulty.slice(1)}
                </span>
                <span className="exercise-category">{selectedExercise.category}</span>
              </div>
              
              <p>{selectedExercise.description}</p>
              
              <div className="exercise-detail-section">
                <h3>Target Muscles</h3>
                <ul>
                  {selectedExercise.muscles.map((muscle, index) => (
                    <li key={index}>{muscle}</li>
                  ))}
                </ul>
              </div>
              
              {selectedExercise.equipment && selectedExercise.equipment.length > 0 && (
                <div className="exercise-detail-section">
                  <h3>Required Equipment</h3>
                  <ul>
                    {selectedExercise.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="exercise-detail-section">
                <h3>Instructions</h3>
                <p>Perform this exercise with proper form. Start with lighter weights and gradually increase as you become more comfortable with the movement.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeExerciseDetail}>Close</button>
              <button className="btn btn-primary">Add to Workout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;