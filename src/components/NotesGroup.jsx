import React from 'react';

function NotesGroup({
  inputData,
  selectedColor,
  selectedGroup,
  notes,
  notesGroup,
  addNotes,
  handleSelectedGroup,
  setNotes,
}) {
 
  const selectedGroupData = inputData[selectedGroup];

  return (
    <div>
      <div>
       
        <h2>Selected Group:</h2>
        <div>
          <div
            style={{
              backgroundColor: selectedGroupData.color,
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          ></div>
          <span>{selectedGroupData.text}</span>
        </div>
      </div>

      <div>
       
        <h3>Notes:</h3>
        <ul>
          {notesGroup[selectedGroupData.text].map((note, index) => (
            <li key={index}>
              <div>
                <p>{note.dateTime}</p>
              </div>
              <div>
                <p>{note.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
      
        <h3>Add a New Note:</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addNotes(e);
            }
          }}
        />
        <button onClick={addNotes}>Add Note</button>
      </div>
    </div>
  );
}

export default NotesGroup;
