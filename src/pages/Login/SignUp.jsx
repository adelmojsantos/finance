import { At, Eye, EyeClosed, IdentificationCard, Password, User } from "phosphor-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Finance from "../../assets/logo.svg"
import { Button } from "../../components/Button"
import { TextInput } from "../../components/InputText"
import { Loader } from "../../components/Loader"
import { WarningIcon } from "../../components/WarningIcon"
import { useAuth } from "../../context/AuthContext"

import "./style.scss"

const initialValues = {
  cpf: "",
};

export function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues);
  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true)
    if (!email || !password || !name) {
      setLoading(false)
      setErrors({
        ...errors,
        email: email ? false : true,
        password: password ? false : true,
        name: name ? false : true,
      })
      return toast.error('Favor preencha todos os campos!');
    }

    const { error } = await signUp({ email, password })
    if (error) {
      setLoading(false)
      return toast.error(error.error.message)
    } else {
      setLoading(false)
      navigate("/home");
    }
  }

  return (
    <div className="login-container">
      <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
      <div className="form-login">
        <header>
          <img src={Finance} alt="" />
          <h1>Finance</h1>
        </header>
        <h3>Informe seu seus dados abaixo:</h3>
        <form onSubmit={handleSignUp}>
          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }}>
              <User size={24} />
            </TextInput.Icon>
            <TextInput.Input
              type="text"
              placeholder="Nome"
              onChange={e => {
                setName(e.target.value)
                setErrors({ ...errors, name: false })
              }}
            />
            {errors.name && <WarningIcon />}
          </TextInput.Root>

          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }}>
              <IdentificationCard className="left" size={24} />
            </TextInput.Icon>
            <TextInput.Mask
              name="cpf"
              mask="999.999.999-99"
              value={values.cpf}
              onChange={handleChange}
              type="text"
              placeholder="CPF"
              id="cpf"
              aria-describedby="cpfHelp"
            />
          </TextInput.Root>

          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }}>
              <At className="left" size={24} />
            </TextInput.Icon>
            <TextInput.Input
              type="text"
              placeholder="Email"
              onChange={e => {
                setEmail(e.target.value)
                setErrors({ ...errors, email: false })
              }} />
            {errors.email && <WarningIcon />}
          </TextInput.Root>

          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }} >
              <Password className="left" size={24} />
            </TextInput.Icon>
            <TextInput.Input
              type={showPassword ? "text" : "password"}
              onChange={e => {
                setPassword(e.target.value)
                setErrors({ ...errors, password: false })
              }}
            />
            <TextInput.Icon style={{ marginRight: '0.75rem', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?
                <Eye className="right" size={20} weight="bold" />
                :
                <EyeClosed className="right" size={20} weight="bold" />
              }
            </TextInput.Icon>
            {errors.password && <WarningIcon />}
          </TextInput.Root>
          <Button className="send-button" type="submit">
            {loading ? <Loader className="login-loader" /> : "Cadastrar"}
          </Button>
        </form>
        <footer>
          <NavLink to="/login" className="forget-password" href="">
            Para entrar clique aqui.
          </NavLink>
        </footer>
      </div>
    </div >
  )
}