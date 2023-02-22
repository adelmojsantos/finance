import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        newestOnTop={true}
        rtl={false}
        theme="colored"
      />
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
