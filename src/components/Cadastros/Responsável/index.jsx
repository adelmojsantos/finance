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

import "./styles.scss"

export function Responsavel() {
  const { responsaveis, saveResponsavel, deleteResponsavel } = useCadastroContext()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form?.descricao) {
      toast.error('Informe a descrição')
      return setErrors({ ...errors, descricao: true })
    }
    setLoading(true)
    saveResponsavel(form, setLoading)
    setForm({
      descricao: '',
      abrev: ''
    })
  }

  const head = [
    "Descrição",
    "Abreviação",
    "Ações",
  ]

  const tableBody = () => {
    return responsaveis?.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.descricao}</td>
          <td>{item.abrev}</td>
          <td>
            <span onClick={() => {
              setForm(item)
              setErrors({ ...errors, descricao: false })
            }}>
              <PencilSimpleLine size={20} />
            </span>
            <ModalConfirm
              buttonTitle={<Trash size={20} />}
              title="Excluir responsável"
              onConfirmClick={() => deleteResponsavel(item.id)}
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
        <h5>Cadastro de Responsável</h5>
        <form onSubmit={handleSubmit}>
          <TextInput.Root style={{ width: '60%' }}>
            <TextInput.Input
              type="text"
              placeholder="Descrição"
              value={form?.descricao}
              onChange={e => {
                const abrev = e.target.value.substring(0, 2)
                setForm(prevState => ({
                  ...prevState,
                  descricao: e.target.value.toUpperCase(),
                  abrev
                }))
                setErrors({ ...errors, descricao: false })
              }}
            />
            {form.descricao && (
              <TextInput.Icon
                className="clear-icon"
                onClick={() => {
                  setForm({
                    descricao: '',
                    abrev: ''
                  })
                  setErrors({})
                }}>
                <X size={24} />
              </TextInput.Icon>)}
            {errors.descricao && <WarningIcon size={24} />}
          </TextInput.Root>

          <TextInput.Root style={{ width: 'auto', paddingLeft: '0.5rem' }}>
            <TextInput.Input
              name="abrev"
              value={form?.abrev}
              onChange={e => {
                setForm(prevState => ({
                  ...prevState,
                  abrev: e.target.value.toUpperCase()
                }))
              }}
              maxLength={2}
              type="text"
              placeholder="Abreviação"
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
        {responsaveis?.length ? (
          <Table
            tableHead={head}
            title="Responsáveis"
          >
            {tableBody()}
          </Table>
        ) :
          <NoDataTable
            tableHead={head}
            title="Responsáveis"
          />
        }
      </div>
    </div>
  )
}