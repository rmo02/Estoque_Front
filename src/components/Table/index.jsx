import { useEffect, useState } from 'react'
import { app } from '../../api/api'

export function Table({ searchTerm }) {
  const [dados, setDados] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/category`)
      const sortedData = response.data.sort((a, b) => a.name(b.name))
      setDados(sortedData)
    }
    getData()
  }, [])

  const filteredData = dados.filter(items =>
    items.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div>
      <table className='w-3/4' >
        <thead >
          <tr>
            <th className="pr-2 py-2 text-left text-lg text-color_blue font-bold border-b border-color_blue">
              NOME
            </th>
            <th className="w-1/4 pr-2 py-2 text-left text-lg text-color_blue font-bold border-b border-color_blue">
              AÇÕES
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((items, index) => (
            <tr key={index}>
              <td className="pr-2 py-2 border-b border-color_blue">
                {items.name}
              </td>
              <td className="w-1/4 pr-2 py-2 border-b border-color_blue">
                <div className="flex flex-row items-center justify-between space-x-2 text-white">
                  <button className="cursor-pointer text-sm bg-color_green rounded-2xl w-full flex items-center justify-center py-1 px-2 transition duration-200 hover:bg-green-600">Editar</button>
                  <button className="cursor-pointer text-sm bg-color_red rounded-2xl w-full flex items-center justify-center py-1 px-2 transition duration-200 hover:bg-red-600">Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
