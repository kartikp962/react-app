import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import SecondPage from './components/SecondPage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/secondPage' element={<SecondPage />} />
      </Routes>
    </>
  )
}

export default App
