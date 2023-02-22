import "./style.scss"

export function NoDataTable({ tableHead, title = "" }) {
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
      </table>
      <div className="no-data">
        Sem dados
      </div>
    </div>
  )
}