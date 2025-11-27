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

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      {/* Overlay */}
      <div className="modal-background" onClick={onClose}></div>

      {/* Modal card */}
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add a Rule</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>

        <section className="modal-card-body">
          <small className="has-text-grey">
            Add a search qualifier from GitHub
          </small>
          <hr />

          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={selectedParam}
                  onChange={(e) => setSelectedParam(e.target.value)}
                >
                  <option value="">-- Choose --</option>
                  {availableParams.map((p) => (
                    <option key={p} value={p}>
                      {p.replace(/^./, (char) => char.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <footer className="modal-card-foot is-centered is-justify-content-center">
          <div className="field has-addons">
            <div className="control">
              <button
                className="button is-success"
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
            <div className="control">
              <button className="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
