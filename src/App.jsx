import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './Components/Header.jsx'
import axios from 'axios'

const BASE_URL = "http://localhost:3005"

function App() {
  const [count, setCount] = useState(0)
  const [employees, setEmployees] = useState([])

  const getAllUsers = async () => {
    const response = await axios.get(BASE_URL + "/employees")
    setEmployees(response.data)
  }

  const getUserById = async (id) => {
    const response = await axios.get(BASE_URL + "/employees/" + id)
    console.log(response.data)
  }

  const createUser = async (newUser) => {
    const createResponse = await axios.post(`${BASE_URL}/employees`, newUser)
    console.log("response", response.data)
  }

  const updateUser = async (id, updatedUser) => {
    const updateResponse = await axios.put(`${BASE_URL}/employees/${id}`, updatedUser)
    console.log("response", response.data)
  }

  const deleteUserById = async (id) => {
    const deletedResponse = await axios.delete(`${BASE_URL}/employees/${id}`)
    console.log(deletedresponse.data)
  }

  useEffect(() => {
    getAllUsers();

    //   const newUser = {
    //     "username": "srvt",
    //     "password": "321"
    //   }
    //   createUser(newUser)
    // }, [])

    // updateUser("RK-wTG5yD6A", {
    //   "username": "degisen isim",
    //   "passsword": "degisen sifre"
    // })

    deleteUserById("RK-wTG5yD6A")

  }, [])

  return (
    <div>
      <Header />

      <div className="employee-list">
        {employees.map((emp) => (
          <Employee key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  )
}

export default App
