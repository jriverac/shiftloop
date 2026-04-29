import Tracker from './Tracker';

export default {
  title: 'Components/Tracker',
  component: Tracker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    peopleList: {
      control: 'object',
      description: 'Array of team members with names and colors',
    },
    dailySchedule: {
      control: 'object',
      description: 'Array of person indices for each day of the year',
    },
    useNext12Months: {
      control: 'boolean',
      description: 'Whether to show next 12 months or current year',
    },
    startDate: {
      control: 'date',
      description: 'Start date for the schedule',
    },
  },
};

const samplePeople = [
  { id: 1, name: 'Alice', color: '#E69F00' },
  { id: 2, name: 'Bob', color: '#56B4E9' },
  { id: 3, name: 'Charlie', color: '#009E73' },
  { id: 4, name: 'Diana', color: '#F0E442' },
];

// Generate a sample daily schedule for 365 days with 7-day shifts
const generateDailySchedule = (peopleCount, shiftLength = 7) => {
  const schedule = [];
  for (let day = 0; day < 365; day++) {
    const shiftNumber = Math.floor(day / shiftLength);
    const personIndex = shiftNumber % peopleCount;
    schedule.push(personIndex);
  }
  return schedule;
};

// Default story - Current year view
export const Default = {
  args: {
    peopleList: samplePeople,
    dailySchedule: generateDailySchedule(4, 7),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Next 12 months view
export const Next12Months = {
  args: {
    peopleList: samplePeople,
    dailySchedule: generateDailySchedule(4, 7),
    useNext12Months: true,
    startDate: new Date().toISOString().split('T')[0],
  },
};

// Small team (2 people)
export const SmallTeam = {
  args: {
    peopleList: [
      { id: 1, name: 'Alice', color: '#E69F00' },
      { id: 2, name: 'Bob', color: '#56B4E9' },
    ],
    dailySchedule: generateDailySchedule(2, 7),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Large team (6 people)
export const LargeTeam = {
  args: {
    peopleList: [
      { id: 1, name: 'Alice', color: '#E69F00' },
      { id: 2, name: 'Bob', color: '#56B4E9' },
      { id: 3, name: 'Charlie', color: '#009E73' },
      { id: 4, name: 'Diana', color: '#F0E442' },
      { id: 5, name: 'Eve', color: '#0072B2' },
      { id: 6, name: 'Frank', color: '#D55E00' },
    ],
    dailySchedule: generateDailySchedule(6, 7),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Short shifts (3 days)
export const ShortShifts = {
  args: {
    peopleList: samplePeople,
    dailySchedule: generateDailySchedule(4, 3),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Long shifts (14 days)
export const LongShifts = {
  args: {
    peopleList: samplePeople,
    dailySchedule: generateDailySchedule(4, 14),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Solo worker
export const SoloWorker = {
  args: {
    peopleList: [{ id: 1, name: 'Solo Worker', color: '#E69F00' }],
    dailySchedule: new Array(365).fill(0),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Empty state
export const Empty = {
  args: {
    peopleList: [],
    dailySchedule: [],
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};

// Mid-year start date
export const MidYearStart = {
  args: {
    peopleList: samplePeople,
    dailySchedule: generateDailySchedule(4, 7),
    useNext12Months: false,
    startDate: '2024-06-15',
  },
};

// Different color scheme
export const CustomColors = {
  args: {
    peopleList: [
      { id: 1, name: 'Red Team', color: '#DC3545' },
      { id: 2, name: 'Green Team', color: '#28A745' },
      { id: 3, name: 'Blue Team', color: '#007BFF' },
      { id: 4, name: 'Purple Team', color: '#6F42C1' },
    ],
    dailySchedule: generateDailySchedule(4, 7),
    useNext12Months: false,
    startDate: '2024-01-01',
  },
};