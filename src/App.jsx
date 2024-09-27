import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Options } from './pages/Options'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<Options />} />
        <Route path="/prateleiras" element={<Options />} />
        <Route path="/secoes" element={<Options />} />
      </Routes>
    </BrowserRouter>
  )
}
