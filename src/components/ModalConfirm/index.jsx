import { useState } from "react";
import { Modal } from "../Modal";

import "./style.scss"

export function ModalConfirm({ onConfirmClick, buttonTitle, className, children, title }) {
  const [show, setShow] = useState(false)

  function handleClose() {
    setShow(false)
  }
  function handleOpen() {
    setShow(true)
  }

  function handleConfirm() {
    handleClose()
    onConfirmClick()
  }

  return (
    <>
      <button
        className={`open-modal-button ${className}`}
        onClick={handleOpen}>
        {buttonTitle}
      </button>
      <Modal.Root
        show={show}
        onClose={handleClose}
        title={title}
      >
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-confirm">
            <button onClick={handleClose} className="no-button">Não</button>
            <button onClick={handleConfirm} className="yes-button">Sim</button>
          </div>
        </Modal.Footer>
      </Modal.Root>
    </>
  )
}