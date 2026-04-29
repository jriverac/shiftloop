import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeamMembersTable from './TeamMembersTable';

describe('TeamMembersTable', () => {
  const mockPeopleList = [
    { id: 1, name: 'Alice', color: '#E69F00' },
    { id: 2, name: 'Bob', color: '#56B4E9' },
    { id: 3, name: 'Charlie', color: '#009E73' }
  ];

  const mockWeekendDays = [15, 18, 16];

  const mockProps = {
    peopleList: mockPeopleList,
    weekendDaysPerPerson: mockWeekendDays,
    editingPersonId: null,
    editingName: '',
    onUpdatePersonColor: jest.fn(),
    onStartEditingName: jest.fn(),
    onSetEditingName: jest.fn(),
    onSavePersonName: jest.fn(),
    onCancelEditingName: jest.fn(),
    onMovePersonUp: jest.fn(),
    onMovePersonDown: jest.fn(),
    onRemovePerson: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<TeamMembersTable {...mockProps} />);
  });

  test('displays empty state when no people', () => {
    render(<TeamMembersTable {...mockProps} peopleList={[]} />);
    expect(screen.getByText(/No team members added yet/i)).toBeInTheDocument();
  });

  test('renders table headers', () => {
    render(<TeamMembersTable {...mockProps} />);
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Person')).toBeInTheDocument();
    expect(screen.getByText('Weekend Call Days')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('displays all team members', () => {
    render(<TeamMembersTable {...mockProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  test('displays weekend days count for each person', () => {
    render(<TeamMembersTable {...mockProps} />);
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  test('shows edit input when editing a person', () => {
    render(<TeamMembersTable {...mockProps} editingPersonId={1} editingName="Alice Updated" />);
    expect(screen.getByDisplayValue('Alice Updated')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('calls onStartEditingName when clicking on a name', () => {
    render(<TeamMembersTable {...mockProps} />);
    fireEvent.click(screen.getByText('Alice'));
    expect(mockProps.onStartEditingName).toHaveBeenCalledWith(mockPeopleList[0]);
  });

  test('calls onStartEditingName when clicking Rename button', () => {
    render(<TeamMembersTable {...mockProps} />);
    const renameButtons = screen.getAllByText('Rename');
    fireEvent.click(renameButtons[0]);
    expect(mockProps.onStartEditingName).toHaveBeenCalledWith(mockPeopleList[0]);
  });

  test('calls onSavePersonName when clicking Save button', () => {
    render(<TeamMembersTable {...mockProps} editingPersonId={1} editingName="Alice Updated" />);
    fireEvent.click(screen.getByText('Save'));
    expect(mockProps.onSavePersonName).toHaveBeenCalled();
  });

  test('calls onSetEditingName when typing in edit input', () => {
    render(<TeamMembersTable {...mockProps} editingPersonId={1} editingName="Alice" />);
    const input = screen.getByDisplayValue('Alice');
    fireEvent.change(input, { target: { value: 'Alice Updated' } });
    expect(mockProps.onSetEditingName).toHaveBeenCalledWith('Alice Updated');
  });

  test('calls onSavePersonName when pressing Enter in edit input', () => {
    render(<TeamMembersTable {...mockProps} editingPersonId={1} editingName="Alice" />);
    const input = screen.getByDisplayValue('Alice');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockProps.onSavePersonName).toHaveBeenCalled();
  });

  test('calls onCancelEditingName when pressing Escape in edit input', () => {
    render(<TeamMembersTable {...mockProps} editingPersonId={1} editingName="Alice" />);
    const input = screen.getByDisplayValue('Alice');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(mockProps.onCancelEditingName).toHaveBeenCalled();
  });

  test('calls onMovePersonUp when clicking up arrow', () => {
    render(<TeamMembersTable {...mockProps} />);
    const upButtons = screen.getAllByTitle('Move Up');
    fireEvent.click(upButtons[1]); // Click up on second person
    expect(mockProps.onMovePersonUp).toHaveBeenCalledWith(1);
  });

  test('calls onMovePersonDown when clicking down arrow', () => {
    render(<TeamMembersTable {...mockProps} />);
    const downButtons = screen.getAllByTitle('Move Down');
    fireEvent.click(downButtons[0]); // Click down on first person
    expect(mockProps.onMovePersonDown).toHaveBeenCalledWith(0);
  });

  test('disables up arrow for first person', () => {
    render(<TeamMembersTable {...mockProps} />);
    const upButtons = screen.getAllByTitle('Move Up');
    expect(upButtons[0]).toBeDisabled();
  });

  test('disables down arrow for last person', () => {
    render(<TeamMembersTable {...mockProps} />);
    const downButtons = screen.getAllByTitle('Move Down');
    expect(downButtons[downButtons.length - 1]).toBeDisabled();
  });

  test('calls onRemovePerson when clicking Remove button', () => {
    render(<TeamMembersTable {...mockProps} />);
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(mockProps.onRemovePerson).toHaveBeenCalledWith(1);
  });

  test('calls onUpdatePersonColor when changing color', () => {
    const { container } = render(<TeamMembersTable {...mockProps} />);
    const colorInputs = container.querySelectorAll('input[type="color"]');
    fireEvent.change(colorInputs[0], { target: { value: '#FF0000' } });
    expect(mockProps.onUpdatePersonColor).toHaveBeenCalledWith(1, '#ff0000');
  });
});
