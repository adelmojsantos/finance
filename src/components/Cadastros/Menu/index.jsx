import { Receipt, UserPlus } from "phosphor-react";
import { NavLink, useNavigate } from "react-router-dom";

import { FaFileInvoiceDollar } from "react-icons/fa"

import "./style.scss"

export function MenuCadastros() {
  const navigate = useNavigate()
  return (
    <nav className="menu-container">
      <NavLink to="responsavel" >
        <UserPlus size={24} />
        <h4>Responsável</h4>
      </NavLink>
      <NavLink to="despesas">
        <Receipt size={24} />
        <h4>Origem de Despesa</h4>
      </NavLink>
      <NavLink to="tipo-despesa">
        <FaFileInvoiceDollar size={24} />
        <h4>Tipo de Despesa</h4>
      </NavLink>
    </nav>
  )
}