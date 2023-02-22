import ReactInputMask from "react-input-mask";
import "./style.scss"

function TextInputRoot({ children, style }) {
  return (
    <div className="text-input-root" style={{ ...style }}>
      {children}
    </div>
  )
}

function TextInputIcon({ children, ...props }) {
  return (
    <span className="text-input-icon" {...props}>
      {children}
    </span>
  )
}

function TextInputInput({ className = "", ...props }) {
  return (
    <input
      className={`text-input-input ${className}`}
      {...props}
    />
  )
}

const MaskedInput = ({ ...props }) => {
  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <ReactInputMask
      className="text-input-input"
      onChange={handleChange}
      {...props}
    />
  );
};

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
  Mask: MaskedInput
}