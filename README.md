# Interactive Quiz Platform

A modern, responsive quiz application built with React and Tailwind CSS featuring a beautiful glassmorphism design.

![Quiz Platform Screenshot](./screenshot.png)

## Features

### Core Functionality
- Multiple choice and integer-type questions
- Real-time score tracking
- Timer for each question (30 seconds)
- Progress tracking with visual progress bar
- Multiple attempts support
- Keyboard navigation (← →)
- Question history tracking

### User Experience
- Instant feedback on answers
- Correct/incorrect indicators
- Running score display
- Mobile-responsive design
- Glassmorphism UI effects
- Smooth transitions and animations
- Prevention of accidental navigation
- Loading states

### Technical Features
- Built with React + Vite
- Styled with Tailwind CSS
- Local storage using IndexedDB
- Error boundary implementation
- Context-based state management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vaasu02/Quiz-Platform.git
   cd quiz-platform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
4. Open your browser and visit: [http://localhost:5173](http://localhost:5173)

## Usage

1. Click "Start Quiz" on the home page
2. Answer each question within the 30-second time limit
3. Use the "Previous" and "Next" buttons or keyboard arrows to navigate
4. See your score and feedback immediately after each answer
5. View your attempt history in the History page

## Project Structure
```
quiz-platform/
├── src/
│   ├── components/   # Reusable components
│   ├── context/      # React context providers
│   ├── pages/        # Page components
│   ├── services/     # Database services
│   ├── data/         # Quiz questions data
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── public/          # Static assets
└── package.json     # Dependencies and scripts
```

## Technologies Used

- **React**: Frontend library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Navigation and routing
- **IndexedDB**: Local database storage
- **React Icons**: Icon components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Design inspiration from modern glassmorphism UI trends
- Quiz questions curated for educational purposes
