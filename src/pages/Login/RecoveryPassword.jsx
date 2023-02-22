import { Eye, EyeClosed, Password } from "phosphor-react";
import { useState } from "react";

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Finance from "../../assets/finance.svg";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/InputText";
import { supabase } from "../../supabaseClient";

export function RecoveryPassword({ token, setRecoveryToken }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleNewPassword = async (e) => {
    e.preventDefault()
    if (!newPassword || !confirmPassword) return toast.error("A senha e a confirmação devem ser informadas!")
    const isSamePassword = newPassword === confirmPassword
    if (!isSamePassword) return toast.error("As senhas devem ser iguais!")
    const passwordLength = newPassword.length >= 6
    if (!passwordLength) return toast.error("Senha deve conter pelo menos 6 dígitos")

    const { error } = await supabase.auth.updateUser(token, {
      password: newPassword,
    }).then(
      toast.success("Senha Redefinida!")
    )

    if (!error) {
      setRecoveryToken(null);
    } else {
      console.error(error);
    }

  };

  return (
    <div className="login-container">
      <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
      <div className="form-login">
        <header>
          <img src={Finance} alt="" />
          <h1>Finance</h1>
        </header>
        <h3>Alteração de senha</h3>
        <form onSubmit={handleNewPassword}>
          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }} >
              <Password size={24} weight="bold" />
            </TextInput.Icon>
            <TextInput.Input
              type={showPassword ? "text" : "password"}
              placeholder="Nova senha"
              onChange={e => setNewPassword(e.target.value)}
            />
            <TextInput.Icon style={{ marginRight: '0.75rem', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?
                <Eye size={20} weight="bold" />
                :
                <EyeClosed size={20} weight="bold" />
              }
            </TextInput.Icon>
          </TextInput.Root>

          <TextInput.Root style={{ marginBottom: "1rem" }}>
            <TextInput.Icon style={{ marginLeft: '0.75rem' }} >
              <Password size={24} weight="bold" />
            </TextInput.Icon>
            <TextInput.Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirme a nova senha"
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <TextInput.Icon
              style={{ marginRight: '0.75rem', cursor: 'pointer' }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ?
                <Eye size={20} weight="bold" />
                :
                <EyeClosed size={20} weight="bold" />
              }
            </TextInput.Icon>
          </TextInput.Root>
          <Button className="send-button" type="submit">
            Cadastrar nova senha
          </Button>
        </form>
      </div>
    </div >
  )
}