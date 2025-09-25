import ControlsPanel from './ControlsPanel';

export default {
  title: 'Components/ControlsPanel',
  component: ControlsPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    useNext12Months: {
      control: 'boolean',
      description: 'Whether to use next 12 months mode or specific start date',
    },
    onToggleNext12Months: { action: 'toggled next 12 months' },
    startDate: {
      control: 'date',
      description: 'Start date for the schedule',
    },
    onStartDateChange: { action: 'start date changed' },
    shiftLength: {
      control: { type: 'number', min: 1, max: 14, step: 1 },
      description: 'Length of each shift in days',
    },
    onShiftLengthChange: { action: 'shift length changed' },
    includeFriday: {
      control: 'boolean',
      description: 'Whether to include Friday as a weekend day',
    },
    onToggleIncludeFriday: { action: 'toggled include Friday' },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

// Default story
export const Default = {
  args: {
    useNext12Months: false,
    startDate: '2024-01-01',
    shiftLength: 7,
    includeFriday: false,
  },
};

// Next 12 months mode
export const Next12MonthsMode = {
  args: {
    useNext12Months: true,
    startDate: '2024-01-01',
    shiftLength: 7,
    includeFriday: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'When next 12 months mode is enabled, the start date input is hidden.',
      },
    },
  },
};

// Include Friday enabled
export const IncludeFridayEnabled = {
  args: {
    useNext12Months: false,
    startDate: '2024-01-01',
    shiftLength: 7,
    includeFriday: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Friday is included as part of the weekend when calculating call days.',
      },
    },
  },
};

// Short shifts
export const ShortShifts = {
  args: {
    useNext12Months: false,
    startDate: '2024-01-01',
    shiftLength: 3,
    includeFriday: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for short 3-day shifts.',
      },
    },
  },
};

// Long shifts
export const LongShifts = {
  args: {
    useNext12Months: false,
    startDate: '2024-01-01',
    shiftLength: 14,
    includeFriday: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for long 14-day shifts.',
      },
    },
  },
};

// All options enabled
export const AllOptionsEnabled = {
  args: {
    useNext12Months: true,
    startDate: '2024-06-15',
    shiftLength: 10,
    includeFriday: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All options enabled: next 12 months mode, 10-day shifts, and Friday included.',
      },
    },
  },
};

// Mid-year start
export const MidYearStart = {
  args: {
    useNext12Months: false,
    startDate: '2024-07-15',
    shiftLength: 7,
    includeFriday: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Schedule starting in the middle of the year.',
      },
    },
  },
};

// Minimum shift length
export const MinimumShiftLength = {
  args: {
    useNext12Months: false,
    startDate: '2024-01-01',
    shiftLength: 1,
    includeFriday: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Daily rotation with 1-day shifts.',
      },
    },
  },
};