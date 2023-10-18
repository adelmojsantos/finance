
import { CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { MenuCadastros } from "../../components/Cadastros/Menu";
import { Table } from "../../components/Table";
import { NoDataTable } from "../../components/Table/NoDataTable";
import { useCadastroContext } from "../../context/CadastroContext";
import { supabase } from "../../supabaseClient";
import "./style.scss";

export function Cadastros() {
  const isHomeCadastro = useMatch("/cadastros")
  const { despesas, getDespesas, getTiposDespesa, tiposDespesa, getResponsaveis, responsaveis } = useCadastroContext()
  const [data, setData] = useState([
    {
      id: `despesa-${despesas.length * 10 + 1}`,
      descricao: "Origem Despesas",
      total: despesas.length,
      path: "despesas"
    },
    {
      id: `resp-${responsaveis.length * 10 + 1}`,
      descricao: "Responsáveis",
      total: responsaveis.length,
      path: "responsavel"
    },
    {
      id: `tipo-despesa-${tiposDespesa.length * 10 + 1}`,
      descricao: "Tipos Despesa",
      total: tiposDespesa.length,
      path: "tipo-despesa"
    }
  ])

  const head = [
    "Cadastros",
    "Total",
    "Ir"
  ]

  const tableBody = () => {
    return data?.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.descricao}</td>
          <td>{item.total}</td>
          <td>
            <NavLink to={item.path}>
              <CaretRight size={24} />
            </NavLink>
          </td>
        </tr >
      )
    })
  }

  useEffect(() => {
    let newData = []
    async function getDespesaCount() {
      const { count } = await supabase
        .from('despesas')
        .select('*', { count: 'exact', head: true })

      newData.push({
        id: `despesa-${Math.floor(Math.random() * count)}`,
        descricao: "Origem Despesa",
        total: count,
        path: "despesas"
      })
    }
    async function getRespCount() {
      const { count } = await supabase
        .from('responsavel')
        .select('*', { count: 'exact', head: true })

      newData.push({
        id: `resp-${Math.floor(Math.random() * count)}`,
        descricao: "Responsáveis",
        total: count,
        path: "responsavel"
      })
    }
    async function getTipoDespesaCount() {
      const { count } = await supabase
        .from('tipo_despesa')
        .select('*', { count: 'exact', head: true })

      newData.push({
        id: `tipo-despesa-${Math.floor(Math.random() * count)}`,
        descricao: "Tipos Despesa",
        total: count,
        path: "tipo-despesa"
      })
    }

    getDespesaCount()
    getRespCount()
    getTipoDespesaCount()

    const sortData = newData.sort(function (a, b) {
      if (a.descricao > b.descricao) {
        return 1;
      }
      if (a.descricao < b.descricao) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    setData(sortData)

  }, [])

  return (
    <div className="cadastros">
      <div className="menu-cadastros">
        <MenuCadastros />
      </div>
      <div className="content-cadastros">
        {isHomeCadastro ? (
          <div className="resp-container">
            <h2>Cadastros</h2>
            {data?.length ? (
              <Table
                tableHead={head}
                title=""
              >
                {/* <div className="table-body"> */}
                {tableBody()}
                {/* </div> */}
              </Table>
            ) :
              <NoDataTable
                tableHead={head}
                title=""
              />
            }
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}