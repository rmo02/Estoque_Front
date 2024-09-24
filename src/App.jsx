import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Categorias } from './pages/categorias'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  )
}
