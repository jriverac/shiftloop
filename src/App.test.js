import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders tracker chart heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /Annual Call Chart/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders team member input section', () => {
    render(<App />);
    const addButton = screen.getByRole('button', { name: /Add/i });
    expect(addButton).toBeInTheDocument();
  });

  test('renders statistics cards', () => {
    render(<App />);
    const meanCards = screen.getAllByText(/Mean Weekend Days/i);
    const stdDevCards = screen.getAllByText(/Standard Deviation/i);
    expect(meanCards.length).toBeGreaterThan(0);
    expect(stdDevCards.length).toBeGreaterThan(0);
  });

  test('renders control panel', () => {
    render(<App />);
    const shiftLengthControl = screen.getByText(/Shift Length/i);
    expect(shiftLengthControl).toBeInTheDocument();
  });

  describe('localStorage functionality', () => {
    test('saves all configuration settings to localStorage', async () => {
      render(<App />);

      // Change various settings
      const shiftLengthInput = screen.getByLabelText('Shift Length (days):');
      fireEvent.change(shiftLengthInput, { target: { value: '10' } });

      const includeFridayCheckbox = screen.getByLabelText('Include Friday');
      fireEvent.click(includeFridayCheckbox);

      const meanGreenInput = document.getElementById('meanGreenThreshold');
      fireEvent.change(meanGreenInput, { target: { value: '12' } });

      // Wait for settings to be saved
      await waitFor(() => {
        const storedSettings = localStorage.getItem('callSchedulerSettings');
        expect(storedSettings).not.toBeNull();

        const parsedSettings = JSON.parse(storedSettings);
        expect(parsedSettings.shiftLength).toBe(10);
        expect(parsedSettings.includeFriday).toBe(true);
        expect(parsedSettings.meanGreenThreshold).toBe(12);
        expect(parsedSettings.startDate).toBeDefined();
        expect(parsedSettings.useNext12Months).toBeDefined();
        expect(parsedSettings.meanYellowThreshold).toBeDefined();
        expect(parsedSettings.stdDevGreenThreshold).toBeDefined();
        expect(parsedSettings.stdDevYellowThreshold).toBeDefined();
      });
    });

    test('loads all configuration settings from localStorage on mount', () => {
      // Pre-populate localStorage with settings
      const mockSettings = {
        startDate: '2025-06-01',
        shiftLength: 14,
        includeFriday: true,
        useNext12Months: true,
        meanGreenThreshold: 10,
        meanYellowThreshold: 18,
        stdDevGreenThreshold: 0.5,
        stdDevYellowThreshold: 2.5
      };
      localStorage.setItem('callSchedulerSettings', JSON.stringify(mockSettings));

      render(<App />);

      // Verify settings were loaded
      const shiftLengthInput = screen.getByLabelText('Shift Length (days):');
      expect(shiftLengthInput).toHaveValue(14);

      const includeFridayCheckbox = screen.getByLabelText('Include Friday');
      expect(includeFridayCheckbox).toBeChecked();

      const meanGreenInput = document.getElementById('meanGreenThreshold');
      const meanYellowInput = document.getElementById('meanYellowThreshold');
      const stdDevGreenInput = document.getElementById('stdDevGreenThreshold');
      const stdDevYellowInput = document.getElementById('stdDevYellowThreshold');

      expect(meanGreenInput).toHaveValue(10);
      expect(meanYellowInput).toHaveValue(18);
      expect(stdDevGreenInput).toHaveValue(0.5);
      expect(stdDevYellowInput).toHaveValue(2.5);
    });

    test('does not overwrite localStorage on initial mount', () => {
      // Pre-populate localStorage with team members
      const mockPeople = [
        { id: 1, name: 'Alice', color: '#E69F00' },
        { id: 2, name: 'Bob', color: '#56B4E9' }
      ];
      localStorage.setItem('callSchedulerPeople', JSON.stringify(mockPeople));

      // Render the app
      render(<App />);

      // Verify localStorage was NOT overwritten with empty array
      const storedData = localStorage.getItem('callSchedulerPeople');
      const parsedData = JSON.parse(storedData);

      expect(parsedData).toHaveLength(2);
      expect(parsedData[0].name).toBe('Alice');
      expect(parsedData[1].name).toBe('Bob');
    });

    test('stores team members in localStorage when added', async () => {
      render(<App />);

      // Find the input and add button
      const input = screen.getByPlaceholderText(/Enter name/i);
      const addButton = screen.getByRole('button', { name: /Add/i });

      // Add a team member
      fireEvent.change(input, { target: { value: 'Alice' } });
      fireEvent.click(addButton);

      // Wait for localStorage to be updated
      await waitFor(() => {
        const storedData = localStorage.getItem('callSchedulerPeople');
        expect(storedData).not.toBeNull();

        const parsedData = JSON.parse(storedData);
        expect(parsedData).toHaveLength(1);
        expect(parsedData[0].name).toBe('Alice');
        expect(parsedData[0].color).toBeDefined();
        expect(parsedData[0].id).toBeDefined();
      });
    });

    test('stores multiple team members in localStorage', async () => {
      render(<App />);

      const input = screen.getByPlaceholderText(/Enter name/i);
      const addButton = screen.getByRole('button', { name: /Add/i });

      // Add multiple team members
      fireEvent.change(input, { target: { value: 'Alice' } });
      fireEvent.click(addButton);

      fireEvent.change(input, { target: { value: 'Bob' } });
      fireEvent.click(addButton);

      fireEvent.change(input, { target: { value: 'Charlie' } });
      fireEvent.click(addButton);

      // Wait for localStorage to be updated
      await waitFor(() => {
        const storedData = localStorage.getItem('callSchedulerPeople');
        const parsedData = JSON.parse(storedData);

        expect(parsedData).toHaveLength(3);
        expect(parsedData[0].name).toBe('Alice');
        expect(parsedData[1].name).toBe('Bob');
        expect(parsedData[2].name).toBe('Charlie');
      });
    });

    test('loads team members from localStorage on mount', () => {
      // Pre-populate localStorage
      const mockPeople = [
        { id: 1, name: 'Alice', color: '#E69F00' },
        { id: 2, name: 'Bob', color: '#56B4E9' }
      ];
      localStorage.setItem('callSchedulerPeople', JSON.stringify(mockPeople));

      // Render app
      render(<App />);

      // Verify team members are displayed (there may be multiple instances)
      const aliceElements = screen.getAllByText('Alice');
      const bobElements = screen.getAllByText('Bob');
      expect(aliceElements.length).toBeGreaterThan(0);
      expect(bobElements.length).toBeGreaterThan(0);
    });

    test('updates localStorage when team member is removed', async () => {
      // Pre-populate localStorage
      const mockPeople = [
        { id: 1, name: 'Alice', color: '#E69F00' },
        { id: 2, name: 'Bob', color: '#56B4E9' }
      ];
      localStorage.setItem('callSchedulerPeople', JSON.stringify(mockPeople));

      render(<App />);

      // Find and click the first Remove button
      const removeButtons = screen.getAllByText('Remove');
      fireEvent.click(removeButtons[0]);

      // Wait for localStorage to be updated
      await waitFor(() => {
        const storedData = localStorage.getItem('callSchedulerPeople');
        const parsedData = JSON.parse(storedData);

        expect(parsedData).toHaveLength(1);
        expect(parsedData[0].name).toBe('Bob');
      });
    });

    test('updates localStorage when team member color is changed', async () => {
      // Pre-populate localStorage
      const mockPeople = [
        { id: 1, name: 'Alice', color: '#E69F00' }
      ];
      localStorage.setItem('callSchedulerPeople', JSON.stringify(mockPeople));

      const { container } = render(<App />);

      // Find and change the color input
      const colorInput = container.querySelector('input[type="color"]');
      fireEvent.change(colorInput, { target: { value: '#FF0000' } });

      // Wait for localStorage to be updated
      await waitFor(() => {
        const storedData = localStorage.getItem('callSchedulerPeople');
        const parsedData = JSON.parse(storedData);

        expect(parsedData[0].color).toBe('#ff0000');
      });
    });

    test('updates localStorage when team member is renamed', async () => {
      // Pre-populate localStorage
      const mockPeople = [
        { id: 1, name: 'Alice', color: '#E69F00' }
      ];
      localStorage.setItem('callSchedulerPeople', JSON.stringify(mockPeople));

      render(<App />);

      // Click the Rename button instead
      const renameButton = screen.getByText('Rename');
      fireEvent.click(renameButton);

      // Find the edit input and change the name
      const editInput = screen.getByDisplayValue('Alice');
      fireEvent.change(editInput, { target: { value: 'Alice Smith' } });

      // Click the Save button
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      // Wait for localStorage to be updated
      await waitFor(() => {
        const storedData = localStorage.getItem('callSchedulerPeople');
        const parsedData = JSON.parse(storedData);

        expect(parsedData[0].name).toBe('Alice Smith');
      });
    });

    test('updates localStorage when team members are reordered', async () => {
      // Pre-populate localStorage
      const mockPeople = [
        { id: 1, name: 'Alice', color: '#E69F00' },
        { id: 2, name: 'Bob', color: '#56B4E9' }
      ];
      localStorage.setItem('callSchedulerPeople', JSON.stringify(mockPeople));

      render(<App />);

      // Find the down arrow for Alice (first person)
      const downButtons = screen.getAllByTitle('Move Down');
      fireEvent.click(downButtons[0]);

      // Wait for localStorage to be updated
      await waitFor(() => {
        const storedData = localStorage.getItem('callSchedulerPeople');
        const parsedData = JSON.parse(storedData);

        expect(parsedData[0].name).toBe('Bob');
        expect(parsedData[1].name).toBe('Alice');
      });
    });
  });
});
