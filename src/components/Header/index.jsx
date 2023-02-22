import { Calculator, CurrencyDollarSimple, Power, Receipt, SignOut } from "phosphor-react"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import Logo from "../../assets/logo.svg"
import { useAuth } from "../../context/AuthContext"
import { supabase } from "../../supabaseClient"

import "./style.scss"

export function Header() {
  const { user } = useAuth()

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return toast.error(error.message)
    }
  }
  return (
    <header className="header-container">
      <div className="image">
        <img src={Logo} alt="" />
      </div>
      <nav>
        <NavLink to="/cadastros" title="Contas">Cadastros</NavLink>
        <NavLink to="/contas" title="Contas">Contas</NavLink>
        <NavLink to="/lancamentos" title="Lançamentos">Lançamentos</NavLink>
        <NavLink to="/caixinhas" title="Caixinhas">Caixinhas</NavLink>
      </nav>
      <div className="exit">
        <span>{user.email}</span>
        <button type="button" onClick={handleSignOut}>
          Sair <SignOut size={20} />
        </button>
      </div>
    </header>
  )
}