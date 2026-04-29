import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlsPanel from './ControlsPanel';

describe('ControlsPanel', () => {
  const mockProps = {
    useNext12Months: false,
    onToggleNext12Months: jest.fn(),
    startDate: '2025-01-01',
    onStartDateChange: jest.fn(),
    shiftLength: 7,
    onShiftLengthChange: jest.fn(),
    includeFriday: false,
    onToggleIncludeFriday: jest.fn(),
    meanGreenThreshold: 15,
    meanYellowThreshold: 20,
    stdDevGreenThreshold: 1,
    stdDevYellowThreshold: 3,
    onMeanGreenThresholdChange: jest.fn(),
    onMeanYellowThresholdChange: jest.fn(),
    onStdDevGreenThresholdChange: jest.fn(),
    onStdDevYellowThresholdChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<ControlsPanel {...mockProps} />);
  });

  test('renders all control elements', () => {
    render(<ControlsPanel {...mockProps} />);

    expect(screen.getByText('Controls')).toBeInTheDocument();
    expect(screen.getByText('Specific Start Date')).toBeInTheDocument();
    expect(screen.getByText('Next 13 Months')).toBeInTheDocument();
    expect(screen.getByLabelText('Shift Length (days):')).toBeInTheDocument();
    expect(screen.getByLabelText('Include Friday')).toBeInTheDocument();
  });

  test('shows start date input when useNext12Months is false', () => {
    render(<ControlsPanel {...mockProps} useNext12Months={false} />);
    expect(screen.getByLabelText('Start Date:')).toBeInTheDocument();
  });

  test('hides start date input when useNext12Months is true', () => {
    render(<ControlsPanel {...mockProps} useNext12Months={true} />);
    expect(screen.queryByLabelText('Start Date:')).not.toBeInTheDocument();
  });

  test('calls onToggleNext12Months when date mode toggle is clicked', () => {
    render(<ControlsPanel {...mockProps} />);
    const toggle = screen.getByRole('checkbox', { name: '' });
    fireEvent.click(toggle);
    expect(mockProps.onToggleNext12Months).toHaveBeenCalledWith(true);
  });

  test('calls onStartDateChange when start date is changed', () => {
    render(<ControlsPanel {...mockProps} />);
    const dateInput = screen.getByLabelText('Start Date:');
    fireEvent.change(dateInput, { target: { value: '2025-12-31' } });
    expect(mockProps.onStartDateChange).toHaveBeenCalledWith('2025-12-31');
  });

  test('calls onShiftLengthChange when shift length is changed', () => {
    render(<ControlsPanel {...mockProps} />);
    const shiftInput = screen.getByLabelText('Shift Length (days):');
    fireEvent.change(shiftInput, { target: { value: '10' } });
    expect(mockProps.onShiftLengthChange).toHaveBeenCalledWith(10);
  });

  test('calls onToggleIncludeFriday when include Friday checkbox is clicked', () => {
    render(<ControlsPanel {...mockProps} />);
    const fridayCheckbox = screen.getByLabelText('Include Friday');
    fireEvent.click(fridayCheckbox);
    expect(mockProps.onToggleIncludeFriday).toHaveBeenCalledWith(true);
  });

  test('displays correct shift length value', () => {
    render(<ControlsPanel {...mockProps} shiftLength={14} />);
    const shiftInput = screen.getByLabelText('Shift Length (days):');
    expect(shiftInput).toHaveValue(14);
  });

  test('includeFriday checkbox is checked when prop is true', () => {
    render(<ControlsPanel {...mockProps} includeFriday={true} />);
    const fridayCheckbox = screen.getByLabelText('Include Friday');
    expect(fridayCheckbox).toBeChecked();
  });

  // Threshold configuration tests
  test('renders threshold settings section', () => {
    render(<ControlsPanel {...mockProps} />);
    expect(screen.getByText('Threshold Settings')).toBeInTheDocument();
  });

  test('renders mean threshold inputs', () => {
    render(<ControlsPanel {...mockProps} />);
    const greenInput = document.getElementById('meanGreenThreshold');
    const yellowInput = document.getElementById('meanYellowThreshold');
    expect(greenInput).toBeInTheDocument();
    expect(yellowInput).toBeInTheDocument();
  });

  test('displays correct mean threshold values', () => {
    render(<ControlsPanel {...mockProps} meanGreenThreshold={10} meanYellowThreshold={15} />);
    const greenInput = document.getElementById('meanGreenThreshold');
    const yellowInput = document.getElementById('meanYellowThreshold');
    expect(greenInput).toHaveValue(10);
    expect(yellowInput).toHaveValue(15);
  });

  test('calls onMeanGreenThresholdChange when mean green threshold is changed', () => {
    render(<ControlsPanel {...mockProps} />);
    const greenInput = document.getElementById('meanGreenThreshold');
    fireEvent.change(greenInput, { target: { value: '12' } });
    expect(mockProps.onMeanGreenThresholdChange).toHaveBeenCalledWith(12);
  });

  test('calls onMeanYellowThresholdChange when mean yellow threshold is changed', () => {
    render(<ControlsPanel {...mockProps} />);
    const yellowInput = document.getElementById('meanYellowThreshold');
    fireEvent.change(yellowInput, { target: { value: '25' } });
    expect(mockProps.onMeanYellowThresholdChange).toHaveBeenCalledWith(25);
  });

  test('displays correct stdDev threshold values', () => {
    render(<ControlsPanel {...mockProps} stdDevGreenThreshold={0.5} stdDevYellowThreshold={2.5} />);
    const greenInput = document.getElementById('stdDevGreenThreshold');
    const yellowInput = document.getElementById('stdDevYellowThreshold');
    expect(greenInput).toHaveValue(0.5);
    expect(yellowInput).toHaveValue(2.5);
  });

  test('calls onStdDevGreenThresholdChange when stdDev green threshold is changed', () => {
    render(<ControlsPanel {...mockProps} />);
    const greenInput = document.getElementById('stdDevGreenThreshold');
    fireEvent.change(greenInput, { target: { value: '0.8' } });
    expect(mockProps.onStdDevGreenThresholdChange).toHaveBeenCalledWith(0.8);
  });

  test('calls onStdDevYellowThresholdChange when stdDev yellow threshold is changed', () => {
    render(<ControlsPanel {...mockProps} />);
    const yellowInput = document.getElementById('stdDevYellowThreshold');
    fireEvent.change(yellowInput, { target: { value: '4.5' } });
    expect(mockProps.onStdDevYellowThresholdChange).toHaveBeenCalledWith(4.5);
  });
});
