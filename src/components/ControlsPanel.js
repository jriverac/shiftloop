import React from 'react';
import './ControlsPanel.css';

const ControlsPanel = ({
  useNext12Months,
  onToggleNext12Months,
  startDate,
  onStartDateChange,
  shiftLength,
  onShiftLengthChange,
  includeFriday,
  onToggleIncludeFriday,
  className = ''
}) => {
  return (
    <div className={`controls-panel ${className}`}>
      <h4 className="card-title mb-3">Controls</h4>
      
      {/* Date Mode Toggle */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <span className="small">Specific Start Date</span>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="dateModeToggle"
              checked={useNext12Months}
              onChange={(e) => onToggleNext12Months(e.target.checked)}
            />
          </div>
          <span className="small">Next 13 Months</span>
        </div>
      </div>

      {/* Start Date Input */}
      {!useNext12Months && (
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input 
            type="date" 
            className="form-control" 
            id="startDate"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
      )}

      {/* Shift Length */}
      <div className="mb-3">
        <label htmlFor="shiftLength" className="form-label">Shift Length (days):</label>
        <input 
          type="number" 
          className="form-control" 
          id="shiftLength"
          min="1" 
          max="14" 
          value={shiftLength}
          onChange={(e) => onShiftLengthChange(parseInt(e.target.value))}
        />
      </div>

      {/* Include Friday */}
      <div className="mb-3">
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="includeFriday"
            checked={includeFriday}
            onChange={(e) => onToggleIncludeFriday(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="includeFriday">
            Include Friday
          </label>
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel;