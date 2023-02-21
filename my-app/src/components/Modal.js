import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen }) => {
  const sharing = () => {};
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People with access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            ></button>
            <button onClick={() => sharing}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
