import React, { useState, useEffect } from 'react';
import type { UserProfile, Goal } from '../models/workout';
import { mockUserProfile, updateUserProfile } from '../services/workoutService';
import './Profile.css';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockUserProfile);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetValue: 0, unit: '' });

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    try {
      const updatedProfile = await updateUserProfile(editedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    }));
  };

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: name === 'targetValue' ? Number(value) : value
    }));
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.targetValue > 0) {
      const goal: Goal = {
        id: `goal${profile.goals.length + 1}`,
        title: newGoal.title,
        description: newGoal.description,
        targetValue: newGoal.targetValue,
        currentValue: 0,
        unit: newGoal.unit,
        achieved: false
      };
      
      setEditedProfile(prev => ({
        ...prev,
        goals: [...prev.goals, goal]
      }));
      
      setNewGoal({ title: '', description: '', targetValue: 0, unit: '' });
    }
  };

  const removeGoal = (id: string) => {
    setEditedProfile(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id)
    }));
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">👤</div>
          </div>
          <div className="profile-info">
            <h3>{profile.name}</h3>
            <p>Fitness Level: {profile.fitnessLevel.charAt(0).toUpperCase() + profile.fitnessLevel.slice(1)}</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        
        {isEditing ? (
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={editedProfile.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={editedProfile.weight}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={editedProfile.height}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={editedProfile.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="fitnessLevel">Fitness Level</label>
              <select
                id="fitnessLevel"
                name="fitnessLevel"
                value={editedProfile.fitnessLevel}
                onChange={handleInputChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Age:</span>
              <span>{profile.age} years</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Weight:</span>
              <span>{profile.weight} kg</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Height:</span>
              <span>{profile.height} cm</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Gender:</span>
              <span>{profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="goals-section">
        <h3>Goals</h3>
        
        <div className="goals-form">
          <h4>Add New Goal</h4>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="goalTitle">Title</label>
              <input
                type="text"
                id="goalTitle"
                name="title"
                value={newGoal.title}
                onChange={handleGoalInputChange}
                placeholder="e.g., Lose 10kg"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="goalDescription">Description</label>
              <input
                type="text"
                id="goalDescription"
                name="description"
                value={newGoal.description}
                onChange={handleGoalInputChange}
                placeholder="e.g., Lose 10kg in 3 months"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="goalTarget">Target Value</label>
              <input
                type="number"
                id="goalTarget"
                name="targetValue"
                value={newGoal.targetValue}
                onChange={handleGoalInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="goalUnit">Unit</label>
              <input
                type="text"
                id="goalUnit"
                name="unit"
                value={newGoal.unit}
                onChange={handleGoalInputChange}
                placeholder="e.g., kg, minutes"
              />
            </div>
          </div>
          
          <button className="btn btn-primary" onClick={addGoal}>Add Goal</button>
        </div>
        
        <div className="goals-list">
          {profile.goals.map(goal => (
            <div key={goal.id} className="goal-item">
              <div className="goal-info">
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
                <p className="goal-deadline">
                  Deadline: {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'No deadline'}
                </p>
              </div>
              <div className="goal-actions">
                <button 
                  className="btn btn-danger"
                  onClick={() => removeGoal(goal.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;