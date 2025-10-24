# ShiftLoop - On-Call Schedule & Analytics Tool

## Project Overview

ShiftLoop is a React-based web application designed for visualizing, managing, and analyzing on-call schedules for teams. It provides an intuitive interface for distributing weekend call responsibilities and ensures fair workload distribution using statistical analysis.

### Key Features
- **GitHub-style calendar visualization** showing 53 weeks of on-call assignments
- **Statistical analysis** with bell curve distribution and fairness metrics
- **Team management** with customizable colors and inline editing
- **Flexible scheduling** with configurable shift lengths and date modes
- **Data persistence** using browser localStorage

## Technology Stack

### Core Framework
- **React 18.2.0** - Modern functional components with hooks
- **React DOM 18.2.0** - React rendering engine

### UI & Styling
- **Bootstrap 5.3.2** - Responsive CSS framework
- **CSS Grid & Flexbox** - Modern layout systems
- **Custom CSS** - Component-specific styling with GitHub-inspired design

### Data Visualization
- **D3.js v7.8.5** - Bell curve and statistical charts

### Development Tools
- **React Scripts 5.0.1** - Create React App tooling
- **Storybook 7.6.20** - Component development and documentation
- **Webpack 5.101.3** - Module bundler

## Project Structure

```
shiftloop/
├── src/
│   ├── components/
│   │   ├── Tracker.js                 # GitHub-style calendar grid
│   │   ├── Graph.js                   # D3.js bell curve visualization
│   │   ├── ControlsPanel.js           # Schedule configuration UI
│   │   ├── TeamMemberInput.js         # Add team member form
│   │   ├── TeamMembersTable.js        # Team member list/management
│   │   ├── StatCard.js                # Reusable statistics card
│   │   ├── MeanCard.js                # Mean days display
│   │   ├── StdDevCard.js              # Standard deviation display
│   │   └── *.css / *.stories.js       # Component styles and stories
│   ├── App.js                         # Main application orchestrator
│   ├── App.css                        # App-level styling
│   ├── index.js                       # React entry point
│   └── index.css                      # Global styles
├── public/
│   └── index.html                     # HTML entry point
├── .storybook/
│   ├── main.js                        # Storybook configuration
│   └── preview.js                     # Storybook preview settings
├── package.json                       # Dependencies and scripts
├── README.md                          # User documentation
└── COMPONENT_REFACTOR.md              # Refactoring documentation
```

## Component Architecture

### App.js (Main Orchestrator)
Central state management for the entire application.

**State Variables:**
- `peopleList` - Team members array with {id, name, color}
- `startDate` - Schedule start date (YYYY-MM-DD)
- `shiftLength` - Days per shift (1-14, default 7)
- `includeFriday` - Include Friday as weekend day
- `useNext12Months` - Date mode toggle
- `dailySchedule` - 365-day schedule array
- `weekendDaysPerPerson` - Weekend call counts
- `mean` / `stdDev` - Statistical measures

**Key Functions:**
- Schedule calculation and distribution logic
- localStorage persistence
- Team member CRUD operations
- Settings management

### Component Hierarchy

```
App
├── Tracker               # 53-week calendar visualization
├── Graph                 # D3.js bell curve chart
├── ControlsPanel         # Date mode, shift length, Friday toggle
├── TeamMemberInput       # Add new member form
├── TeamMembersTable      # List with edit/delete/reorder
├── MeanCard              # Average weekend days metric
└── StdDevCard            # Distribution fairness metric
```

## Core Functionality

### Schedule Distribution Algorithm
1. Calculate total days (365) based on date mode
2. For each day:
   - Determine shift number: `floor(day / shiftLength)`
   - Assign person: `shiftNumber % teamSize`
   - Check if weekend (Sat/Sun or Fri/Sat/Sun if enabled)
   - Increment weekend counter for assigned person
3. Calculate statistics:
   - Mean = total weekend days / team size
   - Std Dev = sqrt(sum((days - mean)²) / teamSize)

### Statistical Analysis
- **Mean Weekend Days**: Target <15 (green), <20 (yellow), >20 (red)
- **Standard Deviation**: Target <1 (green), <3 (yellow), >3 (red)
- **Bell Curve**: Visual representation of distribution fairness

### Data Persistence
All data stored in localStorage:
- `callSchedulerPeople` - Team member data
- `callSchedulerSettings` - Schedule configuration

## Available Scripts

```bash
# Development server (port 3000)
npm start

# Production build
npm build

# Run tests
npm test

# Storybook development (port 6006)
npm run storybook

# Build Storybook static site
npm run build-storybook
```

## Storybook Documentation

Comprehensive component stories covering:
- **Tracker**: 8 stories (team sizes, shift lengths, date modes, edge cases)
- **Graph**: Bell curve visualization variants
- **ControlsPanel**: 8 stories covering all control scenarios
- **TeamMemberInput**: 9 stories for input states
- **TeamMembersTable**: 10 stories for table variations
- **StatCard**: 18 stories for statistics display

Access at: http://localhost:6006

## Design System

### Color Palette
Default team member colors:
- `#E69F00` (Orange)
- `#56B4E9` (Sky Blue)
- `#009E73` (Teal)
- `#F0E442` (Yellow)
- `#0072B2` (Blue)
- `#D55E00` (Red-Orange)
- `#CC79A7` (Pink)

### Visual Design
- GitHub-inspired calendar aesthetic
- Bootstrap 5 utility classes
- Neutral color scheme with accent colors
- Responsive grid layouts
- Smooth transitions and hover effects
- Tooltips for enhanced UX

## Development Guidelines

### Adding New Features
1. Create component in `src/components/`
2. Add corresponding CSS file
3. Create `.stories.js` for Storybook
4. Import and integrate in [App.js](src/App.js)
5. Update localStorage if persisting new data

### State Management
- All state managed in [App.js](src/App.js)
- Props passed down to components
- Callbacks lifted up for state updates
- No external state management library required

### Styling Conventions
- Bootstrap utilities for layout
- Component-specific CSS modules
- CSS Grid for calendar layout
- Flexbox for responsive components
- BEM-like naming for custom classes

## Recent Changes

**Current Branch**: `add-react-and-storybook`

**Recent Refactoring**:
- Broke down monolithic App into 9 specialized components
- Added comprehensive Storybook setup (60+ stories)
- Improved code organization and maintainability
- All functionality preserved during refactor

## Key Files

- [App.js](src/App.js) - Main application logic and state management
- [Tracker.js](src/components/Tracker.js) - Calendar visualization component
- [Graph.js](src/components/Graph.js) - D3.js bell curve chart
- [ControlsPanel.js](src/components/ControlsPanel.js) - Schedule controls UI
- [TeamMembersTable.js](src/components/TeamMembersTable.js) - Team management interface
- [package.json](package.json) - Dependencies and scripts
- [COMPONENT_REFACTOR.md](COMPONENT_REFACTOR.md) - Refactoring documentation

## Use Cases

### Primary Use Case
Managing weekend on-call rotations for software development teams with:
- Configurable shift lengths (typically 7 days)
- Fair distribution analysis
- Visual schedule planning
- Historical tracking

### Supported Scenarios
- Teams of 2-20+ members
- Shift lengths from 1-14 days
- Annual or rolling 12-month schedules
- Weekend definitions (Sat/Sun or Fri/Sat/Sun)
- Custom start dates for schedule alignment

## Future Enhancements

Potential areas for expansion:
- Export schedule to calendar formats (iCal, CSV)
- Email notifications for upcoming shifts
- Holiday handling and exceptions
- Multiple schedule types (weekday, 24/7)
- Team member availability preferences
- Historical analytics and reporting
- Backend persistence (API integration)
- Multi-team management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Production: >0.2% usage, not dead, not Opera Mini

## License

MIT License
