import Graph from './Graph';

export default {
  title: 'Components/Graph',
  component: Graph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    peopleList: {
      control: 'object',
      description: 'Array of team members with names and colors',
    },
    mean: {
      control: { type: 'number', min: 0, max: 50, step: 0.1 },
      description: 'Mean weekend call days',
    },
    stdDev: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: 'Standard deviation of weekend call days',
    },
  },
};

const samplePeopleSmall = [
  { id: 1, name: 'Alice', color: '#E69F00' },
  { id: 2, name: 'Bob', color: '#56B4E9' },
  { id: 3, name: 'Charlie', color: '#009E73' },
];

const samplePeopleLarge = [
  { id: 1, name: 'Alice', color: '#E69F00' },
  { id: 2, name: 'Bob', color: '#56B4E9' },
  { id: 3, name: 'Charlie', color: '#009E73' },
  { id: 4, name: 'Diana', color: '#F0E442' },
  { id: 5, name: 'Eve', color: '#0072B2' },
  { id: 6, name: 'Frank', color: '#D55E00' },
  { id: 7, name: 'Grace', color: '#CC79A7' },
];

// Default story
export const Default = {
  args: {
    peopleList: samplePeopleSmall,
    mean: 15.2,
    stdDev: 1.5,
  },
};

// Empty state
export const Empty = {
  args: {
    peopleList: [],
    mean: 0,
    stdDev: 0,
  },
};

// Perfect distribution (low standard deviation)
export const PerfectDistribution = {
  args: {
    peopleList: samplePeopleSmall,
    mean: 12.0,
    stdDev: 0.2,
  },
};

// Poor distribution (high standard deviation)
export const PoorDistribution = {
  args: {
    peopleList: samplePeopleSmall,
    mean: 18.5,
    stdDev: 4.2,
  },
};

// Large team
export const LargeTeam = {
  args: {
    peopleList: samplePeopleLarge,
    mean: 10.8,
    stdDev: 0.8,
  },
};

// High workload scenario
export const HighWorkload = {
  args: {
    peopleList: samplePeopleSmall,
    mean: 25.3,
    stdDev: 2.1,
  },
};

// Single person team
export const SinglePerson = {
  args: {
    peopleList: [{ id: 1, name: 'Solo Worker', color: '#E69F00' }],
    mean: 52.0,
    stdDev: 0.0,
  },
};

// Two person team
export const TwoPersonTeam = {
  args: {
    peopleList: [
      { id: 1, name: 'Alice', color: '#E69F00' },
      { id: 2, name: 'Bob', color: '#56B4E9' },
    ],
    mean: 26.0,
    stdDev: 1.0,
  },
};