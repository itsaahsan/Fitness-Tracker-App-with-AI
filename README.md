# Fitness Tracker App with AI

A comprehensive fitness tracking application enhanced with AI-powered features to provide personalized workout recommendations, exercise suggestions, and intelligent goal setting.

## Features

### Core Functionality
- **Workout Tracking**: Create, manage, and track your workouts with detailed exercise logging
- **Exercise Library**: Browse and search through a comprehensive database of exercises
- **Progress Monitoring**: Visualize your fitness journey with charts and statistics
- **Goal Management**: Set and track fitness goals with progress indicators
- **User Profiles**: Personalize your experience with user-specific settings

### AI-Powered Features
- **Intelligent Workout Recommendations**: Get personalized workout suggestions based on your fitness level and history
- **Exercise Suggestions**: Discover new exercises to add variety to your routine
- **Smart Goal Setting**: Receive AI-driven goal recommendations tailored to your progress
- **Performance Insights**: Get insights on workout intensity and recovery needs
- **AI Workout Generator**: Create custom workouts based on your preferences and goals

## Tech Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: CSS Modules and modern CSS features
- **Routing**: React Router for navigation
- **State Management**: React hooks and context API
- **AI Integration**: Custom AI service for intelligent recommendations

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itsaahsan/Fitness-Tracker-App-with-AI.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Fitness-Tracker-App-with-AI
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # React components
├── models/           # TypeScript interfaces and types
├── services/         # API services and business logic
├── assets/           # Static assets
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## AI Features Implementation

The AI features are implemented through a custom service (`src/services/fitnessAI.ts`) that provides:
- Workout recommendations based on user profile and history
- Exercise suggestions to prevent routine stagnation
- Goal recommendations tailored to user progress
- Intensity adjustments based on performance analysis

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Vite
- AI features implemented with custom algorithms
- UI components designed for optimal user experience