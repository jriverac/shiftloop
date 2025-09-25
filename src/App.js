import React, { useState, useEffect, useCallback } from 'react';
import Tracker from './components/Tracker';
import Graph from './components/Graph';
import ControlsPanel from './components/ControlsPanel';
import TeamMemberInput from './components/TeamMemberInput';
import TeamMembersTable from './components/TeamMembersTable';
import MeanCard from './components/MeanCard';
import StdDevCard from './components/StdDevCard';
import './App.css';

const App = () => {
  // State for team management
  const [peopleList, setPeopleList] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editingName, setEditingName] = useState('');
  
  // State for schedule settings
  const [startDate, setStartDate] = useState('');
  const [shiftLength, setShiftLength] = useState(7);
  const [includeFriday, setIncludeFriday] = useState(false);
  const [useNext12Months, setUseNext12Months] = useState(false);
  
  // State for calculated data
  const [weekendDaysPerPerson, setWeekendDaysPerPerson] = useState([]);
  const [dailySchedule, setDailySchedule] = useState([]);
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(0);
  
  // Color palette for team members
  const colorPalette = [
    '#E69F00', '#56B4E9', '#009E73', '#F0E442',
    '#0072B2', '#D55E00', '#CC79A7'
  ];
  
  // Storage keys
  const PEOPLE_STORAGE_KEY = 'callSchedulerPeople';
  const SETTINGS_STORAGE_KEY = 'callSchedulerSettings';
  
  // Load data from localStorage on component mount
  useEffect(() => {
    loadSettings();
    loadPeople();
  }, []);
  
  // Recalculate schedule when relevant data changes
  useEffect(() => {
    if (peopleList.length > 0 && startDate) {
      calculateSchedule();
    }
  }, [peopleList, startDate, shiftLength, includeFriday, useNext12Months]);
  
  const loadSettings = () => {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      
      if (settings.startDate) {
        setStartDate(settings.startDate);
      } else {
        setStartDate(new Date().toISOString().split('T')[0]);
      }
      
      if (settings.shiftLength) {
        setShiftLength(settings.shiftLength);
      }
      
      if (settings.includeFriday !== undefined) {
        setIncludeFriday(settings.includeFriday);
      }
      
      if (settings.useNext12Months !== undefined) {
        setUseNext12Months(settings.useNext12Months);
      }
    } else {
      setStartDate(new Date().toISOString().split('T')[0]);
    }
  };
  
  const loadPeople = () => {
    const storedPeople = localStorage.getItem(PEOPLE_STORAGE_KEY);
    if (storedPeople) {
      setPeopleList(JSON.parse(storedPeople));
    }
  };
  
  const saveSettings = useCallback(() => {
    const settings = {
      startDate,
      shiftLength,
      includeFriday,
      useNext12Months
    };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [startDate, shiftLength, includeFriday, useNext12Months]);
  
  const savePeople = useCallback(() => {
    localStorage.setItem(PEOPLE_STORAGE_KEY, JSON.stringify(peopleList));
  }, [peopleList]);
  
  // Save settings whenever they change
  useEffect(() => {
    saveSettings();
  }, [saveSettings]);
  
  // Save people whenever the list changes
  useEffect(() => {
    savePeople();
  }, [savePeople]);
  
  const addPerson = () => {
    const name = newPersonName.trim();
    if (name) {
      const defaultColor = colorPalette[peopleList.length % colorPalette.length];
      const newPerson = {
        id: Date.now(),
        name: name,
        color: defaultColor
      };
      setPeopleList([...peopleList, newPerson]);
      setNewPersonName('');
    }
  };
  
  const removePerson = (id) => {
    setPeopleList(peopleList.filter(person => person.id !== id));
  };
  
  const updatePersonColor = (id, color) => {
    setPeopleList(peopleList.map(person => 
      person.id === id ? { ...person, color } : person
    ));
  };
  
  const startEditingName = (person) => {
    setEditingPersonId(person.id);
    setEditingName(person.name);
  };
  
  const savePersonName = () => {
    if (editingName.trim()) {
      setPeopleList(peopleList.map(person => 
        person.id === editingPersonId ? { ...person, name: editingName.trim() } : person
      ));
    }
    setEditingPersonId(null);
    setEditingName('');
  };
  
  const cancelEditingName = () => {
    setEditingPersonId(null);
    setEditingName('');
  };
  
  const movePersonUp = (index) => {
    if (index > 0) {
      const newList = [...peopleList];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      setPeopleList(newList);
    }
  };
  
  const movePersonDown = (index) => {
    if (index < peopleList.length - 1) {
      const newList = [...peopleList];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setPeopleList(newList);
    }
  };
  
  const calculateSchedule = () => {
    const peopleCount = peopleList.length;
    if (peopleCount === 0) {
      setWeekendDaysPerPerson([]);
      setDailySchedule([]);
      setMean(0);
      setStdDev(0);
      return;
    }
    
    const totalDaysInYear = 365;
    const newWeekendDaysPerPerson = new Array(peopleCount).fill(0);
    const newDailySchedule = new Array(totalDaysInYear).fill(-1);
    
    const currentStartDate = new Date(startDate + 'T00:00:00');
    
    // Assign team members to shifts
    for (let day = 0; day < totalDaysInYear; day++) {
      const shiftNumber = Math.floor(day / shiftLength);
      const personIndex = shiftNumber % peopleCount;
      newDailySchedule[day] = personIndex;
      
      const currentDate = new Date(currentStartDate);
      currentDate.setDate(currentStartDate.getDate() + day);
      const dayOfWeek = currentDate.getDay();
      
      let isWeekendDay = false;
      if (includeFriday) {
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
          isWeekendDay = true;
        }
      } else {
        if (dayOfWeek === 6 || dayOfWeek === 0) {
          isWeekendDay = true;
        }
      }
      
      if (isWeekendDay) {
        newWeekendDaysPerPerson[personIndex]++;
      }
    }
    
    // Calculate statistics
    const totalDaysOnCallSum = newWeekendDaysPerPerson.reduce((sum, days) => sum + days, 0);
    const newMean = totalDaysOnCallSum / peopleCount;
    const sumOfSquares = newWeekendDaysPerPerson.reduce(
      (sum, days) => sum + Math.pow(days - newMean, 2),
      0
    );
    const newStdDev = Math.sqrt(sumOfSquares / peopleCount);
    
    setWeekendDaysPerPerson(newWeekendDaysPerPerson);
    setDailySchedule(newDailySchedule);
    setMean(newMean);
    setStdDev(newStdDev);
  };
  
  
  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container-fluid">
        {/* Tracker Chart - Full Width Row */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <Tracker 
                  peopleList={peopleList}
                  dailySchedule={dailySchedule}
                  useNext12Months={useNext12Months}
                  startDate={startDate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Graph and Controls Row */}
        <div className="row mb-4">
          {/* Bell Curve Graph */}
          <div className="col-lg-8 col-md-12 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <Graph 
                  peopleList={peopleList}
                  mean={mean}
                  stdDev={stdDev}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="col-lg-4 col-md-12 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <ControlsPanel
                  useNext12Months={useNext12Months}
                  onToggleNext12Months={setUseNext12Months}
                  startDate={startDate}
                  onStartDateChange={setStartDate}
                  shiftLength={shiftLength}
                  onShiftLengthChange={setShiftLength}
                  includeFriday={includeFriday}
                  onToggleIncludeFriday={setIncludeFriday}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Members and Results Row */}
        <div className="row">
          {/* Team Members */}
          <div className="col-lg-6 col-md-12 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-3">Team Members</h4>
                
                <TeamMemberInput
                  value={newPersonName}
                  onChange={setNewPersonName}
                  onAdd={addPerson}
                  placeholder="Enter name"
                  buttonText="Add"
                />

                <TeamMembersTable
                  peopleList={peopleList}
                  weekendDaysPerPerson={weekendDaysPerPerson}
                  editingPersonId={editingPersonId}
                  editingName={editingName}
                  onUpdatePersonColor={updatePersonColor}
                  onStartEditingName={startEditingName}
                  onSetEditingName={setEditingName}
                  onSavePersonName={savePersonName}
                  onCancelEditingName={cancelEditingName}
                  onMovePersonUp={movePersonUp}
                  onMovePersonDown={movePersonDown}
                  onRemovePerson={removePerson}
                />
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="col-lg-6 col-md-12 mb-3">
            <div className="row g-3">
              <div className="col-6">
                <MeanCard
                  value={mean}
                  goodThreshold={15}
                  warningThreshold={20}
                />
              </div>
              <div className="col-6">
                <StdDevCard
                  value={stdDev}
                  goodThreshold={1}
                  warningThreshold={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
