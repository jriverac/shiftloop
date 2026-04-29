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
  meanGreenThreshold,
  meanYellowThreshold,
  stdDevGreenThreshold,
  stdDevYellowThreshold,
  onMeanGreenThresholdChange,
  onMeanYellowThresholdChange,
  onStdDevGreenThresholdChange,
  onStdDevYellowThresholdChange,
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

      {/* Threshold Settings */}
      <hr className="my-4" />
      <h5 className="card-title mb-3">Threshold Settings</h5>

      {/* Mean Weekend Days Thresholds */}
      <div className="mb-3">
        <label className="form-label fw-bold">Mean Weekend Days</label>
        <div className="row g-2">
          <div className="col-6">
            <label htmlFor="meanGreenThreshold" className="form-label small">
              <span className="badge bg-success">Green</span> (max)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="meanGreenThreshold"
              min="0"
              max="100"
              step="1"
              value={meanGreenThreshold}
              onChange={(e) => onMeanGreenThresholdChange(parseFloat(e.target.value))}
            />
          </div>
          <div className="col-6">
            <label htmlFor="meanYellowThreshold" className="form-label small">
              <span className="badge bg-warning text-dark">Yellow</span> (max)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="meanYellowThreshold"
              min="0"
              max="100"
              step="1"
              value={meanYellowThreshold}
              onChange={(e) => onMeanYellowThresholdChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <small className="text-muted">Values above yellow threshold are red</small>
      </div>

      {/* Standard Deviation Thresholds */}
      <div className="mb-3">
        <label className="form-label fw-bold">Standard Deviation</label>
        <div className="row g-2">
          <div className="col-6">
            <label htmlFor="stdDevGreenThreshold" className="form-label small">
              <span className="badge bg-success">Green</span> (max)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="stdDevGreenThreshold"
              min="0"
              max="20"
              step="0.1"
              value={stdDevGreenThreshold}
              onChange={(e) => onStdDevGreenThresholdChange(parseFloat(e.target.value))}
            />
          </div>
          <div className="col-6">
            <label htmlFor="stdDevYellowThreshold" className="form-label small">
              <span className="badge bg-warning text-dark">Yellow</span> (max)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="stdDevYellowThreshold"
              min="0"
              max="20"
              step="0.1"
              value={stdDevYellowThreshold}
              onChange={(e) => onStdDevYellowThresholdChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <small className="text-muted">Values above yellow threshold are red</small>
      </div>
    </div>
  );
};

export default ControlsPanel;