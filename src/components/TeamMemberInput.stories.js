import TeamMemberInput from './TeamMemberInput';

export default {
  title: 'Components/TeamMemberInput',
  component: TeamMemberInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current input value',
    },
    onChange: { action: 'changed' },
    onAdd: { action: 'added' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the add button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
};

// Default story
export const Default = {
  args: {
    value: '',
    placeholder: 'Enter name',
    buttonText: 'Add',
    disabled: false,
  },
};

// With text entered
export const WithText = {
  args: {
    value: 'Alice Johnson',
    placeholder: 'Enter name',
    buttonText: 'Add',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field with text entered. Button is enabled when text is present.',
      },
    },
  },
};

// Empty state (button disabled)
export const Empty = {
  args: {
    value: '',
    placeholder: 'Enter name',
    buttonText: 'Add',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty input field. Add button is disabled when no text is entered.',
      },
    },
  },
};

// Custom placeholder
export const CustomPlaceholder = {
  args: {
    value: '',
    placeholder: 'Enter team member name...',
    buttonText: 'Add',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with custom placeholder text.',
      },
    },
  },
};

// Custom button text
export const CustomButtonText = {
  args: {
    value: 'John Smith',
    placeholder: 'Enter name',
    buttonText: 'Add Member',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with custom button text.',
      },
    },
  },
};

// Disabled state
export const Disabled = {
  args: {
    value: 'Cannot edit',
    placeholder: 'Enter name',
    buttonText: 'Add',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input field. Both input and button are disabled.',
      },
    },
  },
};

// Long name
export const LongName = {
  args: {
    value: 'Dr. Alexandria Montgomery-Richardson III',
    placeholder: 'Enter name',
    buttonText: 'Add',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a very long name to test layout.',
      },
    },
  },
};

// Different button variants
export const DifferentButtonStyles = {
  args: {
    value: 'New Member',
    placeholder: 'Enter name',
    buttonText: '+ Add',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with custom button text using an icon.',
      },
    },
  },
};

// Loading state simulation
export const LoadingState = {
  args: {
    value: 'Processing...',
    placeholder: 'Enter name',
    buttonText: 'Adding...',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulated loading state while adding a member.',
      },
    },
  },
};