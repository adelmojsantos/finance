import { At, Eye, EyeClosed, Password } from "phosphor-react"
import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Finance from "../../assets/logo.svg"
import { Button } from "../../components/Button"
import { TextInput } from "../../components/InputText"
import { Loader } from "../../components/Loader"
import { Modal } from "../../components/Modal"
import { useAuth } from "../../context/AuthContext"
import { RecoveryPassword } from "./RecoveryPassword"

import "./style.scss"

export function Login() {
  const navigate = useNavigate();
  const location = useLocation()
  const { signIn } = useAuth();
  const [recoveryToken, setRecoveryToken] = useState(null);
  const [resetPassword, setResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true)
    if (!email) {
      setLoading(false)
      return toast.error('Informe seu usuário para continuar.');
    }
    if (!password) {
      setLoading(false)
      return toast.error('Informe sua senha para continuar.');
    } else {
      //chama a função signIn do contexto
      const { error } = await signIn({ email, password });

      if (error) {
        setLoading(false)
        return toast.error(error.message)
      } else {
        setLoading(false)
        navigate("/home");
      }
    }
  }


  useEffect(() => {
    console.log(location)
    const url = window.location.hash;
    const newUrl = url?.split("?")
    const query = newUrl[1]?.substring(0);
    let result = {};

    query?.split("&").forEach((part) => {
      const item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result.type === "recovery") {
      setRecoveryToken(result.token);
      setResetPassword(true)
    }
  }, []);

  return resetPassword ? (
    <RecoveryPassword
      token={recoveryToken}
      setRecoveryToken={setRecoveryToken}
    />
  ) : (
    <div className="login-container">
      <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
      <div className="form-login">
        <header>
          <img src={Finance} alt="" />
          <h1>Finance</h1>
        </header>
        <h3>Informe seu e-mail e senha para continuar</h3>
        <form onSubmit={handleLogin}>
          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }}>
              <At size={24} weight="bold" />
            </TextInput.Icon>
            <TextInput.Input type="text" onChange={e => setEmail(e.target.value)} />
          </TextInput.Root>
          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }} >
              <Password size={24} weight="bold" />
            </TextInput.Icon>
            <TextInput.Input type={showPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} />
            <TextInput.Icon style={{ marginRight: '0.75rem', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?
                <Eye size={20} weight="bold" />
                :
                <EyeClosed size={20} weight="bold" />
              }
            </TextInput.Icon>
          </TextInput.Root>
          <Button className="send-button" type="submit">
            {loading ? <Loader className="login-loader" /> : "Entrar"}
          </Button>
        </form>
        <footer>
          <NavLink to="/email-recovery" className="forget-password" href="">Esqueci minha senha</NavLink>
          <NavLink to="/registro">Não possui conta? Clique aqui e cadastre-se.</NavLink>
        </footer>
      </div>
    </div>
  )
}