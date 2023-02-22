import { BrowserRouter } from "react-router-dom"
import "../src/global.scss"
import { Router } from "./Router"

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
