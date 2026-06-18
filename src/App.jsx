import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header.jsx'
import axios from 'axios'

const BASE_URL = "http://localhost:3005"

function App() {
  const [employees, setEmployees] = useState([])

  const getAllEmployees = async () => {
    const response = await axios.get(`${BASE_URL}/employees`)
    setEmployees(response.data)
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  return (
    <div>
      <Header />

      )
}

      export default App