import { Outlet, useMatch } from "react-router-dom";
import { Lancamentos } from "../../components/Lancamentos/Lancamentos";
import { MenuLancamentos } from "../../components/Lancamentos/Menu";

import "./style.scss"

export function LancamentosHome() {
  const isLancamento = useMatch("/lancamentos")

  return (
    <div className="lancamentos">
      <div className="menu-lancamentos">
        <MenuLancamentos />
      </div>
      <div className="content-lancamentos">
        {isLancamento ? (
          <div className="resp-container">
            Lançamentos Home
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}