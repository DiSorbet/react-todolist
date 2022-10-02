import React, { useEffect } from "react";

function Modal({ modalContent, modalType, modal, setModal }) {
  useEffect(() => {
    const timeout = setTimeout(() => setModal(false), 3000);
    return () => clearTimeout(timeout);
  });
  return (
    <div className={`modal ${modalType}`}>
      <p> {modalContent}</p>
    </div>
  );
}

export default Modal;
