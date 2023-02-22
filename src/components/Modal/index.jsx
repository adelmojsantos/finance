import { X } from "phosphor-react"
import { useEffect } from "react"
import "./style.scss"

function ModalRoot({
  children,
  onClose,
  show,
  title,
  width,
}) {

  useEffect(() => {
    function closeOnEscapeKeyDown(e) {
      if ((e.charCode || e.keyCode) === 27) {
        onClose()
      }
    }

    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanUp() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}
        style={{
          width: width ?? '20rem',
        }}>
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            <X size={16} />
          </span>
          <h4 className="modal-title">{title}</h4>
        </div>
        {children}
      </div>
    </div>
  )
}

function ModalBody({ children }) {
  return (
    <div className="modal-body">
      {children}
    </div>
  )
}

function ModalFooter({ children }) {
  return (
    <div className="modal-footer">
      {children}
    </div>
  )
}

export const Modal = {
  Root: ModalRoot,
  Body: ModalBody,
  Footer: ModalFooter
}