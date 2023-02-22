import { WarningCircle } from "phosphor-react"
import { TextInput } from "../InputText"

export const WarningIcon = ({ size }) => {
  return (
    <TextInput.Icon style={{ marginRight: "0.75rem" }}>
      <WarningCircle size={size} color="#ea580c" />
    </TextInput.Icon>
  )
}