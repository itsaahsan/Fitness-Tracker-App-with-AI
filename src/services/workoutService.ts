import type { Workout, Exercise, UserProfile } from '../models/workout';

// Mock data for exercises
export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'Chest',
    description: 'A basic upper body exercise',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    difficulty: 'beginner'
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Legs',
    description: 'A compound lower body exercise',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'beginner'
  },
  {
    id: '3',
    name: 'Deadlifts',
    category: 'Back',
    description: 'A compound exercise for the entire posterior chain',
    muscles: ['Back', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell'],
    difficulty: 'intermediate'
  },
  {
    id: '4',
    name: 'Pull-ups',
    category: 'Back',
    description: 'An upper body pulling exercise',
    muscles: ['Back', 'Biceps'],
    equipment: ['Pull-up bar'],
    difficulty: 'intermediate'
  },
  {
    id: '5',
    name: 'Plank',
    category: 'Core',
    description: 'An isometric core strength exercise',
    muscles: ['Core', 'Shoulders', 'Glutes'],
    difficulty: 'beginner'
  },
  {
    id: '6',
    name: 'Bench Press',
    category: 'Chest',
    description: 'A upper body pressing exercise',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    equipment: ['Barbell', 'Bench'],
    difficulty: 'intermediate'
  }
];

// Mock data for workouts
export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Chest Day',
    date: new Date(2023, 5, 15),
    duration: 60,
    exercises: [
      {
        id: 'we1',
        exerciseId: '1',
        sets: [
          { id: 'set1', reps: 10, weight: 0 },
          { id: 'set2', reps: 12, weight: 0 },
          { id: 'set3', reps: 8, weight: 0 }
        ]
      },
      {
        id: 'we2',
        exerciseId: '6',
        sets: [
          { id: 'set4', reps: 8, weight: 60 },
          { id: 'set5', reps: 8, weight: 60 },
          { id: 'set6', reps: 6, weight: 60 }
        ]
      }
    ],
    caloriesBurned: 320
  },
  {
    id: '2',
    name: 'Leg Day',
    date: new Date(2023, 5, 17),
    duration: 75,
    exercises: [
      {
        id: 'we3',
        exerciseId: '2',
        sets: [
          { id: 'set7', reps: 12, weight: 40 },
          { id: 'set8', reps: 10, weight: 40 },
          { id: 'set9', reps: 8, weight: 40 }
        ]
      },
      {
        id: 'we4',
        exerciseId: '3',
        sets: [
          { id: 'set10', reps: 5, weight: 80 },
          { id: 'set11', reps: 5, weight: 80 },
          { id: 'set12', reps: 3, weight: 80 }
        ]
      }
    ],
    caloriesBurned: 450
  }
];

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: 'user1',
  name: 'Alex Johnson',
  age: 28,
  weight: 75,
  height: 180,
  gender: 'male',
  fitnessLevel: 'intermediate',
  goals: [
    {
      id: 'goal1',
      title: 'Lose weight',
      description: 'Lose 10kg in 3 months',
      targetValue: 10,
      currentValue: 3,
      unit: 'kg',
      deadline: new Date(2023, 8, 30),
      achieved: false
    },
    {
      id: 'goal2',
      title: 'Increase bench press',
      description: 'Bench press 100kg',
      targetValue: 100,
      currentValue: 60,
      unit: 'kg',
      deadline: new Date(2023, 11, 31),
      achieved: false
    }
  ]
};

// Service functions
export const getExercises = (): Promise<Exercise[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockExercises), 500);
  });
};

export const getWorkouts = (): Promise<Workout[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWorkouts), 500);
  });
};

export const getWorkoutById = (id: string): Promise<Workout | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const workout = mockWorkouts.find(w => w.id === id);
      resolve(workout);
    }, 500);
  });
};

export const createWorkout = (workout: Omit<Workout, 'id'>): Promise<Workout> => {
  return new Promise((resolve) => {
    const newWorkout: Workout = {
      ...workout,
      id: `workout${mockWorkouts.length + 1}`
    };
    mockWorkouts.push(newWorkout);
    setTimeout(() => resolve(newWorkout), 500);
  });
};

export const updateWorkout = (workout: Workout): Promise<Workout> => {
  return new Promise((resolve) => {
    const index = mockWorkouts.findIndex(w => w.id === workout.id);
    if (index !== -1) {
      mockWorkouts[index] = workout;
    }
    setTimeout(() => resolve(workout), 500);
  });
};

export const deleteWorkout = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const index = mockWorkouts.findIndex(w => w.id === id);
    if (index !== -1) {
      mockWorkouts.splice(index, 1);
    }
    setTimeout(() => resolve(), 500);
  });
};

export const getUserProfile = (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUserProfile), 500);
  });
};

export const updateUserProfile = (profile: UserProfile): Promise<UserProfile> => {
  return new Promise((resolve) => {
    // In a real app, this would update the user profile
    setTimeout(() => resolve(profile), 500);
  });
};