export interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  muscles: string[];
  equipment?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkoutSet {
  id: string;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  restTime?: number; // in seconds
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  name: string;
  date: Date;
  duration: number; // in minutes
  exercises: WorkoutExercise[];
  notes?: string;
  caloriesBurned?: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: Date;
  achieved: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: 'male' | 'female' | 'other';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: Goal[];
}