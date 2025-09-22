import React, { useState, useEffect } from 'react';
import { fitnessAI } from '../services/fitnessAI';
import { mockUserProfile, mockWorkouts } from '../services/workoutService';
import type { AIRecommendation } from '../services/fitnessAI';
import './AIRecommendations.css';

interface AIRecommendationsProps {
  onApplyRecommendation?: (recommendation: AIRecommendation) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ onApplyRecommendation }) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get personalized insights from AI
      const insights = await fitnessAI.getPersonalizedInsights(
        mockUserProfile,
        mockWorkouts
      );
      
      setRecommendations(insights);
    } catch (err) {
      console.error('Error loading AI recommendations:', err);
      setError('Failed to load personalized recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyRecommendation = (recommendation: AIRecommendation) => {
    if (onApplyRecommendation) {
      onApplyRecommendation(recommendation);
    }
    
    // Show confirmation
    alert(`Recommendation applied: ${recommendation.title}`);
  };

  if (loading) {
    return (
      <div className="ai-recommendations">
        <h3>AI Recommendations</h3>
        <div className="loading">Analyzing your fitness data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-recommendations">
        <h3>AI Recommendations</h3>
        <div className="error">{error}</div>
        <button className="btn btn-secondary" onClick={loadRecommendations}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="ai-recommendations">
      <div className="recommendations-header">
        <h3>AI Recommendations</h3>
        <button className="btn btn-secondary btn-small" onClick={loadRecommendations}>
          Refresh
        </button>
      </div>
      
      {recommendations.length === 0 ? (
        <p>No recommendations available at this time.</p>
      ) : (
        <div className="recommendations-list">
          {recommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="recommendation-card">
              <div className="recommendation-header">
                <h4>{rec.title}</h4>
                <span className="confidence" title="AI Confidence">
                  {rec.confidence}%
                </span>
              </div>
              <p className="recommendation-description">{rec.description}</p>
              <div className="recommendation-actions">
                <button 
                  className="btn btn-primary btn-small"
                  onClick={() => handleApplyRecommendation(rec)}
                >
                  Apply
                </button>
                <span className="recommendation-type">{rec.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="ai-powered">
        <span>🤖 AI-Powered Insights</span>
      </div>
    </div>
  );
};

export default AIRecommendations;