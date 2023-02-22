import { At } from "phosphor-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import Finance from "../../assets/finance.svg"
import { TextInput } from "../../components/InputText";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function EmailRecovery({ setOnReset }) {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(false)


  function handleReset(e) {
    e.preventDefault()
    if (!email) {
      return toast.error("Informe seu email!")
    }
    setLoading(true)
    resetPassword(email, () => navigate("/home"))
  }

  return (
    <div className="login-container">
      <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
      <div className="form-login">
        <header>
          <img src={Finance} alt="" />
          <h1>Finance</h1>
        </header>
        <h3>Alteração de senha</h3>
        <form onSubmit={handleReset}>
          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }}>
              <At size={24} weight="bold" />
            </TextInput.Icon>
            <TextInput.Input type="text" onChange={e => setEmail(e.target.value)} />
          </TextInput.Root>
          <Button className="send-button" type="submit">
            {loading ? <Loader className="login-loader" /> : "Solicitar nova senha"}
          </Button>
        </form>
        <footer>
          <NavLink to="/login">Para entrar clique aqui.</NavLink>
        </footer>
      </div>
    </div >
  )
}