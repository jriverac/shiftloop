# ShiftLoop: On-Call Schedule & Analytics Tool - React Version

ShiftLoop is a modern, interactive React-based web application for visualizing and managing on-call schedules for teams. It features a GitHub-style tracking chart, team management, and statistical analysis of weekend call distribution with a responsive Bootstrap 5 interface.

## Features

- **Responsive GitHub-style Chart**: Visualize the annual or 12-month on-call schedule, with each day color-coded by team member.
- **Component-Based Architecture**: Separate React components for Tracker, Graph, and main App functionality
- **Team Management**: Add, remove, reorder team members with up/down buttons; assign custom colors.
- **Flexible Controls**:
  - Toggle between "Next 12 Months" and "Specific Start Date" modes
  - Set shift length and include/exclude Fridays
- **Statistical Analysis**:
  - D3.js-powered standard deviation chart (bell curve) of weekend call days per person
  - Real-time statistics showing each member's weekend call days, mean, and standard deviation
- **Modern UI**: Bootstrap 5 responsive design with cards, forms, and utility classes
- **LocalStorage Persistence**: All settings and team data are saved in your browser

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

### Build for Production

```bash
npm run build
```

## Usage

1. Add team members using the input field and "Add" button
2. Customize team member colors using the color picker
3. Adjust controls (date range, shift length, Friday inclusion) as needed
4. View the schedule chart and bell curve analysis
5. Use up/down arrows to reorder team members; remove or rename as needed

## Project Structure

```
src/
├── components/
│   ├── Tracker.js          # GitHub-style calendar component
│   ├── Tracker.css         # Calendar styling
│   ├── Graph.js            # D3.js bell curve component
│   └── Graph.css           # Graph styling
├── App.js                  # Main application component
├── App.css                 # Application styles
├── index.js                # React entry point
├── index.css               # Global styles
public/
├── index.html              # HTML template
package.json                # Dependencies and scripts
```

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Bootstrap 5**: Responsive UI framework with utility classes
- **D3.js v7**: Data visualization for statistical charts
- **CSS Grid**: Modern layout for calendar visualization
- **localStorage**: Client-side data persistence

## Components

### Tracker Component
- Displays annual or 12-month rolling call schedule
- GitHub-style calendar grid with tooltips
- Color-coded by team member assignments
- Responsive month headers and day labels

### Graph Component  
- D3.js-powered bell curve visualization
- Shows probability distribution of weekend call days
- Interactive legend with team member colors
- Responsive SVG graphics

### App Component
- Main application state management using React hooks
- Team member CRUD operations
- Schedule configuration controls
- localStorage persistence
- Bootstrap 5 UI layout

## Migration from HTML Version

This React version maintains all functionality from the original HTML version while adding:
- ✅ Component-based architecture for better maintainability
- ✅ Modern React hooks for state management
- ✅ Bootstrap 5 responsive design system
- ✅ Improved D3.js integration with React lifecycle
- ✅ Enhanced mobile responsiveness
- ✅ Better code organization and separation of concerns

## License

MIT License. Free for personal and commercial use.

## Author

Created by jrivera. Contributions welcome!
