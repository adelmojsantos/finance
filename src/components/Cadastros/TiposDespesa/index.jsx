import { FloppyDiskBack, PencilSimpleLine, Trash, X } from "phosphor-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useCadastroContext } from "../../../context/CadastroContext"
import { TextInput } from "../../InputText"
import { Loader } from "../../Loader"
import { ModalConfirm } from "../../ModalConfirm"
import { Table } from "../../Table"
import { NoDataTable } from "../../Table/NoDataTable"
import { WarningIcon } from "../../WarningIcon"


const initialState = {
  descricao: '',
  rateio: false
}

export function TipoDespesa() {
  const { tiposDespesa, saveTipoDespesa, deleteTipoDespesa } = useCadastroContext()
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({ descricao: false })
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form?.descricao) {
      toast.error('Informe a descrição')
      return setErrors({ ...errors, descricao: true })
    }
    setLoading(true)
    saveTipoDespesa(form, setLoading)
    setForm({
      descricao: '',
      rateio: false
    })
  }

  const head = [
    "Descrição",
    "Rateio?",
    "Usuário",
    "Ações",
  ]

  const tableBody = () => {
    return tiposDespesa?.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.descricao}</td>
          <td>{item.rateio ? "Sim" : "Não"}</td>
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
              onConfirmClick={() => deleteTipoDespesa(item.id)}
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
                  setForm(initialState)
                  setErrors({})
                }}>
                <X size={24} />
              </TextInput.Icon>)}
            {errors.descricao && <WarningIcon size={24} />}
          </TextInput.Root>
          <TextInput.Root style={{ width: 'auto', paddingRight: '0.5rem' }}>
            <p style={{ paddingLeft: '0.5rem' }}> Rateio?</p>
            <TextInput.Input
              type="checkbox"
              checked={form?.rateio}
              value={form?.rateio}
              onChange={(e) => setForm(prevState => ({
                ...prevState,
                rateio: e.target.checked
              }))}
            />
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
        {tiposDespesa?.length ? (
          <Table
            tableHead={head}
            title="Tipos de despesa"
          >
            {tableBody()}
          </Table>
        ) :
          <NoDataTable
            tableHead={head}
            title="Tipos de despesa"
          />
        }
      </div>
    </div>
  )
}