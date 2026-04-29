import TeamMembersTable from './TeamMembersTable';

export default {
  title: 'Components/TeamMembersTable',
  component: TeamMembersTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    peopleList: {
      control: 'object',
      description: 'Array of team members',
    },
    weekendDaysPerPerson: {
      control: 'object',
      description: 'Array of weekend call days for each person',
    },
    editingPersonId: {
      control: 'number',
      description: 'ID of person currently being edited',
    },
    editingName: {
      control: 'text',
      description: 'Current value in edit field',
    },
    onUpdatePersonColor: { action: 'updated person color' },
    onStartEditingName: { action: 'started editing name' },
    onSetEditingName: { action: 'set editing name' },
    onSavePersonName: { action: 'saved person name' },
    onCancelEditingName: { action: 'cancelled editing name' },
    onMovePersonUp: { action: 'moved person up' },
    onMovePersonDown: { action: 'moved person down' },
    onRemovePerson: { action: 'removed person' },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

const samplePeople = [
  { id: 1, name: 'Alice Johnson', color: '#E69F00' },
  { id: 2, name: 'Bob Smith', color: '#56B4E9' },
  { id: 3, name: 'Charlie Brown', color: '#009E73' },
  { id: 4, name: 'Diana Prince', color: '#F0E442' },
];

const sampleWeekendDays = [15, 18, 12, 16];

// Default story
export const Default = {
  args: {
    peopleList: samplePeople,
    weekendDaysPerPerson: sampleWeekendDays,
    editingPersonId: null,
    editingName: '',
  },
};

// Empty state
export const Empty = {
  args: {
    peopleList: [],
    weekendDaysPerPerson: [],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no team members have been added.',
      },
    },
  },
};

// Single person
export const SinglePerson = {
  args: {
    peopleList: [{ id: 1, name: 'Solo Worker', color: '#E69F00' }],
    weekendDaysPerPerson: [52],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with only one team member.',
      },
    },
  },
};

// Large team
export const LargeTeam = {
  args: {
    peopleList: [
      { id: 1, name: 'Alice Johnson', color: '#E69F00' },
      { id: 2, name: 'Bob Smith', color: '#56B4E9' },
      { id: 3, name: 'Charlie Brown', color: '#009E73' },
      { id: 4, name: 'Diana Prince', color: '#F0E442' },
      { id: 5, name: 'Eve Wilson', color: '#0072B2' },
      { id: 6, name: 'Frank Miller', color: '#D55E00' },
      { id: 7, name: 'Grace Lee', color: '#CC79A7' },
      { id: 8, name: 'Henry Davis', color: '#999999' },
    ],
    weekendDaysPerPerson: [10, 12, 9, 11, 13, 8, 10, 14],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with a larger team showing multiple members.',
      },
    },
  },
};

// Editing state
export const EditingName = {
  args: {
    peopleList: samplePeople,
    weekendDaysPerPerson: sampleWeekendDays,
    editingPersonId: 2,
    editingName: 'Robert Smith',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with one person\'s name being edited.',
      },
    },
  },
};

// Uneven workload
export const UnevenWorkload = {
  args: {
    peopleList: samplePeople,
    weekendDaysPerPerson: [5, 25, 8, 32],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table showing uneven distribution of weekend call days.',
      },
    },
  },
};

// Custom colors
export const CustomColors = {
  args: {
    peopleList: [
      { id: 1, name: 'Red Team', color: '#DC3545' },
      { id: 2, name: 'Green Team', color: '#28A745' },
      { id: 3, name: 'Blue Team', color: '#007BFF' },
      { id: 4, name: 'Purple Team', color: '#6F42C1' },
    ],
    weekendDaysPerPerson: [14, 15, 16, 13],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with custom color scheme for team members.',
      },
    },
  },
};

// Long names
export const LongNames = {
  args: {
    peopleList: [
      { id: 1, name: 'Dr. Alexandria Montgomery-Richardson III', color: '#E69F00' },
      { id: 2, name: 'Prof. Bartholomew Fitzgerald-Jones Jr.', color: '#56B4E9' },
      { id: 3, name: 'Ms. Christina Elizabeth van der Berg', color: '#009E73' },
    ],
    weekendDaysPerPerson: [17, 18, 16],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with very long names to test layout.',
      },
    },
  },
};

// High call days
export const HighCallDays = {
  args: {
    peopleList: samplePeople.slice(0, 2),
    weekendDaysPerPerson: [89, 92],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Two-person team with high weekend call day counts.',
      },
    },
  },
};

// No weekend days calculated
export const NoWeekendDays = {
  args: {
    peopleList: samplePeople,
    weekendDaysPerPerson: [0, 0, 0, 0],
    editingPersonId: null,
    editingName: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table when weekend days have not been calculated yet.',
      },
    },
  },
};