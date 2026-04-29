import React from 'react';
import { render, screen } from '@testing-library/react';
import Tracker from './Tracker';

describe('Tracker', () => {
  const mockPeopleList = [
    { id: 1, name: 'Alice', color: '#E69F00' },
    { id: 2, name: 'Bob', color: '#56B4E9' }
  ];

  const mockDailySchedule = new Array(365).fill(0).map((_, index) => index % 2);
  const mockStartDate = '2025-01-01';

  test('renders without crashing', () => {
    render(
      <Tracker
        peopleList={mockPeopleList}
        dailySchedule={mockDailySchedule}
        useNext12Months={false}
        startDate={mockStartDate}
      />
    );
  });

  test('renders chart title for annual view', () => {
    render(
      <Tracker
        peopleList={mockPeopleList}
        dailySchedule={mockDailySchedule}
        useNext12Months={false}
        startDate={mockStartDate}
      />
    );
    expect(screen.getByText('Annual Call Chart')).toBeInTheDocument();
  });

  test('renders chart title for 12-month view', () => {
    render(
      <Tracker
        peopleList={mockPeopleList}
        dailySchedule={mockDailySchedule}
        useNext12Months={true}
        startDate={mockStartDate}
      />
    );
    expect(screen.getByText('Next 12 Months Call Chart')).toBeInTheDocument();
  });

  test('renders with empty people list', () => {
    render(
      <Tracker
        peopleList={[]}
        dailySchedule={[]}
        useNext12Months={false}
        startDate={mockStartDate}
      />
    );
    expect(screen.getByText('Annual Call Chart')).toBeInTheDocument();
  });

  test('contains chart grid wrapper', () => {
    const { container } = render(
      <Tracker
        peopleList={mockPeopleList}
        dailySchedule={mockDailySchedule}
        useNext12Months={false}
        startDate={mockStartDate}
      />
    );
    const chartContainer = container.querySelector('.tracker-chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});
