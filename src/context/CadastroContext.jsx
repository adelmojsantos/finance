import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "./AuthContext";

import { supabase } from "../supabaseClient"

const CadastroContext = createContext();

export function useCadastroContext() {
  return useContext(CadastroContext)
}

export function CadastroProvider({ children }) {
  const { user } = useAuth();
  const [responsaveis, setResponsaveis] = useState([])
  const [despesas, setDespesas] = useState([])
  const [tiposDespesa, setTiposDespesa] = useState([])
  const [lancamentos, setLancamentos] = useState([])


  /* ==> RESPONSÁVEL <== */
  async function getResponsaveis() {
    const { data, error } = await supabase
      .from('responsavel')
      .select()
      .eq('user_id', user.id)

    if (error) {
      toast.error("Erro ao carregar responsáveis.")
    } else {
      setResponsaveis(data)
    }
  }
  async function saveResponsavel(form, setLoading) {
    if (form.id) {
      const { error } = await supabase
        .from('responsavel')
        .update(form)
        .eq('id', form.id)
      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        getResponsaveis()
        setLoading(false)
        return toast.success("Cadastro atualizado com sucesso")
      }
    } else {
      const responsavel = {
        descricao: form.descricao,
        abrev: form.abrev,
        user_id: user.id,
        user: user.email
      }
      const { data, error } = await supabase
        .from('responsavel')
        .insert(responsavel)
        .select('*')

      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        getResponsaveis()
        setLoading(false)
        toast.success("Cadastro efetuado com sucesso")
      }
    }
  }

  async function deleteResponsavel(id) {
    const { error } = await supabase
      .from('responsavel')
      .delete()
      .eq('id', id)

    if (error) {
      return toast.error(error.message)
    } else {
      getResponsaveis()
      return toast.success("Responsável deletado com sucesso.")
    }
  }

  /* ==> Despesas <== */
  async function getDespesas() {
    const { data, error } = await supabase
      .from('despesas')
      .select()
      .eq('user_id', user.id)

    if (error) {
      toast.error("Erro ao carregar despesas.")
    } else {
      setDespesas(data)
    }
  }

  async function saveDespesa(form, setLoading) {
    if (form.id) {
      const { error } = await supabase
        .from('despesas')
        .update(form)
        .eq('id', form.id)
      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        getDespesas()
        setLoading(false)
        return toast.success("Cadastro atualizado com sucesso")
      }
    } else {
      const despesa = {
        descricao: form.descricao,
        user_id: user.id,
        user: user.email
      }
      const { data, error } = await supabase
        .from('despesas')
        .insert(despesa)
        .select('*')

      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        getDespesas()
        setLoading(false)
        toast.success("Cadastro efetuado com sucesso")
      }
    }
  }

  async function deleteDespesa(id) {
    const { error } = await supabase
      .from('despesas')
      .delete()
      .eq('id', id)

    if (error) {
      return toast.error(error.message)
    } else {
      getDespesas()
      return toast.success("Despesa deletada com sucesso.")
    }
  }

  /* ==> Tipo de Despesa <== */
  async function getTiposDespesa() {
    const { data, error } = await supabase
      .from('tipo_despesa')
      .select()
      .eq('user_id', user.id)

    if (error) {
      toast.error("Erro ao carregar tipos de despesa.")
    } else {
      setTiposDespesa(data)
    }
  }

  async function saveTipoDespesa(form, setLoading) {
    if (form.id) {
      const { error } = await supabase
        .from('tipo_despesa')
        .update(form)
        .eq('id', form.id)
      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        getTiposDespesa()
        setLoading(false)
        return toast.success("Cadastro atualizado com sucesso")
      }
    } else {
      const tipoDespesa = {
        descricao: form.descricao,
        rateio: form.rateio,
        user_id: user.id,
        user: user.email
      }
      const { data, error } = await supabase
        .from('tipo_despesa')
        .insert(tipoDespesa)
        .select('*')

      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        getTiposDespesa()
        setLoading(false)
        toast.success("Cadastro efetuado com sucesso")
      }
    }
  }

  async function deleteTipoDespesa(id) {
    const { error } = await supabase
      .from('tipo_despesa')
      .delete()
      .eq('id', id)

    if (error) {
      return toast.error(error.message)
    } else {
      getTiposDespesa()
      return toast.success("Tipo de despesa deletado com sucesso.")
    }
  }


  /* ==> Lançamentos <== */
  async function getLancamentos() {
    const { data, error } = await supabase
      .from('lancamento')
      .select(`
        *,
        despesas:despesa(descricao),
        tipo_despesa:tipoDespesa(descricao),
        responsavel:idResp(descricao, abrev)
      `)
      .eq('user_id', user.id)

    if (error) {
      toast.error("Erro ao carregar lancamentos.")
    } else {
      setLancamentos(data)
    }
  }

  const money = value => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  useEffect(() => {
    getResponsaveis()
    getDespesas()
    getTiposDespesa()
  }, [])

  const value = {
    responsaveis, saveResponsavel, deleteResponsavel,
    despesas, saveDespesa, deleteDespesa,
    tiposDespesa, saveTipoDespesa, deleteTipoDespesa,
    getResponsaveis,
    getDespesas,
    getTiposDespesa,
    getLancamentos, lancamentos,
    money,
  }

  return (
    <CadastroContext.Provider value={value}>
      {children}
    </CadastroContext.Provider>
  )
}