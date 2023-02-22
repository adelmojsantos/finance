import { Divide, List, Receipt } from "phosphor-react";
import { NavLink } from "react-router-dom";

// import "./style.scss";

export function MenuLancamentos() {
  return (
    <nav className="menu-container">
      <NavLink to="unico" >
        <Receipt size={24} />
        <h4>Lançamentos</h4>
      </NavLink>
      <NavLink to="rateio">
        <Divide size={24} />
        <h4>Lançamentos com Rateio</h4>
      </NavLink>
      <NavLink to="lista-lancamentos">
        <List size={24} />
        <h4>Lista de Lançamentos</h4>
      </NavLink>
    </nav>
  )
}