// Based on example of this : https://www.w3schools.com/howto/howto_css_modals.asp

import { useState } from "react";

type AddRuleProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (param: string) => void;
  availableParams: string[];
};

export function AddRule({
  isOpen,
  onClose,
  onAdd,
  availableParams,
}: AddRuleProps) {
  const [selectedParam, setSelectedParam] = useState("");

  // https://dev.to/cristiansifuentes/mastering-mouse-events-in-react-typescript-click-drag-hover-and-beyond-21a6
  // If the user clicks outside the modal/rule, will just click the Window
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {/* Taken from W3Schools */}
      <style>{`
        .modal {
          display: ${isOpen ? "flex" : "none"};
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
          background-color: #fefefe;
          padding: 20px;
          border: 1px solid #888181ff;
          width: 80%;
          max-width: 500px;
          position: relative;
          color: black;
        }
        .close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 28px;
          font-weight: bold;
          color: #aaaaaa;
          cursor: pointer;
        }
        .close:hover,
        .close:focus {
          color: #000;
        }
      `}</style>
      {/* ----- Trigger button ----- */}
      {/* ----- Modal overlay ----- */}
      <div className="modal" onClick={handleOverlayClick}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h3>Add a Rule</h3>
          <small>Add a search qualifier from Github</small>
          <hr></hr>
          <select
            value={selectedParam}
            onChange={(e) => setSelectedParam(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {availableParams.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (selectedParam) {
                onAdd(selectedParam);
                setSelectedParam("");
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
