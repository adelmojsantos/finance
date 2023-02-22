import { PencilSimpleLine, Trash } from "phosphor-react"
import { useEffect } from "react"
import { useCadastroContext } from "../../../context/CadastroContext"

import { Table } from "../../Table"
import { NoDataTable } from "../../Table/NoDataTable"
import { ModalConfirm } from "../../ModalConfirm"

export function LancamentoList() {
  const { getLancamentos, lancamentos, money } = useCadastroContext()

  const head = [
    "Despesa",
    "Tipo Despesa",
    "Descricao",
    "Parcela",
    "Data Compra",
    "Total",
    "Responsável",
    "Ações",
  ]

  const tableBody = () => {
    return lancamentos?.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.despesas.descricao}</td>
          <td>{item.tipo_despesa.descricao}</td>
          <td>{item.descricao}</td>
          <td>{item.parcela}</td>
          <td>{item.dtCompra}</td>
          <td>{money(item.total)}</td>
          <td>{item.responsavel.descricao}</td>
          <td>
            <span onClick={() => {
              alert('edit')
            }}>
              <PencilSimpleLine size={20} />
            </span>
            <ModalConfirm
              buttonTitle={<Trash size={20} />}
              title="Excluir responsável"
              onConfirmClick={() => alert(item.id)}
            >
              Deseja realmente excluir?
            </ModalConfirm>
          </td>
        </tr >
      )
    })
  }

  useEffect(() => {
    getLancamentos()
  }, [])

  return (
    <div className="resp-container">
      <div>
        filtros de pesquisa
      </div>
      <div>
        {lancamentos?.length ? (
          <Table
            tableHead={head}
            title="Lançamentos"
          >
            {tableBody()}
          </Table>
        ) :
          <NoDataTable
            tableHead={head}
            title="Lançamentos"
          />
        }
      </div>
    </div>
  )
}