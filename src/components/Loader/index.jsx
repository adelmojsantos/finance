import "./style.scss"

export function Loader({ className, size, color }) {
  return (
    <div
      className={`loader ${className}`}
      style={{
        width: size ?? '1rem',
        height: size ?? '1rem',
        borderBottomColor: color,
        borderLeftColor: color
      }}
    ></div>
  )
}