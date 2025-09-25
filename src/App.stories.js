import App from './App';

export default {
  title: 'App/ShiftLoop',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The complete ShiftLoop application for managing weekend call schedules.',
      },
    },
  },
  tags: ['autodocs'],
};

// Default story - shows the complete app
export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'The default view of the ShiftLoop application with all features available.',
      },
    },
  },
};

// App with dark background
export const DarkBackground = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    docs: {
      description: {
        story: 'ShiftLoop application displayed on a dark background.',
      },
    },
  },
};

// App documentation story
export const Documentation = {
  parameters: {
    docs: {
      description: {
        story: `
## ShiftLoop Weekend Call Schedule Tracker

ShiftLoop is a React application designed to help teams manage their weekend call schedules efficiently. 

### Features:
- **Team Management**: Add, remove, and reorder team members
- **Schedule Visualization**: See your call schedule in a GitHub-style activity chart
- **Statistical Analysis**: View distribution charts with mean and standard deviation
- **Flexible Scheduling**: Configure shift length, start dates, and include Fridays
- **Persistent Storage**: Automatically saves team and settings data

### Components:
- **Tracker**: Visual calendar showing who's on call each day
- **Graph**: Bell curve showing the distribution of weekend call days
- **Controls**: Settings for customizing schedule parameters

### Usage:
1. Add team members using the "Team Members" section
2. Configure schedule settings in the "Controls" panel
3. View the generated schedule in the tracker chart
4. Monitor fairness using the statistical analysis

The application automatically calculates and displays:
- Mean weekend call days per person
- Standard deviation (measure of fairness)
- Visual schedule for the entire year or next 13 months
        `,
      },
    },
  },
};