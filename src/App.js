import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./components/Model.css";
import "./components/Notes.css";
import Add from  './components/icons/add.svg'
import Lock from './components/icons/lock.svg'
import Logo from './components/icons/logo.png'
import Send from './components/icons/send.svg'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "35%",
    height: "31%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Notes() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [colors] = useState([
    {
      id: 1,
      color: "#B38BFA",
    },
    {
      id: 2,
      color: "#FF79F2",
    },
    {
      id: 3,
      color: "#43E6FC",
    },
    {
      id: 4,
      color: "#F19576",
    },
    {
      id: 5,
      color: "#0047FF",
    },
    {
      id: 6,
      color: "#6691FF",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [inputData, setInputData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState("");
  const [notesGroup, setNotesGroup] = useState({});

  const addGroups = (e) => {
    e.preventDefault();
    const groups = { text: inputText, color: selectedColor };
    const updatedData = [...inputData, groups];
    setInputData(updatedData);
    localStorage.setItem("groups", JSON.stringify(updatedData));
    setInputText("");
    setNotesGroup((prevNotes) => ({
      ...prevNotes,
      [inputText]: [],
    }));
  };

  const addNotes = (e) => {
    e.preventDefault();
    if (selectedGroup !== null) {
      const now = new Date();
      const formattedDateTime = `${now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })},
       ${now.toLocaleDateString([], {
         day: "numeric",
         month: "long",
         year: "numeric",
       })}`;
      setNotesGroup((prevNotesGroup) => {
        const updatedGroupNotes = [
          ...prevNotesGroup[inputData[selectedGroup].text],
          { note: notes, dateTime: formattedDateTime },
        ];
        const updatedNotes = {
          ...prevNotesGroup,
          [inputData[selectedGroup].text]: updatedGroupNotes,
        };
        localStorage.setItem("notesGroups", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      setNotes("");
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("groups"));
    if (storedData) {
      setInputData(storedData);
      const initialGroupNotes = {};
      storedData.forEach((group) => {
        initialGroupNotes[group.text] = [];
      });

      const storedNotesGroups = JSON.parse(localStorage.getItem("notesGroups"));
      if (storedNotesGroups) {
        setNotesGroup(storedNotesGroups);
      } else {
        setNotesGroup(initialGroupNotes);
      }
    }
  }, []);

  return (
    <>
      <div className="notes-page">
        <div className="add-notes-group">
          <h1 className="heading">Pocket Notes</h1>
          <button className="add-btn" onClick={openModal}>
            <img
              src={Add}
              alt="add-icon"
              className="add-icon"
            ></img>
            Create Notes Group
          </button>

          <div className="popup-window">
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <form>
                <h1 className="popup-heading">Create New Notes Group</h1>
                <span className="group-name-text">Group Name</span>
                <input
                  placeholder="Enter your group name..."
                  className="group-name-input"
                  onChange={(e) => setInputText(e.target.value)}
                  value={inputText}
                ></input>
                <div className="color-section">
                  <span className="choose-color-text">Choose Color</span>
                  <div className="choose-colors">
                    {colors.map((color) => (
                      <div
                        className={`colors ${
                          selectedColor === color ? "selected" : ""
                        }`}
                        key={color.id}
                        style={{ backgroundColor: color.color }}
                        onClick={() => setSelectedColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>
                <button className="create-btn" onClick={addGroups}>
                  Create
                </button>
              </form>
            </Modal>
          </div>

          <div className="groups-display">
            {inputData.map((input, index) => (
              <div
                key={index}
                className="group-container"
                onClick={() => setSelectedGroup(index)}
              >
                <div
                  className="profile"
                  style={{ backgroundColor: input.color.color }}
                >
                  {input.text.slice(0, 2).toUpperCase()}
                </div>
                <div className="group-text">{input.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="initial-display">
          {selectedGroup !== null && (
            <div className="notes-taking-section">
              <div className="notes-section">
                <div className="profile-section">
                  <div
                    className="notes-profile"
                    style={{
                      backgroundColor: inputData[selectedGroup].color.color,
                    }}
                  >
                    {inputData[selectedGroup].text.slice(0, 2).toUpperCase()}
                  </div>
                  <h2 className="notes-group-name">
                    {inputData[selectedGroup].text}
                  </h2>
                </div>
                {notesGroup[inputData[selectedGroup].text].map((notes, index) => (
  <div key={index} className="notes-display">
    <div className="display-datetime">
      <p className="note-time">{notes.dateTime}</p>
    </div>
    <div className="note">{notes.note}</div>
  </div>
))}

                <div className="textarea">
                  <img
                    src={Send}
                    alt="icon"
                    className="sendicon"
                    onClick={addNotes}
                  />
                  <textarea
                    className="notes-input"
                    placeholder="Enter your text here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        addNotes(e);
                      }
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {selectedGroup === null && (
            <div className="desktop-display">
              <img
                src={Logo}
                alt="display-icon"
                className="display-logo"
              ></img>
              <h1 className="display-heading">Pocket Notes</h1>
              <p className="display-text">
                Send and receive messages without keeping your phone online.
                <br></br>
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
              <footer className="encrypt-text">
                <img
                  src={Lock}
                  alt="encryption-logo"
                  className="lock-icon"
                ></img>
                <footer className="footer">end-to-end encrypted</footer>
              </footer>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
