import { FloppyDiskBack, PencilSimpleLine, Trash, X } from "phosphor-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useCadastroContext } from "../../../context/CadastroContext"
import { ModalConfirm } from "../../ModalConfirm"
import { TextInput } from "../../InputText"
import { Loader } from "../../Loader"
import { Table } from "../../Table"
import { WarningIcon } from "../../WarningIcon"
import { NoDataTable } from "../../Table/NoDataTable"

export function Despesas() {
  const { despesas, saveDespesa, deleteDespesa } = useCadastroContext()
  const [form, setForm] = useState({
    descricao: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form?.descricao) {
      toast.error('Informe a descrição')
      return setErrors({ ...errors, descricao: true })
    }
    setLoading(true)
    saveDespesa(form, setLoading)
    setForm({
      descricao: ''
    })
  }

  const head = [
    "Descrição",
    "Usuário",
    "Ações",
  ]

  const tableBody = () => {
    return despesas?.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.descricao}</td>
          <td>{item.user}</td>
          <td>
            <span onClick={() => {
              setForm(item)
              setErrors({ ...errors, descricao: false })
            }}>
              <PencilSimpleLine size={20} />
            </span>
            <ModalConfirm
              buttonTitle={<Trash size={20} />}
              title="Excluir despesa"
              onConfirmClick={() => deleteDespesa(item.id)}
            >
              Deseja realmente excluir?
            </ModalConfirm>
          </td>
        </tr >
      )
    })
  }

  return (
    <div className="resp-container">
      <div>
        <h5>Cadastro de Origem de Despesa</h5>
        <form onSubmit={handleSubmit}>
          <TextInput.Root style={{ width: '80%' }}>
            <TextInput.Input
              type="text"
              placeholder="Descrição"
              value={form?.descricao}
              onChange={e => {
                setForm(prevState => ({
                  ...prevState,
                  descricao: e.target.value.toUpperCase(),
                }))
                setErrors({ ...errors, descricao: false })
              }}
            />
            {form?.descricao && (
              <TextInput.Icon
                className="clear-icon"
                onClick={() => {
                  setForm({
                    descricao: ''
                  })
                  setErrors({})
                }}>
                <X size={24} />
              </TextInput.Icon>)}
            {errors.descricao && <WarningIcon size={24} />}
          </TextInput.Root>

          <button className={loading ? 'loading' : ''} disabled={loading}>
            {loading ? (
              <Loader size="1.2rem" color="#86efac" />
            ) : (
              <>
                <FloppyDiskBack size={24} /> {form.id ? "alterar" : "salvar"}
              </>
            )}
          </button>
        </form>
      </div>
      <div>
        {despesas?.length ? (
          <Table
            tableHead={head}
            title="Origens de despesa"
          >
            {tableBody()}
          </Table>
        ) :
          <NoDataTable
            tableHead={head}
            title="Origens de despesa"
          />
        }
      </div>
    </div>
  )
}