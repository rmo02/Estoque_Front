import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { app } from '../../api/api'

export function TypeOption() {
  const [options, setOptions] = useState([])

  const location = useLocation()
  const isCategorias = location.pathname.endsWith('categorias')
  const isPrateleiras = location.pathname.endsWith('prateleiras')

  useEffect(() => {
    const getData = async () => {
      let response
      isCategorias
        ? (response = await app.get('/category'))
        : isPrateleiras
        ? (response = await app.get('/shelves'))
        : ''
      setOptions(response.data)
    }
    getData()
  }, [isCategorias, isPrateleiras])

  return {
    options,
    isCategorias,
    isPrateleiras
  }
}
