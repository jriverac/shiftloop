import StatCard from './StatCard';
import MeanCard from './MeanCard';
import StdDevCard from './StdDevCard';

export default {
  title: 'Components/Statistics',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// StatCard Stories
export const StatCardDefault = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'Sample Metric',
    value: 12.5,
    goodThreshold: 10,
    warningThreshold: 20,
    compareFunc: 'greater',
    precision: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic StatCard component with customizable thresholds and comparison logic.',
      },
    },
  },
};

export const StatCardSuccess = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'Low Usage',
    value: 5.2,
    goodThreshold: 10,
    warningThreshold: 20,
    compareFunc: 'greater',
    precision: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'StatCard showing success state (value below good threshold).',
      },
    },
  },
};

export const StatCardWarning = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'Moderate Usage',
    value: 15.7,
    goodThreshold: 10,
    warningThreshold: 20,
    compareFunc: 'greater',
    precision: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'StatCard showing warning state (value between thresholds).',
      },
    },
  },
};

export const StatCardDanger = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'High Usage',
    value: 25.9,
    goodThreshold: 10,
    warningThreshold: 20,
    compareFunc: 'greater',
    precision: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'StatCard showing danger state (value above warning threshold).',
      },
    },
  },
};

export const StatCardSmallSize = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'Compact Metric',
    value: 42,
    goodThreshold: 50,
    warningThreshold: 80,
    compareFunc: 'greater',
    precision: 0,
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small-sized StatCard for space-constrained layouts.',
      },
    },
  },
};

export const StatCardLargeSize = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'Important Metric',
    value: 87.3,
    goodThreshold: 50,
    warningThreshold: 80,
    compareFunc: 'greater',
    precision: 1,
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large-sized StatCard for emphasis.',
      },
    },
  },
};

export const StatCardCustomCondition = {
  render: (args) => <StatCard {...args} />,
  args: {
    title: 'Custom Logic',
    value: 7,
    customCondition: (value) => value % 2 === 0, // Even numbers are "bad"
    precision: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'StatCard with custom condition logic (even numbers show as danger).',
      },
    },
  },
};

// MeanCard Stories
export const MeanCardGood = {
  render: (args) => <MeanCard {...args} />,
  args: {
    value: 12.4,
  },
  parameters: {
    docs: {
      description: {
        story: 'MeanCard showing good distribution (low mean weekend days).',
      },
    },
  },
};

export const MeanCardWarning = {
  render: (args) => <MeanCard {...args} />,
  args: {
    value: 17.8,
  },
  parameters: {
    docs: {
      description: {
        story: 'MeanCard showing moderate workload.',
      },
    },
  },
};

export const MeanCardDanger = {
  render: (args) => <MeanCard {...args} />,
  args: {
    value: 23.1,
  },
  parameters: {
    docs: {
      description: {
        story: 'MeanCard showing high workload (concerning level).',
      },
    },
  },
};

export const MeanCardCustomThresholds = {
  render: (args) => <MeanCard {...args} />,
  args: {
    value: 18.5,
    goodThreshold: 20,
    warningThreshold: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'MeanCard with custom thresholds for different team expectations.',
      },
    },
  },
};

// StdDevCard Stories
export const StdDevCardGood = {
  render: (args) => <StdDevCard {...args} />,
  args: {
    value: 0.8,
  },
  parameters: {
    docs: {
      description: {
        story: 'StdDevCard showing good distribution (low standard deviation).',
      },
    },
  },
};

export const StdDevCardWarning = {
  render: (args) => <StdDevCard {...args} />,
  args: {
    value: 2.3,
  },
  parameters: {
    docs: {
      description: {
        story: 'StdDevCard showing moderate inequality in distribution.',
      },
    },
  },
};

export const StdDevCardDanger = {
  render: (args) => <StdDevCard {...args} />,
  args: {
    value: 4.7,
  },
  parameters: {
    docs: {
      description: {
        story: 'StdDevCard showing poor distribution (high standard deviation).',
      },
    },
  },
};

export const StdDevCardPerfect = {
  render: (args) => <StdDevCard {...args} />,
  args: {
    value: 0.0,
  },
  parameters: {
    docs: {
      description: {
        story: 'StdDevCard showing perfect distribution (zero standard deviation).',
      },
    },
  },
};

export const StdDevCardCustomThresholds = {
  render: (args) => <StdDevCard {...args} />,
  args: {
    value: 1.5,
    goodThreshold: 2,
    warningThreshold: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'StdDevCard with relaxed thresholds for larger teams.',
      },
    },
  },
};

// Combined Story
export const StatisticsRow = {
  render: () => (
    <div className="row g-3">
      <div className="col-6">
        <MeanCard value={14.2} />
      </div>
      <div className="col-6">
        <StdDevCard value={1.8} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MeanCard and StdDevCard displayed together as they appear in the application.',
      },
    },
  },
};

export const StatisticsRowDanger = {
  render: () => (
    <div className="row g-3">
      <div className="col-6">
        <MeanCard value={22.5} />
      </div>
      <div className="col-6">
        <StdDevCard value={4.2} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Statistics cards showing problematic distribution with high values.',
      },
    },
  },
};