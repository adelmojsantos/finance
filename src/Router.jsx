import { Route, Routes } from "react-router-dom";
import { Despesas } from "./components/Cadastros/Despesas";
import { Responsavel } from "./components/Cadastros/Responsável";
import { TipoDespesa } from "./components/Cadastros/TiposDespesa";
import { LancamentoList } from "./components/Lancamentos/LancamentoList";
import { LancamentoRateio } from "./components/Lancamentos/LancamentoRateio";
import { Lancamentos } from "./components/Lancamentos/Lancamentos";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { CadastroProvider } from "./context/CadastroContext";
import { Cadastros } from "./pages/Cadastros";
import { Home } from "./pages/Home";
import { LancamentosHome } from "./pages/LancamentosPage";
import { Login } from "./pages/Login";
import { EmailRecovery } from "./pages/Login/EmailRecovery";
import { SignUp } from "./pages/Login/SignUp";
import { NotFound } from "./pages/NotFound";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<SignUp />} />
      <Route path="/email-recovery" element={<EmailRecovery />} />
      <Route path="/" element={<ProtectedLayout />} >
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastros" element={
          <CadastroProvider><Cadastros /></CadastroProvider>}>
          <Route path="responsavel" element={<Responsavel />} />
          <Route path="despesas" element={<Despesas />} />
          <Route path="tipo-despesa" element={<TipoDespesa />} />
        </Route>
        <Route path="/lancamentos" element={
          <CadastroProvider><LancamentosHome /></CadastroProvider>}>
          <Route path="unico" element={<Lancamentos />} />
          <Route path="rateio" element={<LancamentoRateio />} />
          <Route path="lista-lancamentos" element={<LancamentoList />} />
        </Route>
      </Route>
    </Routes>
  )
}