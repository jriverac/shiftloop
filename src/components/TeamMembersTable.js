import React from 'react';
import './TeamMembersTable.css';

const TeamMembersTable = ({
  peopleList,
  weekendDaysPerPerson,
  editingPersonId,
  editingName,
  onUpdatePersonColor,
  onStartEditingName,
  onSetEditingName,
  onSavePersonName,
  onCancelEditingName,
  onMovePersonUp,
  onMovePersonDown,
  onRemovePerson,
  className = ''
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSavePersonName();
    }
    if (e.key === 'Escape') {
      onCancelEditingName();
    }
  };

  if (!peopleList || peopleList.length === 0) {
    return (
      <div className={`team-members-table ${className}`}>
        <div className="text-muted text-center py-4">
          <i>No team members added yet. Use the input above to add team members.</i>
        </div>
      </div>
    );
  }

  return (
    <div className={`team-members-table ${className}`}>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Color</th>
              <th>Person</th>
              <th>Weekend Call Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((person, index) => (
              <tr key={person.id}>
                <td>
                  <input 
                    type="color" 
                    className="form-control form-control-color" 
                    value={person.color}
                    onChange={(e) => onUpdatePersonColor(person.id, e.target.value)}
                    style={{ width: '40px', height: '40px' }}
                  />
                </td>
                <td>
                  {editingPersonId === person.id ? (
                    <div className="input-group input-group-sm">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editingName}
                        onChange={(e) => onSetEditingName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                      <button 
                        className="btn btn-success btn-sm" 
                        type="button"
                        onClick={onSavePersonName}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="cursor-pointer" 
                      onClick={() => onStartEditingName(person)}
                    >
                      {person.name}
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge bg-primary">
                    {weekendDaysPerPerson[index] || 0}
                  </span>
                </td>
                <td>
                  <div className="btn-group btn-group-sm" role="group">
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => onMovePersonUp(index)}
                      disabled={index === 0}
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => onMovePersonDown(index)}
                      disabled={index === peopleList.length - 1}
                      title="Move Down"
                    >
                      ↓
                    </button>
                    <button 
                      className="btn btn-outline-primary btn-sm" 
                      type="button"
                      onClick={() => onStartEditingName(person)}
                    >
                      Rename
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      type="button"
                      onClick={() => onRemovePerson(person.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembersTable;