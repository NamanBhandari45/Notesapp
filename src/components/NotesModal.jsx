import React from "react";


function NotesModal({
  modalIsOpen,
  setIsOpen,
  inputText,
  setInputText,
  selectedColor,
  setSelectedColor,
  addGroups,
}) {
  return (
    <div>
      {/* Modal content and form for creating a new notes group */}
      <div className={modalIsOpen ? "modal open" : "modal"}>
        <div className="modal-content">
          <h2>Create New Notes Group</h2>
          <div className="group-name">
            <label>Group Name:</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="color-selection">
            <label>Select Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="#B38BFA">Purple</option>
              <option value="#FF79F2">Pink</option>
              <option value="#43E6FC">Turquoise</option>
              <option value="#F19576">Salmon</option>
              <option value="#0047FF">Blue</option>
              <option value="#6691FF">Light Blue</option>
            </select>
          </div>
          <button onClick={addGroups}>Create Group</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NotesModal;
