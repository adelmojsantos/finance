import "./style.scss"
export function Table({ tableHead, title, children }) {
  return (
    <div className="table-container">
      {title && <h4>{title}</h4>}
      <table>
        <thead>
          <tr>
            {tableHead.map((item, index) => {
              return (
                <td key={`${item}-${index}`}>
                  {item}
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}