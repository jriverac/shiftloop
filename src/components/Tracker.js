import React, { useEffect, useRef } from 'react';
import './Tracker.css';

const Tracker = ({ 
  peopleList, 
  dailySchedule, 
  useNext12Months, 
  startDate 
}) => {
  const chartGridWrapperRef = useRef(null);
  
  useEffect(() => {
    if (!chartGridWrapperRef.current) return;
    
    generateChart();
  }, [peopleList, dailySchedule, useNext12Months, startDate]);
  
  const generateChart = () => {
    if (!chartGridWrapperRef.current || !peopleList.length) {
      chartGridWrapperRef.current.innerHTML = '';
      return;
    }
    
    chartGridWrapperRef.current.innerHTML = '';
    
    const totalWeeksToShow = 53;
    const totalDaysInYear = 365;
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create month header
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    
    // Create chart grid
    const chartGrid = document.createElement('div');
    chartGrid.className = 'chart-grid';
    
    // Determine chart dates
    let chartStartDate, chartEndDate;
    const currentStartDate = new Date(startDate);
    
    if (useNext12Months) {
      chartStartDate = new Date(currentStartDate);
      const dayOfWeek = chartStartDate.getDay();
      chartStartDate.setDate(chartStartDate.getDate() - dayOfWeek);
      
      chartEndDate = new Date(chartStartDate);
      chartEndDate.setDate(chartStartDate.getDate() + totalWeeksToShow * 7);
    } else {
      chartStartDate = new Date(currentStartDate.getFullYear(), 0, 1);
      chartEndDate = new Date(currentStartDate.getFullYear() + 1, 0, 0);
    }
    
    // Generate month labels
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const weekWidth = 100 / totalWeeksToShow;
    
    // Track months to display
    const months = [];
    let currentMonth = new Date(chartStartDate);
    
    while (currentMonth < chartEndDate) {
      const monthIndex = currentMonth.getMonth();
      const year = currentMonth.getFullYear();
      const monthStart = new Date(year, monthIndex, 1);
      const monthEnd = new Date(year, monthIndex + 1, 0);
      
      const startWeek = Math.floor(
        (monthStart - chartStartDate) / (7 * 24 * 60 * 60 * 1000)
      );
      const endWeek = Math.min(
        Math.floor((monthEnd - chartStartDate) / (7 * 24 * 60 * 60 * 1000)),
        totalWeeksToShow - 1
      );
      
      if (startWeek < totalWeeksToShow && endWeek >= 0) {
        months.push({
          name: monthNames[monthIndex] + 
                (year !== currentStartDate.getFullYear() 
                  ? ` '${year.toString().substr(2)}` 
                  : ''),
          startWeek: Math.max(0, startWeek),
          endWeek: endWeek,
          weeks: endWeek - Math.max(0, startWeek) + 1
        });
      }
      
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }
    
    // Create month labels
    for (const monthInfo of months) {
      const monthLabel = document.createElement('div');
      monthLabel.className = 'month-label';
      monthLabel.textContent = monthInfo.name;
      monthLabel.style.width = `${monthInfo.weeks * weekWidth}%`;
      monthHeader.appendChild(monthLabel);
    }
    
    chartGridWrapperRef.current.appendChild(monthHeader);
    chartGridWrapperRef.current.appendChild(chartGrid);
    
    // Create the GitHub-style tracking chart
    for (let dayOfWeekIndex = 0; dayOfWeekIndex < 7; dayOfWeekIndex++) {
      // Add day label
      const dayLabel = document.createElement('div');
      dayLabel.className = 'day-label';
      dayLabel.textContent = dayNames[dayOfWeekIndex];
      chartGrid.appendChild(dayLabel);
      
      // For each week
      for (let week = 0; week < totalWeeksToShow; week++) {
        const currentDate = new Date(chartStartDate);
        currentDate.setDate(chartStartDate.getDate() + week * 7 + dayOfWeekIndex);
        
        const dayBox = document.createElement('div');
        dayBox.className = 'day-box';
        
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        if (currentDate < currentStartDate) {
          dayBox.classList.add('gray-out');
          const tooltip = document.createElement('span');
          tooltip.className = 'tooltip';
          tooltip.textContent = formattedDate;
          dayBox.appendChild(tooltip);
        } else {
          const scheduleIndex = Math.floor(
            (currentDate - currentStartDate) / (1000 * 60 * 60 * 24)
          );
          
          if (scheduleIndex < totalDaysInYear && dailySchedule[scheduleIndex] !== undefined) {
            const onCallPersonIndex = dailySchedule[scheduleIndex];
            
            if (onCallPersonIndex !== -1 && peopleList[onCallPersonIndex]) {
              dayBox.style.backgroundColor = peopleList[onCallPersonIndex].color;
              
              const tooltip = document.createElement('span');
              tooltip.className = 'tooltip';
              tooltip.textContent = `${peopleList[onCallPersonIndex].name} (${formattedDate})`;
              dayBox.appendChild(tooltip);
            }
          }
        }
        
        chartGrid.appendChild(dayBox);
      }
    }
  };
  
  const getTitle = () => {
    return useNext12Months ? 'Next 12 Months Call Chart' : 'Annual Call Chart';
  };
  
  return (
    <div className="tracker-chart-container w-100">
      <h2 className="h4 mb-3">{getTitle()}</h2>
      <div ref={chartGridWrapperRef}></div>
    </div>
  );
};

export default Tracker;